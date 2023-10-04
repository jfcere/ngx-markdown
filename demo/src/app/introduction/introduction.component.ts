import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-cheat-sheet',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroductionComponent implements OnInit {

  blockquotes = require('raw-loader!./markdown/blockquotes.md').default;
  codeAndSynthaxHighlighting = require('raw-loader!./markdown/code-and-synthax-highlighting.md').default;
  emphasis = require('raw-loader!./markdown/emphasis.md').default;
  headers = require('raw-loader!./markdown/headers.md').default;
  horizontalRule = require('raw-loader!./markdown/horizontal-rule.md').default;
  images = require('raw-loader!./markdown/images.md').default;
  links = require('raw-loader!./markdown/links.md').default;
  lists = require('raw-loader!./markdown/lists.md').default;
  listsDot = require('raw-loader!./markdown/lists-dot.md').default;
  tables = require('raw-loader!./markdown/tables.md').default;

  headings: Element[] | undefined;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
  ) { }

  ngOnInit(): void {
    this.setHeadings();
  }

  private setHeadings(): void {
    const headings: Element[] = [];
    this.elementRef.nativeElement
      .querySelectorAll('h2')
      .forEach(x => headings.push(x));
    this.headings = headings;
  }
}
