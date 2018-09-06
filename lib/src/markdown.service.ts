import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { parse } from 'marked';
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

  get options(): MarkedOptions {
    return this._options;
  }
  set options(value: MarkedOptions) {
    this._options = Object.assign({},
      { renderer: new MarkedRenderer() },
      this._options,
      value,
    );
  }

  get renderer(): MarkedRenderer {
    return this.options.renderer;
  }
  set renderer(value: MarkedRenderer) {
    this.options.renderer = value;
  }

  constructor(
    @Optional() private _http: HttpClient,
    private _options: MarkedOptions,
  ) {
    this._http = _http;
    this.options = _options;
  }

  compile(markdown: string, decodeHtml = false, markedOptions = this.options): string {
    const precompiled = this.precompile(markdown);
    return parse(
      decodeHtml ? this.decodeHtml(precompiled) : precompiled,
      markedOptions);
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
