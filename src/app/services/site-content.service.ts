import { Injectable } from '@angular/core';
import { siteContent, type SiteData } from '../data/site-content';

@Injectable({ providedIn: 'root' })
export class SiteContentService {
  getContent(): SiteData {
    return siteContent;
  }
}
