import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional, PLATFORM_ID, SecurityContext } from '@angular/core';
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
  get renderer(): Renderer { return this.options.renderer; }
  set renderer(value: marked.Renderer) {
    this.options.renderer = value;
  }

  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    @Optional() private http: HttpClient,
    private domSanitizer: DomSanitizer,
    public options: MarkedOptions,
  ) {
    if (!this.renderer) {
      this.renderer = new Renderer();
    }
  }

  compile(markdown: string, decodeHtml = false, markedOptions = this.options): string {
    const precompiled = this.precompile(markdown);
    const compiled = parse(
      decodeHtml ? this.decodeHtml(precompiled) : precompiled,
      markedOptions);
    return markedOptions.sanitize && !markedOptions.sanitizer
      ? this.domSanitizer.sanitize(SecurityContext.HTML, compiled)
      : compiled;
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

  private decodeHtml(html: string) {
    if (isPlatformBrowser(this.platform)) {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = html;
      return textarea.value;
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
      .split('\n')
      .map(line => {
        // set current line ident start to base reference indentation
        let lineIdentStart = indentStart;
        // find position of 1st non-whitespace character
        // to determine the current line indentation start
        if (line.length > 0) {
          lineIdentStart = isNaN(lineIdentStart)
            ? line.search(/\S|$/)
            : Math.min(line.search(/\S|$/), lineIdentStart);
        }
        // keep 1st non-whitespace line indentation
        // as base reference for other lines
        if (isNaN(indentStart)) {
          indentStart = lineIdentStart;
        }
        // remove whitespaces before current line indentation
        return !!lineIdentStart
          ? line.substring(lineIdentStart)
          : line;
      }).join('\n');
  }
}
