import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BioComponent } from './bio/bio.component';
import { SiteContentService } from './services/site-content.service';
import type { SiteData } from './data/site-content';
import { FloatingNotesComponent } from './components/floating-notes/floating-notes.component';
import { PianoBarComponent } from './components/piano-bar/piano-bar.component';
import { NavComponent } from './components/nav/nav.component';
import { HeroComponent } from './components/hero/hero.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { RepertoireComponent } from './components/repertoire/repertoire.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    BioComponent,
    FloatingNotesComponent,
    PianoBarComponent,
    NavComponent,
    HeroComponent,
    ExperienceComponent,
    RepertoireComponent,
    GalleryComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private siteContent = inject(SiteContentService);
  d: SiteData = this.siteContent.getContent();
}
