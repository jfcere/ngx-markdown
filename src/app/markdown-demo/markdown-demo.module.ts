import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import * as marked from 'marked';

import { MarkdownDemoComponent } from './markdown-demo.component';
import { MarkdownModule } from '../markdown/markdown.module';
import { MarkedOptions } from '../markdown/marked-options';
import { MarkedRenderer } from '../markdown/marked-renderer';

export function markedOptions(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = (text: string) => {
    return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
  };

  return {
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  };
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MarkdownModule.forRoot({
      provide: MarkedOptions,
      useFactory: markedOptions,
    }),
  ],
  declarations: [MarkdownDemoComponent],
  bootstrap: [MarkdownDemoComponent],
})
export class MarkdownDemoModule { }
