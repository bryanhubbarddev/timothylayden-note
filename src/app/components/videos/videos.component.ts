import { Component, Input, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import type { SiteVideo } from '../../data/site-content';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css',
})
export class VideosComponent {
  @Input() videos: SiteVideo[] = [];

  private sanitizer = inject(DomSanitizer);

  /**
   * Only known-good embed origins are passed through. Anything else becomes
   * `about:blank` so we never bypass sanitizer for arbitrary attacker-controlled
   * URLs if `embedSrc` ever came from user input.
   */
  safeEmbed(url: string): SafeResourceUrl {
    const trusted = this.isAllowedEmbedUrl(url) ? url.trim() : 'about:blank';
    return this.sanitizer.bypassSecurityTrustResourceUrl(trusted);
  }

  private isAllowedEmbedUrl(url: string): boolean {
    try {
      const u = new URL(url.trim());
      if (u.protocol !== 'https:') return false;
      const host = u.hostname.toLowerCase();
      if (host === 'www.youtube.com' || host === 'youtube.com') {
        return u.pathname.startsWith('/embed/');
      }
      if (host === 'www.youtube-nocookie.com' || host === 'youtube-nocookie.com') {
        return u.pathname.startsWith('/embed/');
      }
      if (host === 'player.vimeo.com') {
        return u.pathname.startsWith('/video/');
      }
      if (host === 'www.facebook.com' && u.pathname === '/plugins/video.php') {
        const hrefParam = u.searchParams.get('href');
        if (!hrefParam) return false;
        try {
          const inner = new URL(hrefParam);
          if (inner.protocol !== 'https:') return false;
          const h = inner.hostname.toLowerCase();
          return (
            h === 'www.facebook.com' ||
            h === 'facebook.com' ||
            h === 'm.facebook.com' ||
            h.endsWith('.facebook.com')
          );
        } catch {
          return false;
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  videoTrackKey(v: SiteVideo): string {
    return `${v.title}-${v.fileSrc ?? ''}-${v.embedSrc ?? ''}`;
  }
}
