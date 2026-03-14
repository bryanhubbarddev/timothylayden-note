import { Component, Input } from '@angular/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import type { SiteExperience } from '../../data/site-content';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent {
  @Input({ required: true }) experience!: SiteExperience[];
}
