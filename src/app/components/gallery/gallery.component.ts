import { Component, Input } from '@angular/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import type { SiteGalleryItem } from '../../data/site-content';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  @Input({ required: true }) gallery!: SiteGalleryItem[];
}
