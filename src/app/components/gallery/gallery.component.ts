import {
  Component,
  ElementRef,
  HostListener,
  Injector,
  Input,
  ViewChild,
  afterNextRender,
  inject,
} from '@angular/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import type { SiteExternalPhotoAlbum, SiteGalleryItem } from '../../data/site-content';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  @Input({ required: true }) gallery!: SiteGalleryItem[];
  @Input() photoAlbumLinks: SiteExternalPhotoAlbum[] = [];
  /** When true, show a link under the grid to the separate Videos section (same page). */
  @Input() linkToVideosSection = false;

  private injector = inject(Injector);

  /** Dialog root — Tab trap scope (avoids adding @angular/cdk FocusTrap). */
  @ViewChild('lightboxDialog') private lightboxDialog?: ElementRef<HTMLElement>;

  /** Close control inside the lightbox dialog (for focus management). */
  @ViewChild('lightboxCloseBtn') private lightboxCloseBtn?: ElementRef<HTMLButtonElement>;

  lightbox: SiteGalleryItem | null = null;
  private lastFocusedEl: HTMLElement | null = null;

  openLightbox(img: SiteGalleryItem): void {
    const el = document.activeElement;
    this.lastFocusedEl = el instanceof HTMLElement ? el : null;
    this.lightbox = img;
    afterNextRender(
      () => {
        this.lightboxCloseBtn?.nativeElement?.focus();
      },
      { injector: this.injector },
    );
  }

  closeLightbox(): void {
    const restore = this.lastFocusedEl;
    this.lastFocusedEl = null;
    this.lightbox = null;
    afterNextRender(
      () => {
        if (restore && document.body.contains(restore)) {
          restore.focus();
        }
      },
      { injector: this.injector },
    );
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.lightbox) this.closeLightbox();
  }

  /**
   * While the lightbox is open, keep Tab / Shift+Tab inside the dialog so focus
   * cannot move to the nav or rest of the page (WCAG modal pattern).
   */
  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(e: KeyboardEvent): void {
    if (!this.lightbox || e.key !== 'Tab') return;
    const root = this.lightboxDialog?.nativeElement;
    if (!root) return;
    const list = this.focusableInside(root);
    if (list.length === 0) return;
    e.preventDefault();
    const active = document.activeElement;
    let idx = active instanceof HTMLElement ? list.indexOf(active) : -1;
    if (idx < 0) idx = 0;
    const next = e.shiftKey
      ? (idx - 1 + list.length) % list.length
      : (idx + 1) % list.length;
    list[next].focus();
  }

  private focusableInside(container: HTMLElement): HTMLElement[] {
    const sel =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(container.querySelectorAll<HTMLElement>(sel)).filter(
      (el) => !el.hasAttribute('disabled') && this.isVisibleEnough(el),
    );
  }

  private isVisibleEnough(el: HTMLElement): boolean {
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }
}
