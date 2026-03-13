import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { SiteData } from '../data/site-content';

@Component({
  selector: 'app-bio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bio.component.html',
  styleUrl: './bio.component.css'
})
export class BioComponent {
  @Input() data!: SiteData;

  activeHighlight: string | null = null;
  nameLetters = ['T','i','m','o','t','h','y','-',' ','L','a','y','d','e','n'];

  setActiveHighlight(text: string) {
    this.activeHighlight = this.activeHighlight === text ? null : text;
  }
}

