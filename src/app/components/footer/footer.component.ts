import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  @Input() stageName = '';
  @Input() footerCreditPartner = '';
  @Input() footerCreditPartnerGithubUrl = '';
  readonly year = new Date().getFullYear();
}
