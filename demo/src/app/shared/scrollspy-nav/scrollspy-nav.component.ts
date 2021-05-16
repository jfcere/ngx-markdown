import { ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import * as Gumshoe from 'gumshoejs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-scrollspy-nav',
  templateUrl: './scrollspy-nav.component.html',
  styleUrls: ['./scrollspy-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollspyNavComponent implements OnChanges, OnDestroy {

  @Input()
  headings: Element[] | undefined;

  private scrollSpy: Gumshoe | undefined;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private zone: NgZone,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.headings && changes.headings.currentValue) {
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
    this.zone.onStable
      .pipe(first())
      .subscribe(() => {
        const hostElement = this.elementRef.nativeElement;
        const linkSelector = `${hostElement.tagName}.${hostElement.className} a`;
        this.scrollSpy = new Gumshoe(linkSelector, { offset: 64, reflow: true });
    });
  }
}
