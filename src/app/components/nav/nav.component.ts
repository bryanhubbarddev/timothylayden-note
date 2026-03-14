import { Component, Input, inject } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  @Input() stageName = '';
  private scroll = inject(ScrollService);

  scrollTo(id: string): void {
    this.scroll.scrollTo(id);
  }
}
