import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetStartedComponent {

  headings: Element[];

  constructor(
    private elementRef: ElementRef<HTMLElement>,
  ) { }

  onLoad(): void {
    this.stripContent();
    this.setHeadings();
  }

  private setHeadings(): void {
    const headings: Element[] = [];
    this.elementRef.nativeElement
      .querySelectorAll('h2')
      .forEach(x => headings.push(x));
    this.headings = headings;
  }

  private stripContent(): void {
    this.elementRef.nativeElement
      .querySelector('markdown')!
      .querySelectorAll('markdown > p:nth-child(-n + 2), #ngx-markdown, #table-of-contents + ul, #table-of-contents')
      .forEach(x => x.remove());
  }
}
