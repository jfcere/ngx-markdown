import { Component } from '@angular/core';
const fileContent = require('raw-loader!./demo.py');

@Component({
  selector: 'markdown-demo',
  templateUrl: './markdown-demo.component.html',
  styleUrls: ['./markdown-demo.component.css'],
})
export class MarkdownDemoComponent {
  public fileContent = fileContent;
}
