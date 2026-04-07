import { Component, Input } from '@angular/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import type { SiteTBluBlog } from '../../data/site-content';

@Component({
  selector: 'app-t-blu-blog',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './t-blu-blog.component.html',
  styleUrl: './t-blu-blog.component.css',
})
export class TBluBlogComponent {
  @Input({ required: true }) blog!: SiteTBluBlog;
}
