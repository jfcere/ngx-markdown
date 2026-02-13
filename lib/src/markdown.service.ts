import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  EmbeddedViewRef,
  inject,
  Injectable,
  NgZone,
  PLATFORM_ID,
  SecurityContext,
  ViewContainerRef,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { marked, MarkedExtension, Renderer } from 'marked';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClipboardButtonComponent } from './clipboard-button.component';
import {
  CLIPBOARD_OPTIONS,
  ClipboardOptions,
  ClipboardRenderOptions,
} from './clipboard-options';
import { KatexOptions } from './katex-options';
import { MARKED_EXTENSIONS } from './marked-extensions';
import { MARKED_OPTIONS, MarkedOptions } from './marked-options';
import { MarkedRenderer } from './marked-renderer';
import { MERMAID_OPTIONS, MermaidAPI } from './mermaid-options';
import { isSanitizeFunction, SANITIZE } from './sanitize-options';

// clipboard
declare let ClipboardJS: {
  new (
    selector: string | Element | NodeListOf<Element>,
    options?: { text?: (elem: Element) => string },
  ): typeof ClipboardJS;
  destroy(): void;
};

// emoji
declare let joypixels: {
  shortnameToUnicode(input: string): string;
};

// katex
declare let katex: unknown;
declare function renderMathInElement(
  elem: HTMLElement,
  options?: KatexOptions,
): void;

// mermaid
declare let mermaid: {
  initialize: (options: MermaidAPI.MermaidConfig) => void;
  run: (runOptions: MermaidAPI.RunOptions) => void;
};

// prism
declare let Prism: {
  highlightAllUnder: (element: Element | Document) => void;
};

export const errorJoyPixelsNotLoaded =
  '[ngx-markdown] When using the `emoji` attribute you *have to* include Emoji-Toolkit files to `angular.json` or use imports. See README for more information';
export const errorKatexNotLoaded =
  '[ngx-markdown] When using the `katex` attribute you *have to* include KaTeX files to `angular.json` or use imports. See README for more information';
export const errorMermaidNotLoaded =
  '[ngx-markdown] When using the `mermaid` attribute you *have to* include Mermaid files to `angular.json` or use imports. See README for more information';
export const errorClipboardNotLoaded =
  '[ngx-markdown] When using the `clipboard` attribute you *have to* include Clipboard files to `angular.json` or use imports. See README for more information';
export const errorClipboardViewContainerRequired =
  '[ngx-markdown] When using the `clipboard` attribute you *have to* provide the `viewContainerRef` parameter to `MarkdownService.render()` function';
export const errorSrcWithoutHttpClient =
  '[ngx-markdown] When using the `src` attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information';

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
  mermaidOptions?: MermaidAPI.MermaidConfig;
}

export class ExtendedRenderer extends Renderer {
  ɵNgxMarkdownRendererExtendedForExtensions = false;
  ɵNgxMarkdownRendererExtendedForMermaid = false;
}

@Injectable()
export class MarkdownService {
  private clipboardOptions = inject(CLIPBOARD_OPTIONS, { optional: true });
  private extensions = inject<MarkedExtension[]>(MARKED_EXTENSIONS, {
    optional: true,
  });
  private http = inject(HttpClient, { optional: true });
  private mermaidOptions = inject(MERMAID_OPTIONS, { optional: true });
  private platform = inject(PLATFORM_ID);
  private sanitize = inject(SANITIZE, { optional: true });
  private sanitizer = inject(DomSanitizer);
  private ngZone = inject(NgZone);

  private readonly DEFAULT_MARKED_OPTIONS: MarkedOptions = {
    renderer: new MarkedRenderer(),
  };

