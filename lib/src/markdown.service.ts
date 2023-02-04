import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { EmbeddedViewRef, Inject, Injectable, InjectionToken, Optional, PLATFORM_ID, SecurityContext, ViewContainerRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { marked, Renderer } from 'marked';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClipboardButtonComponent } from './clipboard-button.component';
import { ClipboardOptions, ClipboardRenderOptions } from './clipboard-options';
import { KatexOptions } from './katex-options';
import { MarkedOptions } from './marked-options';
import { MarkedRenderer } from './marked-renderer';
import { MermaidAPI } from './mermaid-options';

// clipboard
declare let ClipboardJS: {
  new (
    selector: string | Element | NodeListOf<Element>,
    options?: { text?: (elem: Element) => string; },
  ): typeof ClipboardJS;
  destroy(): void;
};

// emoji
declare let joypixels: {
  shortnameToUnicode(input: string): string;
};

// katex
declare let katex: unknown;
declare function renderMathInElement(elem: HTMLElement, options?: KatexOptions): void;

// mermaid
declare let mermaid: {
  initialize: (options: MermaidAPI.Config) => void;
  init: (nodes: string | Node | NodeList) => void;
  parse: (text: string) => string;
};

// prism
declare let Prism: {
  highlightAllUnder: (element: Element | Document) => void;
};

/* eslint-disable max-len */
export const errorJoyPixelsNotLoaded = '[ngx-markdown] When using the `emoji` attribute you *have to* include Emoji-Toolkit files to `angular.json` or use imports. See README for more information';
export const errorKatexNotLoaded = '[ngx-markdown] When using the `katex` attribute you *have to* include KaTeX files to `angular.json` or use imports. See README for more information';
export const errorMermaidNotLoaded = '[ngx-markdown] When using the `mermaid` attribute you *have to* include Mermaid files to `angular.json` or use imports. See README for more information';
export const errorClipboardNotLoaded = '[ngx-markdown] When using the `clipboard` attribute you *have to* include Clipboard files to `angular.json` or use imports. See README for more information';
export const errorClipboardViewContainerRequired = '[ngx-markdown] When using the `clipboard` attribute you *have to* provide the `viewContainerRef` parameter to `MarkdownService.render()` function';
export const errorSrcWithoutHttpClient = '[ngx-markdown] When using the `src` attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information';
/* eslint-enable max-len */

export const SECURITY_CONTEXT = new InjectionToken<SecurityContext>('SECURITY_CONTEXT');

export interface ParseOptions {
  decodeHtml?: boolean;
  inline?: boolean;
  emoji?: boolean;
  mermaid?: boolean;
  markedOptions?: MarkedOptions;
  disableSanitizer?: boolean;
}

export interface RenderOptions {
  clipboard?: boolean;
  clipboardOptions?: ClipboardRenderOptions;
  katex?: boolean;
  katexOptions?: KatexOptions;
  mermaid?: boolean;
  mermaidOptions?: MermaidAPI.Config;
}

export class ExtendedRenderer extends Renderer {
  ɵNgxMarkdownRendererExtended = false;
}

@Injectable()
export class MarkdownService {

  private readonly DEFAULT_MARKED_OPTIONS: MarkedOptions = {
    renderer: new MarkedRenderer(),
  };

