import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as marked from 'marked';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { MarkedOptions } from './marked-options';
import { MarkedRenderer } from './marked-renderer';

declare var Prism: {
  highlightAll: (async: boolean) => void
};

@Injectable()
export class MarkdownService {
  get renderer(): marked.Renderer { return this.options.renderer; }
  set renderer(value: marked.Renderer) { this.options.renderer = value; }

  constructor(
    private domSanitizer: DomSanitizer,
    private http: HttpClient,
    public options: MarkedOptions,
  ) {
    if (!this.renderer) {
      this.renderer = new marked.Renderer();
    }
  }

  compile(markdown: string, markedOptions = this.options) {
    const precompiled = this.precompile(markdown);
    const compiled = marked(precompiled, markedOptions);
    return this.domSanitizer.sanitize(SecurityContext.HTML, compiled);
  }

  getSource(src: string) {
    return this.http
      .get(src, { responseType: 'text' })
      .pipe(map(markdown => this.handleExtension(src, markdown)));
  }

  highlight() {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll(false);
    }
  }

  private handleExtension(src: string, markdown: string) {
    const extension = src
      ? src.split('.').splice(-1).join()
      : null;
    return extension !== 'md'
      ? '```' + extension + '\n' + markdown + '\n```'
      : markdown;
  }

  private precompile(markdown: string) {
    if (!markdown) {
      return '';
    }
    let indentStart: number;
    return markdown
      .replace(/\&gt;/g, '>')
      .split('\n')
      .map(line => {
        // find position of 1st non-whitespace character
        // to determine the markdown indentation start
        if (line.length > 0 && isNaN(indentStart)) {
          indentStart = line.search(/\S|$/);
        }
        // remove whitespaces before indentation start
        return indentStart
          ? line.substring(indentStart)
          : line;
      }).join('\n');
  }
}
