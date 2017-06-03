import { Component } from '@angular/core';

declare var autosize: any;

@Component({
  selector: 'markdown-demo',
  templateUrl: './markdown-demo.component.html',
  styleUrls: ['./markdown-demo.component.scss'],
})
export class MarkdownDemoComponent {
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
  // variable-binding
  markdown =
`### Markdown example
---
This is an **example** where we bind a variable to the \`markdown-to-html\` component that is also bind to a textarea.

#### example.component.ts
\`\`\`typescript
public markdown = "# Markdown";
\`\`\`

#### example.component.html
\`\`\`html
<textarea [(ngModel)]="markdown"></textarea>
<markdown-to-html [data]="markdown"></markdown-to-html>
\`\`\``;
}
