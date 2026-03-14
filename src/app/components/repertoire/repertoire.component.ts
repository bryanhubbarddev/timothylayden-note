import { Component, Input } from '@angular/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import type { SiteRepertoireItem } from '../../data/site-content';

@Component({
  selector: 'app-repertoire',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './repertoire.component.html',
  styleUrl: './repertoire.component.css',
})
export class RepertoireComponent {
  @Input({ required: true }) repertoire!: SiteRepertoireItem[];
}
