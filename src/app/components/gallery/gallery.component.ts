import { Component, HostListener, Input, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import type { SiteGalleryItem, SiteVideo } from '../../data/site-content';

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

  private sanitizer = inject(DomSanitizer);

  lightbox: SiteGalleryItem | null = null;

  safeEmbed(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openLightbox(img: SiteGalleryItem): void {
    this.lightbox = img;
  }

  closeLightbox(): void {
    this.lightbox = null;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.lightbox) this.closeLightbox();
  }
}
