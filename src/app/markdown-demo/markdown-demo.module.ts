import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MarkdownDemoComponent } from './markdown-demo.component';
import { MarkdownToHtmlModule } from '../markdown-to-html/markdown-to-html.module';

@NgModule({
  imports: [
    BrowserModule,
    MarkdownToHtmlModule.forRoot(),
  ],
  declarations: [MarkdownDemoComponent],
  bootstrap: [MarkdownDemoComponent],
})
export class MarkdownDemoModule { }
