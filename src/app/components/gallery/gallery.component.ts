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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import type {
  SiteExternalPhotoAlbum,
  SiteGalleryItem,
  SiteVideo,
} from '../../data/site-content';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  @Input({ required: true }) gallery!: SiteGalleryItem[];
  @Input() videos: SiteVideo[] = [];
  @Input() photoAlbumLinks: SiteExternalPhotoAlbum[] = [];

  private sanitizer = inject(DomSanitizer);
  private injector = inject(Injector);

  /** Close control inside the lightbox dialog (for focus management). */
  @ViewChild('lightboxCloseBtn') private lightboxCloseBtn?: ElementRef<HTMLButtonElement>;

  lightbox: SiteGalleryItem | null = null;
  private lastFocusedEl: HTMLElement | null = null;

  /**
   * Only known-good embed origins are passed through. Anything else becomes
   * `about:blank` so we never bypass sanitizer for arbitrary attacker-controlled
   * URLs if `embedSrc` ever came from user input.
   */
  safeEmbed(url: string): SafeResourceUrl {
    const trusted = this.isAllowedEmbedUrl(url) ? url.trim() : 'about:blank';
    return this.sanitizer.bypassSecurityTrustResourceUrl(trusted);
  }

  private isAllowedEmbedUrl(url: string): boolean {
    try {
      const u = new URL(url.trim());
      if (u.protocol !== 'https:') return false;
      const host = u.hostname.toLowerCase();
      if (host === 'www.youtube.com' || host === 'youtube.com') {
        return u.pathname.startsWith('/embed/');
      }
      if (host === 'www.youtube-nocookie.com' || host === 'youtube-nocookie.com') {
        return u.pathname.startsWith('/embed/');
      }
      if (host === 'player.vimeo.com') {
        return u.pathname.startsWith('/video/');
      }
      return false;
    } catch {
      return false;
    }
  }

  videoTrackKey(v: SiteVideo): string {
    return `${v.title}-${v.fileSrc ?? ''}-${v.embedSrc ?? ''}`;
  }

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
}
