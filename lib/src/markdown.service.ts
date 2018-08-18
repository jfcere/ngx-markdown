import { HttpClient } from '@angular/common/http';
import { Injectable, Optional, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { parse, Renderer } from 'marked';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MarkedOptions } from './marked-options';

declare var Prism: {
  highlightAll: (async: boolean) => void;
};

// tslint:disable-next-line:max-line-length
export const errorSrcWithoutHttpClient = '[ngx-markdown] When using the [src] attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information';

@Injectable()
export class MarkdownService {
  get renderer(): Renderer {
    return this.options.renderer;
  }
  set renderer(value: marked.Renderer) {
    this.options.renderer = value;
  }

  constructor(
    @Optional() private http: HttpClient,
    private domSanitizer: DomSanitizer,
    public options: MarkedOptions,
  ) {
    if (!this.renderer) {
      this.renderer = new Renderer();
    }
  }

  compile(markdown: string, markedOptions = this.options): string {
    const precompiled = this.precompile(markdown);
    const compiled = parse(precompiled, markedOptions);
    return this.domSanitizer.sanitize(SecurityContext.HTML, compiled);
  }

  getSource(src: string): Observable<string> {
    if (!this.http) {
      throw new Error(errorSrcWithoutHttpClient);
    }

    return this.http
      .get(src, { responseType: 'text' })
      .pipe(map(markdown => this.handleExtension(src, markdown)));
  }

  highlight() {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll(false);
    }
  }

  private handleExtension(src: string, markdown: string): string {
    const extension = src
      ? src.split('.').splice(-1).join()
      : null;
    return extension !== 'md'
      ? '```' + extension + '\n' + markdown + '\n```'
      : markdown;
  }

  private precompile(markdown: string): string {
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
