import { Component, Input } from '@angular/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import type {
  SiteRepertoireItem,
  SiteRepertoireMusicLink,
} from '../../data/site-content';

@Component({
  selector: 'app-repertoire',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './repertoire.component.html',
  styleUrl: './repertoire.component.css',
})
export class RepertoireComponent {
  @Input({ required: true }) repertoire!: SiteRepertoireItem[];
  @Input({ required: true }) repertoireFootnote!: string;
  @Input() repertoireMusicLink?: SiteRepertoireMusicLink;
  @Input() repertoireListenBlurb?: string;

  /** Target id for same-page #anchor + blurb (e.g. listen). */
  get musicAnchorId(): string | null {
    const h = this.repertoireMusicLink?.href;
    if (!h?.startsWith("#") || h.length < 2 || !this.repertoireListenBlurb?.trim()) {
      return null;
    }
    return h.slice(1);
  }
}