  private readonly DEFAULT_KATEX_OPTIONS: KatexOptions = {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\begin{equation}", right: "\\end{equation}", display: true },
      { left: "\\begin{align}", right: "\\end{align}", display: true },
      { left: "\\begin{alignat}", right: "\\end{alignat}", display: true },
      { left: "\\begin{gather}", right: "\\end{gather}", display: true },
      { left: "\\begin{CD}", right: "\\end{CD}", display: true },
      { left: "\\[", right: "\\]", display: true },
    ],
  };

  private readonly DEFAULT_MERMAID_OPTIONS: MermaidAPI.Config = {
    startOnLoad: false,
  };

  private readonly DEFAULT_CLIPBOARD_OPTIONS: ClipboardOptions = {
    buttonComponent: undefined,
  };

  private readonly DEFAULT_PARSE_OPTIONS: ParseOptions = {
    decodeHtml: false,
    inline: false,
    emoji: false,
    mermaid: false,
    markedOptions: this.DEFAULT_MARKED_OPTIONS,
    disableSanitizer: false,
  };

  private readonly DEFAULT_RENDER_OPTIONS: RenderOptions = {
    clipboard: false,
    clipboardOptions: undefined,
    katex: false,
    katexOptions: undefined,
    mermaid: false,
    mermaidOptions: undefined,
  };

  private _options: MarkedOptions | undefined;

  get options(): MarkedOptions { return this._options!; }
  set options(value: MarkedOptions | undefined) {
    this._options = { ...this.DEFAULT_MARKED_OPTIONS, ...value };
  }

  get renderer(): MarkedRenderer { return this.options.renderer!; }
  set renderer(value: MarkedRenderer) {
    this.options.renderer = value;
  }

  private readonly _reload$ = new Subject<void>();
  readonly reload$ = this._reload$.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    @Inject(SECURITY_CONTEXT) private securityContext: SecurityContext,
    @Optional() private http: HttpClient,
    @Optional() private clipboardOptions: ClipboardOptions,
    @Optional() options: MarkedOptions,
    private sanitizer: DomSanitizer,
  ) {
    this.options = options;
  }

  parse(markdown: string, parseOptions: ParseOptions = this.DEFAULT_PARSE_OPTIONS): string {
    const {
      decodeHtml,
      inline,
      emoji,
      mermaid,
      disableSanitizer,
    } = parseOptions;

    const markedOptions = {
      ...this.options,
      ...parseOptions.markedOptions,
    };

    if (mermaid) {
      this.renderer = this.extendRenderer(markedOptions.renderer || new Renderer());
    }

    const trimmed = this.trimIndentation(markdown);
    const decoded = decodeHtml ? this.decodeHtml(trimmed) : trimmed;
    const emojified = emoji ? this.parseEmoji(decoded) : decoded;
    const marked = this.parseMarked(emojified, markedOptions, inline);
    const sanitized = disableSanitizer ? marked : this.sanitizer.sanitize(this.securityContext, marked);

    return sanitized || '';
  }

  render(element: HTMLElement, options: RenderOptions = this.DEFAULT_RENDER_OPTIONS, viewContainerRef?: ViewContainerRef): void {
    const {
      clipboard,
      clipboardOptions,
      katex,
      katexOptions,
      mermaid,
      mermaidOptions,
    } = options;

    if (clipboard) {
      this.renderClipboard(element, viewContainerRef, {
        ...this.DEFAULT_CLIPBOARD_OPTIONS,
        ...this.clipboardOptions,
        ...clipboardOptions,
      });
    }
    if (katex) {
      this.renderKatex(element, {
        ...this.DEFAULT_KATEX_OPTIONS,
        ...katexOptions,
      });
    }
    if (mermaid) {
      this.renderMermaid(element, {
        ...this.DEFAULT_MERMAID_OPTIONS,
        ...mermaidOptions,
      });
    }

    this.highlight(element);
  }

  reload(): void {
    this._reload$.next();
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
    const urlProtocolIndex = src.lastIndexOf('://');
    const urlWithoutProtocol = urlProtocolIndex > -1
      ? src.substring(urlProtocolIndex + 4)
      : src;

    const lastSlashIndex = urlWithoutProtocol.lastIndexOf('/');
    const lastUrlSegment = lastSlashIndex > -1
      ? urlWithoutProtocol.substring(lastSlashIndex + 1).split('?')[0]
      : '';

    const lastDotIndex = lastUrlSegment.lastIndexOf('.');
    const extension = lastDotIndex > -1
      ? lastUrlSegment.substring(lastDotIndex + 1)
      : '';

    return !!extension && extension !== 'md'
      ? '```' + extension + '\n' + markdown + '\n```'
      : markdown;
  }

  private parseMarked(html: string, markedOptions: MarkedOptions, inline = false): string {
    return inline
      ? marked.parseInline(html, markedOptions)
      : marked.parse(html, markedOptions);
  }

  private parseEmoji(html: string): string {
    if (!isPlatformBrowser(this.platform)) {
      return html;
    }
    if (typeof joypixels === 'undefined' || typeof joypixels.shortnameToUnicode === 'undefined') {
      throw new Error(errorJoyPixelsNotLoaded);
    }
    return joypixels.shortnameToUnicode(html);
  }

  private renderKatex(element: HTMLElement, options: KatexOptions): void {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }
    if (typeof katex === 'undefined' || typeof renderMathInElement === 'undefined') {
      throw new Error(errorKatexNotLoaded);
    }
    renderMathInElement(element, options);
  }

  private renderClipboard(element: HTMLElement, viewContainerRef: ViewContainerRef | undefined, options: ClipboardRenderOptions): void {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }
    if (typeof ClipboardJS === 'undefined') {
      throw new Error(errorClipboardNotLoaded);
    }
    if (!viewContainerRef) {
      throw new Error(errorClipboardViewContainerRequired);
    }

    const {
      buttonComponent,
      buttonTemplate,
    } = options;

    // target every <pre> elements
    const preElements = element.querySelectorAll('pre');
    for (let i = 0; i < preElements.length; i++) {
      const preElement = preElements.item(i);

      // create <pre> wrapper element
      const preWrapperElement = document.createElement('div');
      preWrapperElement.style.position = 'relative';
      preElement.parentNode!.insertBefore(preWrapperElement, preElement);
      preWrapperElement.appendChild(preElement);

      // create toolbar element
      const toolbarWrapperElement = document.createElement('div');
      toolbarWrapperElement.style.position = 'absolute';
      toolbarWrapperElement.style.top = '.5em';
      toolbarWrapperElement.style.right = '.5em';
      toolbarWrapperElement.style.opacity = '0';
      toolbarWrapperElement.style.transition = 'opacity 250ms ease-out';
      preWrapperElement.insertAdjacentElement('beforeend', toolbarWrapperElement);

      // register listener to show/hide toolbar
      preElement.onmouseover = () => toolbarWrapperElement.style.opacity = '1';
      preElement.onmouseout = () => toolbarWrapperElement.style.opacity = '0';

      // declare embeddedViewRef holding variable
      let embeddedViewRef: EmbeddedViewRef<unknown>;

      // use provided component via input property
      // or provided via ClipboardOptions provider
      if (buttonComponent) {
        const componentRef = viewContainerRef.createComponent(buttonComponent);
        embeddedViewRef = componentRef.hostView as EmbeddedViewRef<unknown>;
      }
      // use provided template via input property
      else if (buttonTemplate) {
        embeddedViewRef = viewContainerRef.createEmbeddedView(buttonTemplate);
      }
      // use default component
      else {
        const componentRef = viewContainerRef.createComponent(ClipboardButtonComponent);
        embeddedViewRef = componentRef.hostView as EmbeddedViewRef<unknown>;
      }

      // declare clipboard instance variable
      let clipboardInstance: typeof ClipboardJS;

      // attach clipboard.js to root node
      embeddedViewRef.rootNodes.forEach((node: HTMLElement) => {
        node.onmouseover = () => toolbarWrapperElement.style.opacity = '1';
        toolbarWrapperElement.appendChild(node);
        clipboardInstance = new ClipboardJS(node, { text: () => preElement.innerText });
      });

      // destroy clipboard instance when view is destroyed
      embeddedViewRef.onDestroy(() => clipboardInstance.destroy());
    }
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
