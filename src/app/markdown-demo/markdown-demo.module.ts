import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MarkdownDemoComponent } from './markdown-demo.component';
import { MarkdownModule } from '../markdown/markdown.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MarkdownModule.forRoot({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
    }),
  ],
  declarations: [MarkdownDemoComponent],
  bootstrap: [MarkdownDemoComponent],
})
export class MarkdownDemoModule { }
