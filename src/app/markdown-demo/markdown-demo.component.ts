import { Component } from '@angular/core';

@Component({
  selector: 'markdown-demo',
  templateUrl: './markdown-demo.component.html',
  styleUrls: ['./markdown-demo.component.scss'],
})
export class MarkdownDemoComponent {
  // markdown
  public blockquotes = require('raw-loader!./markdown/blockquotes.md');
  public codeAndSynthaxHighlighting = require('raw-loader!./markdown/code-and-synthax-highlighting.md');
  public emphasis = require('raw-loader!./markdown/emphasis.md');
  public headers = require('raw-loader!./markdown/headers.md');
  public horizontalRule = require('raw-loader!./markdown/horizontal-rule.md');
  public images = require('raw-loader!./markdown/images.md');
  public links = require('raw-loader!./markdown/links.md');
  public lists = require('raw-loader!./markdown/lists.md');
  public listsDot = require('raw-loader!./markdown/lists-dot.md');
  public tables = require('raw-loader!./markdown/tables.md');
  // remote
  public demoPython = require('raw-loader!./remote/demo.py');
}
