import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { MarkdownComponent } from '../../../../lib/src/markdown.component';
import { ScrollspyNavLayoutComponent } from '../shared/scrollspy-nav-layout/scrollspy-nav-layout.component';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ScrollspyNavLayoutComponent, MarkdownComponent],
})
export default class GetStartedComponent {

  headings: Element[] | undefined;

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
