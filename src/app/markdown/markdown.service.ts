import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as markdownit from 'markdown-it';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { MarkdownOptions } from './models';

@Injectable()
export class MarkdownService {
  markdownIt: markdownit.MarkdownIt;

  constructor(
    private http: Http,
    markdownOptions: MarkdownOptions,
  ) {
    this.markdownIt = this.createMarkdownitInstance(markdownOptions);
  }

  compile(markdown: string) {
    const precompiled = this.precompile(markdown);
    return this.markdownIt.render(precompiled);
  }

  getSource(src: string) {
    const extension = src
      ? src.split('.').splice(-1).join()
      : null;
    return this.httpGet(src)
      .map<string, string>(data => {
        return extension !== 'md'
          ? '```' + extension + '\n' + data + '\n```'
          : data;
      });
  }

  highlight() {
    if (window['Prism']) {
      window['Prism'].highlightAll(false);
    }
  }

  private createMarkdownitInstance(markdownOptions?: MarkdownOptions) {
    if (!markdownOptions) {
      return markdownit();
    }
    if (markdownOptions.preset) {
      return markdownit(markdownOptions.preset, markdownOptions.options);
    }
    return markdownit(markdownOptions.options);
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

  private httpGet(src: string) {
    return this.http.get(src)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private precompile(raw: string) {
    if (!raw) {
      return '';
    }
    let indentStart: number;
    return raw
      .replace(/\&gt;/g, '>')
      .split('\n')
      .map((line: string) => {
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
