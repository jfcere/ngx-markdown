import { HttpClient } from '@angular/common/http';
import { Injectable, Optional, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { parse, Renderer } from 'marked';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MarkedOptions } from './marked-options';
import { MarkedRenderer } from './marked-renderer';

declare var Prism: {
  highlightAllUnder: (element: Element) => void;
};

// tslint:disable-next-line:max-line-length
export const errorSrcWithoutHttpClient = '[ngx-markdown] When using the [src] attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information';

@Injectable()
export class MarkdownService {
  get options(): MarkedOptions { return this._options; }
  set options(value: MarkedOptions) {
    this._options = Object.assign({},
      { renderer: new MarkedRenderer() },
      this._options,
      value,
    );
  }

  get renderer(): MarkedRenderer { return this._options.renderer; }
  set renderer(value: MarkedRenderer) {
    this._options.renderer = value;
  }

  constructor(
    @Optional() private _http: HttpClient,
    private _domSanitizer: DomSanitizer,
    private _options: MarkedOptions,
  ) { }

  compile(markdown: string, decodeHtml = false, markedOptions = this.options): string {
    const precompiled = this.precompile(markdown);
    const compiled = parse(
      decodeHtml ? this.decodeHtml(precompiled) : precompiled,
      markedOptions);
    return markedOptions.sanitize && !markedOptions.sanitizer
      ? this._domSanitizer.sanitize(SecurityContext.HTML, compiled)
      : compiled;
  }

  getSource(src: string): Observable<string> {
    if (!this._http) {
      throw new Error(errorSrcWithoutHttpClient);
    }
    return this._http
      .get(src, { responseType: 'text' })
      .pipe(map(markdown => this.handleExtension(src, markdown)));
  }

  highlight(element: Element) {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAllUnder(element);
    }
  }

  private decodeHtml(html: string) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
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
