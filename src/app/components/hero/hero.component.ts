import { Component, Input, inject } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';
import type { SiteData } from '../../data/site-content';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  @Input({ required: true }) data!: SiteData;
  private scroll = inject(ScrollService);

  /** Stage name with double notes at start/end, single in middle: "♫ Timothy ♪ Layden ♫" */
  get displayName(): string {
    const name = this.data?.stageName ?? '';
    const parts = name.trim().split(/\s+/);
    if (parts.length < 2) return parts.length ? '♫ ' + name + ' ♫' : name;
    return '♫ ' + parts.join(' ♪ ') + ' ♫';
  }

  /** Segments for rendering name with notes wrapped (first/last ♫, middle ♪). */
  get displayNameParts(): { type: 'note' | 'text'; value?: string; symbol?: '♪' | '♫' }[] {
    const name = this.data?.stageName ?? '';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return [];
    if (parts.length === 1) return [{ type: 'note', symbol: '♫' }, { type: 'text', value: parts[0] }, { type: 'note', symbol: '♫' }];
    const segs: { type: 'note' | 'text'; value?: string; symbol?: '♪' | '♫' }[] = [{ type: 'note', symbol: '♫' }];
    parts.forEach((p, i) => {
      segs.push({ type: 'text', value: p });
      segs.push({ type: 'note', symbol: i === parts.length - 1 ? '♫' : '♪' });
    });
    return segs;
  }

  get subheadlineParts(): { before: string; after: string } {
    const s = this.data?.subheadline ?? '';
    const name = this.data?.stageName ?? '';
    const i = s.indexOf(name);
    if (i === -1) return { before: s, after: '' };
    return {
      before: s.slice(0, i),
      after: s.slice(i + name.length),
    };
  }

  scrollTo(id: string): void {
    this.scroll.scrollTo(id);
  }
}
