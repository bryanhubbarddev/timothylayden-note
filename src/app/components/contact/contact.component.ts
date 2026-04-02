import { Component, Input } from '@angular/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  @Input() bookingEmail = '';
  @Input() bookingContact = '';

  /** mailto: with subject so booking clicks open the user's email app addressed to Timothy. */
  get bookingMailto(): string {
    if (!this.bookingEmail.trim()) return '';
    const subject = encodeURIComponent('Booking inquiry — live piano');
    return `mailto:${this.bookingEmail.trim()}?subject=${subject}`;
  }
}