  private readonly DEFAULT_KATEX_OPTIONS: KatexOptions = {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\(', right: '\\)', display: false },
      { left: '\\begin{equation}', right: '\\end{equation}', display: true },
      { left: '\\begin{align}', right: '\\end{align}', display: true },
      { left: '\\begin{alignat}', right: '\\end{alignat}', display: true },
      { left: '\\begin{gather}', right: '\\end{gather}', display: true },
      { left: '\\begin{CD}', right: '\\end{CD}', display: true },
      { left: '\\[', right: '\\]', display: true },
    ],
  };

  private readonly DEFAULT_MERMAID_OPTIONS: MermaidAPI.MermaidConfig = {
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
    markedOptions: undefined,
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

  private readonly DEFAULT_SECURITY_CONTEXT = SecurityContext.HTML;

  private _options: MarkedOptions | null = null;

  get options(): MarkedOptions {
    return this._options!;
  }
  set options(value: MarkedOptions | null) {
    this._options = { ...this.DEFAULT_MARKED_OPTIONS, ...value };
  }

  get renderer(): MarkedRenderer {
    return this.options.renderer!;
  }
  set renderer(value: MarkedRenderer) {
    this.options.renderer = value;
  }

  private readonly _reload$ = new Subject<void>();
  readonly reload$ = this._reload$.asObservable();

  constructor() {
    this.options = inject<MarkedOptions>(MARKED_OPTIONS, { optional: true });
  }

  parse(
    markdown: string,
    parseOptions: ParseOptions = this.DEFAULT_PARSE_OPTIONS,
  ): string | Promise<string> {
    const { decodeHtml, inline, emoji, mermaid, disableSanitizer } =
      parseOptions;

    const markedOptions = {
      ...this.options,
      ...parseOptions.markedOptions,
    };

    const renderer = markedOptions.renderer || this.renderer || new Renderer();

    if (this.extensions) {
      this.renderer = this.extendsRendererForExtensions(renderer);
    }

    if (mermaid) {
      this.renderer = this.extendsRendererForMermaid(renderer);
    }

    const trimmed = this.trimIndentation(markdown);
    const decoded = decodeHtml ? this.decodeHtml(trimmed) : trimmed;
    const emojified = emoji ? this.parseEmoji(decoded) : decoded;
    const marked = this.parseMarked(emojified, markedOptions, inline);
    const sanitized = disableSanitizer ? marked : this.sanitizeHtml(marked);

    return sanitized;
  }

  render(
    element: HTMLElement,
    options: RenderOptions = this.DEFAULT_RENDER_OPTIONS,
    viewContainerRef?: ViewContainerRef,
  ): void {
    const {
      clipboard,
      clipboardOptions,
      katex,
      katexOptions,
      mermaid,
      mermaidOptions,
    } = options;

    if (katex) {
      this.renderKatex(element, {
        ...this.DEFAULT_KATEX_OPTIONS,
        ...katexOptions,
      });
    }
    if (mermaid) {
      this.renderMermaid(element, {
        ...this.DEFAULT_MERMAID_OPTIONS,
        ...this.mermaidOptions,
        ...mermaidOptions,
      });
    }
    if (clipboard) {
      this.renderClipboard(element, viewContainerRef, {
        ...this.DEFAULT_CLIPBOARD_OPTIONS,
        ...this.clipboardOptions,
        ...clipboardOptions,
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
    return new Observable<string>((subscriber) => {
      // runOutsideAngular prevents HttpClient from triggering multiple change detection cycles.
      // HttpClient emits zone.js events for each XHR progress stage (send, download progress, load, etc.),
      // and each event would normally trigger change detection in Angular.
      // By running outside Angular's zone, we:
      // 1. Prevent unnecessary CD cycles during HTTP request lifecycle
      // 2. Only trigger CD when explicitly needed (when the outer Observable is used in a template)
      // 3. Improve performance by avoiding intermediate change detection runs
      //
      // We wrap HttpClient in a new Observable because HttpClient is "cold" -
      // the XHR request only fires when subscribe() is called.
      // The outer Observable gives us control over when/how the HTTP request is triggered
      // and allows us to manage the zone behavior at subscription time.
      return this.ngZone.runOutsideAngular(() =>
        this.http!.get(src, { responseType: 'text' })
          .pipe(map((markdown) => this.handleExtension(src, markdown)))
          .subscribe(subscriber),
      );
    });
  }

  highlight(element?: Element | Document): void {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }
    if (
      typeof Prism === 'undefined' ||
      typeof Prism.highlightAllUnder === 'undefined'
    ) {
      return;
    }
    if (!element) {
      element = document;
    }
    const noLanguageElements = element.querySelectorAll(
      'pre code:not([class*="language-"])',
    );
    Array.prototype.forEach.call(noLanguageElements, (x: Element) =>
      x.classList.add('language-none'),
    );
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

  private extendsRendererForExtensions(renderer: Renderer): Renderer {
    const extendedRenderer = renderer as ExtendedRenderer;
    if (extendedRenderer.ɵNgxMarkdownRendererExtendedForExtensions === true) {
      return renderer;
    }

    if (this.extensions && this.extensions.length > 0) {
      marked.use(...this.extensions);
    }

    extendedRenderer.ɵNgxMarkdownRendererExtendedForExtensions = true;

    return renderer;
  }

  private extendsRendererForMermaid(renderer: Renderer): Renderer {
    const extendedRenderer = renderer as ExtendedRenderer;
    if (extendedRenderer.ɵNgxMarkdownRendererExtendedForMermaid === true) {
      return renderer;
    }

    const defaultCode = renderer.code;
    renderer.code = (token) => {
      return token.lang === 'mermaid'
        ? `<div class="mermaid">${token.text}</div>`
        : defaultCode(token);
    };

    extendedRenderer.ɵNgxMarkdownRendererExtendedForMermaid = true;

    return renderer;
  }

  private handleExtension(src: string, markdown: string): string {
    const urlProtocolIndex = src.lastIndexOf('://');
    const urlWithoutProtocol =
      urlProtocolIndex > -1 ? src.substring(urlProtocolIndex + 4) : src;

    const lastSlashIndex = urlWithoutProtocol.lastIndexOf('/');
    const lastUrlSegment =
      lastSlashIndex > -1
        ? urlWithoutProtocol.substring(lastSlashIndex + 1).split('?')[0]
        : '';

    const lastDotIndex = lastUrlSegment.lastIndexOf('.');
    const extension =
      lastDotIndex > -1 ? lastUrlSegment.substring(lastDotIndex + 1) : '';

    return !!extension && extension !== 'md'
      ? '```' + extension + '\n' + markdown + '\n```'
      : markdown;
  }

  private parseMarked(
    html: string,
    markedOptions: MarkedOptions,
    inline = false,
  ): string | Promise<string> {
    if (markedOptions.renderer) {
      // clone renderer and remove extended flags otherwise
      // marked throws an error thinking it is a renderer prop
      const renderer = {
        ...markedOptions.renderer,
      } as Partial<ExtendedRenderer>;
      delete renderer.ɵNgxMarkdownRendererExtendedForExtensions;
      delete renderer.ɵNgxMarkdownRendererExtendedForMermaid;

      // remove renderer from markedOptions because if renderer is
      // passed to marked.parse method, it will ignore all extensions
      delete markedOptions.renderer;

      marked.use({ renderer });
    }

    return inline
      ? marked.parseInline(html, markedOptions)
      : marked.parse(html, markedOptions);
  }

  private parseEmoji(html: string): string {
    if (!isPlatformBrowser(this.platform)) {
      return html;
    }
    if (
      typeof joypixels === 'undefined' ||
      typeof joypixels.shortnameToUnicode === 'undefined'
    ) {
      throw new Error(errorJoyPixelsNotLoaded);
    }
    return joypixels.shortnameToUnicode(html);
  }

  private renderKatex(element: HTMLElement, options: KatexOptions): void {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }
    if (
      typeof katex === 'undefined' ||
      typeof renderMathInElement === 'undefined'
    ) {
      throw new Error(errorKatexNotLoaded);
    }
    renderMathInElement(element, options);
  }

  private renderClipboard(
    element: HTMLElement,
    viewContainerRef: ViewContainerRef | undefined,
    options: ClipboardRenderOptions,
  ): void {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }
    if (typeof ClipboardJS === 'undefined') {
      throw new Error(errorClipboardNotLoaded);
    }
    if (!viewContainerRef) {
      throw new Error(errorClipboardViewContainerRequired);
    }

    const { buttonComponent, buttonTemplate } = options;

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
      toolbarWrapperElement.classList.add('markdown-clipboard-toolbar');
      toolbarWrapperElement.style.position = 'absolute';
      toolbarWrapperElement.style.top = '.5em';
      toolbarWrapperElement.style.right = '.5em';
      toolbarWrapperElement.style.zIndex = '1';
      preWrapperElement.insertAdjacentElement(
        'beforeend',
        toolbarWrapperElement,
      );

      // register listener to show/hide toolbar
      preWrapperElement.onmouseenter = () =>
        toolbarWrapperElement.classList.add('hover');
      preWrapperElement.onmouseleave = () =>
        toolbarWrapperElement.classList.remove('hover');

      // declare embeddedViewRef holding variable
      let embeddedViewRef: EmbeddedViewRef<unknown>;

      // use provided component via input property
      // or provided via ClipboardOptions provider
      if (buttonComponent) {
        const componentRef = viewContainerRef.createComponent(buttonComponent);
        embeddedViewRef = componentRef.hostView as EmbeddedViewRef<unknown>;
        componentRef.changeDetectorRef.markForCheck();
      }
      // use provided template via input property
      else if (buttonTemplate) {
        embeddedViewRef = viewContainerRef.createEmbeddedView(buttonTemplate);
      }
      // use default component
      else {
        const componentRef = viewContainerRef.createComponent(
          ClipboardButtonComponent,
        );
        embeddedViewRef = componentRef.hostView as EmbeddedViewRef<unknown>;
        componentRef.changeDetectorRef.markForCheck();
      }

      // declare clipboard instance variable
      let clipboardInstance: typeof ClipboardJS;

      // attach clipboard.js to root node
      embeddedViewRef.rootNodes.forEach((node: HTMLElement) => {
        toolbarWrapperElement.appendChild(node);
        clipboardInstance = new ClipboardJS(node, {
          text: () => preElement.innerText,
        });
      });

      // destroy clipboard instance when view is destroyed
      embeddedViewRef.onDestroy(() => clipboardInstance.destroy());
    }
  }

  private renderMermaid(
    element: HTMLElement,
    options: MermaidAPI.MermaidConfig = this.DEFAULT_MERMAID_OPTIONS,
  ): void {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }
    if (
      typeof mermaid === 'undefined' ||
      typeof mermaid.initialize === 'undefined'
    ) {
      throw new Error(errorMermaidNotLoaded);
    }
    const mermaidElements = element.querySelectorAll<HTMLElement>('.mermaid');
    if (mermaidElements.length === 0) {
      return;
    }
    mermaid.initialize(options);
    mermaid.run({ nodes: mermaidElements });
  }

  private trimIndentation(markdown: string): string {
    if (!markdown) {
      return '';
    }
    let indentStart: number;
    return markdown
      .split('\n')
      .map((line) => {
        let lineIdentStart = indentStart;
        if (line.length > 0) {
          lineIdentStart = isNaN(lineIdentStart)
            ? line.search(/\S|$/)
            : Math.min(line.search(/\S|$/), lineIdentStart);
        }
        if (isNaN(indentStart)) {
          indentStart = lineIdentStart;
        }
        return lineIdentStart ? line.substring(lineIdentStart) : line;
      })
      .join('\n');
  }

  private async sanitizeHtml(html: string | Promise<string>): Promise<string> {
    if (isSanitizeFunction(this.sanitize)) {
      return this.sanitize(await html);
    }
    if (this.sanitize !== SecurityContext.NONE) {
      return (
        this.sanitizer.sanitize(
          this.sanitize ?? this.DEFAULT_SECURITY_CONTEXT,
          html,
        ) ?? ''
      );
    }
    return html;
  }
}
