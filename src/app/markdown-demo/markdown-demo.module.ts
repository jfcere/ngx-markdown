import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MarkdownDemoComponent } from './markdown-demo.component';
import { MarkdownToHtmlModule } from '../markdown-to-html/markdown-to-html.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MarkdownToHtmlModule.forRoot(),
  ],
  declarations: [MarkdownDemoComponent],
  bootstrap: [MarkdownDemoComponent],
})
export class MarkdownDemoModule { }
