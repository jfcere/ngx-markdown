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
      options: {
        html: true,
        linkify: true,
        typographer: true,
      },
    }),
  ],
  declarations: [MarkdownDemoComponent],
  bootstrap: [MarkdownDemoComponent],
})
export class MarkdownDemoModule { }
