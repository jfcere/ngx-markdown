import { Component, OnInit, HostListener } from '@angular/core';

import { MarkdownService } from '../markdown/markdown.service';

// tslint:disable:max-line-length
@Component({
  selector: 'markdown-demo',
  templateUrl: './markdown-demo.component.html',
  styleUrls: ['./markdown-demo.component.scss'],
})
export class MarkdownDemoComponent implements OnInit {
  // markdown
  blockquotes = require('raw-loader!./markdown/blockquotes.md');
  codeAndSynthaxHighlighting = require('raw-loader!./markdown/code-and-synthax-highlighting.md');
  emphasis = require('raw-loader!./markdown/emphasis.md');
  headers = require('raw-loader!./markdown/headers.md');
  horizontalRule = require('raw-loader!./markdown/horizontal-rule.md');
  images = require('raw-loader!./markdown/images.md');
  links = require('raw-loader!./markdown/links.md');
  lists = require('raw-loader!./markdown/lists.md');
  listsDot = require('raw-loader!./markdown/lists-dot.md');
  tables = require('raw-loader!./markdown/tables.md');

  // remote
  demoPython = require('raw-loader!./remote/demo.py');
  languagePipe = require('raw-loader!./remote/language-pipe.html');

  // variable-binding
  markdown =
`### Markdown example
---
This is an **example** where we bind a variable to the \`markdown\` component that is also bind to a textarea.

#### example.component.ts
\`\`\`typescript
public markdown = "# Markdown";
\`\`\`

#### example.component.html
\`\`\`html
<textarea [(ngModel)]="markdown"></textarea>
<markdown [data]="markdown"></markdown>
\`\`\``;

  // pipe
  pipeMarkdown =
`### Markdown example
---
This is an **example** where we use a variable with the \`markdown\` pipe that is also bind to a textarea. Using the pipe allows to chain pipe transformation.

#### example.component.ts
\`\`\`typescript
public pipeMarkdown = "# Markdown";
\`\`\`

#### example.component.html
\`\`\`html
<textarea [(ngModel)]="pipeMarkdown"></textarea>
<div [innerHTML]="pipeMarkdown | markdown"></div>
\`\`\``;
  typescriptMarkdown =
`import { Component } from '@angular/core';

@Component({
  selector: 'markdown-demo',
  templateUrl: './markdown-demo.component.html',
  styleUrls: ['./markdown-demo.component.scss'],
})
export class MarkdownDemoComponent {
  public pipeMarkdown = '# Markdown';
}`;

  protected _titleIsAnimating = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    const title = $('.title a');
    const titleOffset = title[0].offsetTop;
    const windowOffset = window.pageYOffset;
    const currentFontSize = title[0].style.fontSize;
    const targetFontSize = windowOffset > titleOffset ? '2.28rem' : '2.92rem';

    if (currentFontSize !== targetFontSize && !this._titleIsAnimating) {
      this._titleIsAnimating = true;
      title.animate({ fontSize: targetFontSize }, 200, 'swing', () => this._titleIsAnimating = false);
    }
  }

  constructor(
    private markdownService: MarkdownService,
  ) { }

  ngOnInit() {
    this.initRenderer();
    this.initTableOfContents();
  }

  initRenderer() {
    this.markdownService.renderer.heading = (text: string, level: number) => {
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      return '<h' + level + '>' +
               '<a name="' + escapedText + '" class="anchor" href="#' + escapedText + '">' +
                 '<span class="header-link"></span>' +
               '</a>' + text +
             '</h' + level + '>';
    };
  }

  initTableOfContents() {
    // initialize pushpin
    const tableOfContent = $('.table-of-contents');
    const pushpinTop = tableOfContent.parent().offset().top;
    tableOfContent.pushpin({ top: pushpinTop });

    // initialize scrollSpy
    $('section').scrollSpy();
  }
}
