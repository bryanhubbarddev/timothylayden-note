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
  @Input() bookingEmailAlt?: string;
  @Input() bookingContact = '';

  /** mailto: with subject so booking clicks open the user's email app addressed to Timothy. */
  private buildMailto(to: string): string {
    const email = to.trim();
    if (!email) return '';
    const subject = encodeURIComponent('Booking Request — live piano');
    return `mailto:${email}?subject=${subject}`;
  }

  get bookingMailto(): string {
    return this.buildMailto(this.bookingEmail);
  }

  get bookingMailtoAlt(): string {
    return this.buildMailto(this.bookingEmailAlt || '');
  }
}
