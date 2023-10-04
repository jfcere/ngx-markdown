import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { MarkdownService, MarkedRenderer } from 'ngx-markdown';

@Component({
  selector: 'app-rerender',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentificationComponent implements OnInit, OnDestroy {

  private _accentColor = '';

  // eslint-disable-next-line @typescript-eslint/unbound-method
  private _defaultMarkedRendererHeading = MarkedRenderer.prototype.heading;

  get accentColor(): string {
    return this._accentColor;
  }
  set accentColor(value: string) {
    if (this._accentColor === value) {
      return;
    }
    this._accentColor = value;
    this.changeAccentColor();
  }

  headings: Element[] | undefined;

  markdown = `## Markdown __rulez__!
---

### Syntax highlight
\`\`\`typescript
const language = 'typescript';
\`\`\`

### Lists
1. Ordered list
2. Another bullet point
  - Unordered list
  - Another unordered bullet point

### Blockquote
> Blockquote to the max`;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private markdownService: MarkdownService,
  ) { }

  ngOnInit(): void {
    this.setHeadings();
  }

  ngOnDestroy(): void {
    this.resetRenderer();
  }

  private changeAccentColor(): void {
    const styleAttribute = this.accentColor
      ? ` style="color: ${this.accentColor}"`
      : '';

    this.overrideRenderer(styleAttribute);

    this.markdownService.reload();
  }

  private overrideRenderer(styleAttribute: string): void {
    this.markdownService.renderer.heading = (text: string, level: number): string => {
      return `<h${level}${styleAttribute}>${text}</h${level}>`;
    };
  }

  private resetRenderer(): void {
    this.markdownService.renderer.heading = this._defaultMarkedRendererHeading;
  }

  private setHeadings(): void {
    const headings: Element[] = [];
    this.elementRef.nativeElement
      .querySelectorAll('h2')
      .forEach(x => headings.push(x));
    this.headings = headings;
  }
}
