import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DemoComponent } from './demo.component';
import { MarkdownToHtmlModule } from '../markdown-to-html/markdown-to-html.module';

@NgModule({
  exports: [],
  imports: [
    BrowserModule,
    MarkdownToHtmlModule.forRoot(),
  ],
  declarations: [DemoComponent],
  bootstrap: [DemoComponent],
})
export class DemoModule { }
