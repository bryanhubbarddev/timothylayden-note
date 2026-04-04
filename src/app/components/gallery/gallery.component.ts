import { Component, HostListener, Input, inject } from '@angular/core';
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

  lightbox: SiteGalleryItem | null = null;

  safeEmbed(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  videoTrackKey(v: SiteVideo): string {
    return `${v.title}-${v.fileSrc ?? ''}-${v.embedSrc ?? ''}`;
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
