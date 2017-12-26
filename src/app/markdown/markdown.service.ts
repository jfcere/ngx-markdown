import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as marked from 'marked';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { MarkedOptionsToken } from './marked-options.token';

@Injectable()
export class MarkdownService {
  renderer: marked.Renderer;

  constructor(
    private http: Http,
    @Inject(MarkedOptionsToken) public markedOptions: marked.MarkedOptions,
  ) {
    this.renderer = new marked.Renderer();
  }

  compile(markdown: string, markedOptions = this.markedOptions) {
    const precompiled = this.precompile(markdown);
    const options = Object.assign({ renderer: this.renderer }, markedOptions);
    return marked(precompiled, options);
  }

  getSource(src: string) {
    return this.http
      .get(src)
      .catch(error => this.handleError(error))
      .map(data => this.extractData(data))
      .map(markdown => this.handleExtension(src, markdown));
  }

  highlight() {
    if (!window['Prism']) {
      return;
    }
    window['Prism'].highlightAll(false);
  }

  private extractData(response: Response) {
    return response.text() || '';
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
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
