import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional, PLATFORM_ID, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { marked, Renderer } from 'marked';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { KatexOptions } from './katex-options';
import { MarkedOptions } from './marked-options';
import { MarkedRenderer } from './marked-renderer';
import { MermaidAPI } from './mermaid-options';

declare let joypixels: {
  shortnameToUnicode(input: string): string;
};

declare let katex: {
  renderToString(tex: string, options?: KatexOptions): string;
};

declare let mermaid: {
  initialize: (options: MermaidAPI.Config) => void;
  init: (nodes: string | Node | NodeList) => void;
  parse: (text: string) => string;
};

declare let Prism: {
  highlightAllUnder: (element: Element | Document) => void;
};

/* eslint-disable max-len */
export const errorJoyPixelsNotLoaded = '[ngx-markdown] When using the `emoji` attribute you *have to* include Emoji-Toolkit files to `angular.json` or use imports. See README for more information';
export const errorKatexNotLoaded = '[ngx-markdown] When using the `katex` attribute you *have to* include KaTeX files to `angular.json` or use imports. See README for more information';
export const errorMermaidNotLoaded = '[ngx-markdown] When using the `mermaid` attribute you *have to* include Mermaid files to `angular.json` or use imports. See README for more information';
export const errorSrcWithoutHttpClient = '[ngx-markdown] When using the `src` attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information';
/* eslint-enable max-len */

export const SECURITY_CONTEXT = new InjectionToken<SecurityContext>('SECURITY_CONTEXT');

export interface ParseOptions {
  decodeHtml?: boolean;
  emoji?: boolean;
  katex?: boolean;
  katexOptions?: KatexOptions;
  mermaid?: boolean;
  markedOptions?: MarkedOptions;
}

export interface RenderOptions {
  mermaid?: boolean;
  mermaidOptions?: MermaidAPI.Config;
}

export class ExtendedRenderer extends Renderer {
  ɵNgxMarkdownRendererExtended = false;
}

@Injectable()
export class MarkdownService {

  private readonly DEFAULT_COMPILE_OPTIONS: ParseOptions = {
    decodeHtml: false,
    emoji: false,
    katex: false,
    katexOptions: undefined,
    mermaid: false,
    markedOptions: undefined,
  };

  private readonly DEFAULT_RENDER_OPTIONS: RenderOptions = {
    mermaid: false,
    mermaidOptions: undefined,
  };

  private readonly DEFAULT_MARKED_OPTIONS: MarkedOptions = {
    renderer: new MarkedRenderer(),
  };

  private readonly DEFAULT_MERMAID_OPTIONS: MermaidAPI.Config = {
    startOnLoad: false,
  };

  private _options: MarkedOptions | undefined;

  get options(): MarkedOptions { return this._options!; }
  set options(value: MarkedOptions) {
    this._options = { ...this.DEFAULT_MARKED_OPTIONS, ...value };
  }

