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
  /** Shown in header brand mailto (same as primary booking email). */
  @Input() bookingEmail = '';
  private scroll = inject(ScrollService);

  /** Empty when no email — brand is not a link. */
  get brandMailto(): string {
    const e = this.bookingEmail.trim();
    if (!e) return '';
    const subject = encodeURIComponent("Booking inquiry — timothylayden.com");
    return `mailto:${e}?subject=${subject}`;
  }

  /** Same subject as contact “Send Booking Request” (app/contact). */
  get bookNowMailto(): string {
    const e = this.bookingEmail.trim();
    if (!e) return "";
    const subject = encodeURIComponent("Booking Request — live piano");
    return `mailto:${e}?subject=${subject}`;
  }

  scrollTo(id: string): void {
    this.scroll.scrollTo(id);
  }
}
