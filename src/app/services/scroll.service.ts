import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  scrollTo(id: string, behavior: ScrollBehavior = 'smooth'): void {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior });
  }
}