  get renderer(): MarkedRenderer { return this.options.renderer!; }
  set renderer(value: MarkedRenderer) {
    this.options.renderer = value;
  }

  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    @Inject(SECURITY_CONTEXT) private securityContext: SecurityContext,
    @Optional() private http: HttpClient,
    @Optional() options: MarkedOptions,
    private sanitizer: DomSanitizer,
  ) {
    this.options = options;
  }

  parse(markdown: string, options: ParseOptions = this.DEFAULT_COMPILE_OPTIONS): string {
    const {
      decodeHtml,
      emoji,
      katex,
      katexOptions,
      mermaid,
      markedOptions = this.DEFAULT_MARKED_OPTIONS,
    } = options;

    if (mermaid) {
      this.renderer = this.extendRenderer(markedOptions.renderer || new Renderer());
    }

    const trimmed = this.trimIndentation(markdown);
    const decoded = decodeHtml ? this.decodeHtml(trimmed) : trimmed;
    const emojified = emoji ? this.renderEmoji(decoded) : decoded;
    const katexed = katex ? this.renderKatex(emojified, katexOptions) : emojified;
    const marked = this.renderMarked(katexed, markedOptions);

    return this.sanitizer.sanitize(this.securityContext, marked) || '';
  }

  render(element: HTMLElement, options: RenderOptions = this.DEFAULT_RENDER_OPTIONS): void {
    const {
      mermaid,
      mermaidOptions,
    } = options;

    if (mermaid) {
      this.renderMermaid(element, mermaidOptions);
    }

    this.highlight(element);
  }

  getSource(src: string): Observable<string> {
    if (!this.http) {
      throw new Error(errorSrcWithoutHttpClient);
    }
    return this.http
      .get(src, { responseType: 'text' })
      .pipe(map(markdown => this.handleExtension(src, markdown)));
  }

  highlight(element?: Element | Document): void {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }
    if (typeof Prism === 'undefined' || typeof Prism.highlightAllUnder === 'undefined') {
      return;
    }
    if (!element) {
      element = document;
    }
    const noLanguageElements = element.querySelectorAll('pre code:not([class*="language-"])');
    Array.prototype.forEach.call(noLanguageElements, (x: Element) => x.classList.add('language-none'));
    Prism.highlightAllUnder(element);
  }

  private decodeHtml(html: string): string {
    if (!isPlatformBrowser(this.platform)) {
      return html;
    }
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
  }

  private extendRenderer(renderer: Renderer): Renderer {
    const extendedRenderer = renderer as ExtendedRenderer;
    if (extendedRenderer.ɵNgxMarkdownRendererExtended === true) {
      return renderer;
    }

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const defaultCode = renderer.code;
    renderer.code = function (code: string, language: string | undefined, isEscaped: boolean) {
      return language === 'mermaid'
        ? `<div class="mermaid">${code}</div>`
        : defaultCode.call(this, code, language, isEscaped);
    };

    extendedRenderer.ɵNgxMarkdownRendererExtended = true;

    return renderer;
  }

  private handleExtension(src: string, markdown: string): string {
    const extension = src
      ? src.split('?')[0].split('.').splice(-1).join()
      : '';
    return extension !== 'md'
      ? '```' + extension + '\n' + markdown + '\n```'
      : markdown;
  }

  private renderMarked(html: string, markedOptions: MarkedOptions): string {
    if (!isPlatformBrowser(this.platform)) {
      return html;
    }
    return marked(html, markedOptions);
  }

  private renderEmoji(html: string): string {
    if (!isPlatformBrowser(this.platform)) {
      return html;
    }
    if (typeof joypixels === 'undefined' || typeof joypixels.shortnameToUnicode === 'undefined') {
      throw new Error(errorJoyPixelsNotLoaded);
    }
    return joypixels.shortnameToUnicode(html);
  }

  private renderKatex(html: string, options?: KatexOptions): string {
    if (!isPlatformBrowser(this.platform)) {
      return html;
    }
    if (typeof katex === 'undefined' || typeof katex.renderToString === 'undefined') {
      throw new Error(errorKatexNotLoaded);
    }
    return html.replace(/\$([^\s][^$]*?[^\s])\$/gm, (_, tex) => katex.renderToString(tex, options));
  }

  private renderMermaid(element: HTMLElement, options: MermaidAPI.Config = this.DEFAULT_MERMAID_OPTIONS): void {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }
    if (typeof mermaid === 'undefined' || typeof mermaid.init === 'undefined') {
      throw new Error(errorMermaidNotLoaded);
    }
    const mermaidElements = element.querySelectorAll('.mermaid');
    if (mermaidElements.length === 0) {
      return;
    }
    mermaid.initialize(options);
    mermaid.init(mermaidElements);
  }

  private trimIndentation(markdown: string): string {
    if (!markdown) {
      return '';
    }
    let indentStart: number;
    return markdown
      .split('\n')
      .map(line => {
        let lineIdentStart = indentStart;
        if (line.length > 0) {
          lineIdentStart = isNaN(lineIdentStart)
            ? line.search(/\S|$/)
            : Math.min(line.search(/\S|$/), lineIdentStart);
        }
        if (isNaN(indentStart)) {
          indentStart = lineIdentStart;
        }
        return lineIdentStart
          ? line.substring(lineIdentStart)
          : line;
      }).join('\n');
  }
}
