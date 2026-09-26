import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, inject, Injector, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import Gumshoe from 'gumshoejs';

@Component({
  selector: 'app-scrollspy-nav',
  templateUrl: './scrollspy-nav.component.html',
  styleUrls: ['./scrollspy-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
  ],
})
export class ScrollspyNavComponent implements OnChanges, OnDestroy {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private injector = inject(Injector);

  @Input()
  headings: Element[] | undefined;

  private scrollSpy: Gumshoe | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['headings']?.currentValue) {
      this.setScrollSpy();
    }
  }

  ngOnDestroy(): void {
    this.destroyScrollSpy();
  }

  destroyScrollSpy(): void {
    if (this.scrollSpy) {
      this.scrollSpy.destroy();
    }
  }

  setScrollSpy(): void {
    if (this.scrollSpy) {
      this.scrollSpy.setup();
      return;
    }
    afterNextRender(() => {
      const hostElement = this.elementRef.nativeElement;
      const linkSelector = `${hostElement.tagName}.${hostElement.className} a`;
      this.scrollSpy = new Gumshoe(linkSelector, { offset: 64, reflow: true });
    }, { injector: this.injector });
  }
}
