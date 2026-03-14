import {
  Directive,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true,
})
export class RevealOnScrollDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private io: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    const el = this.el.nativeElement;
    el.classList.add('reveal');
    this.io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    this.io.observe(el);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }
}
