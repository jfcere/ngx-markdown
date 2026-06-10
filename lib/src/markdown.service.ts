import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { EmbeddedViewRef, inject, Injectable, PLATFORM_ID, SecurityContext, ViewContainerRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { marked, MarkedExtension, Renderer, TokenizerExtension, TokenizerThis } from 'marked';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClipboardButtonComponent } from './clipboard-button.component';
import { CLIPBOARD_OPTIONS, ClipboardOptions, ClipboardRenderOptions } from './clipboard-options';
import { KATEX_OPTIONS, MarkedKatexOptions } from './katex-options';
import { MARKED_EXTENSIONS } from './marked-extensions';
import { MARKED_OPTIONS, MarkedOptions } from './marked-options';
import { MarkedRenderer } from './marked-renderer';
import { MERMAID_OPTIONS, MermaidAPI } from './mermaid-options';
import { isSanitizeFunction, SANITIZE } from './sanitize-options';

// clipboard
declare let ClipboardJS: {
  new(
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
type MarkedKatexExtension = typeof import('marked-katex-extension').default;

// mermaid
declare let mermaid: {
  initialize: (options: MermaidAPI.MermaidConfig) => void;
  run: (runOptions: MermaidAPI.RunOptions) => void;
};

// prism
declare let Prism: {
  highlightAllUnder: (element: Element | Document) => void;
};

export const errorJoyPixelsNotLoaded = '[ngx-markdown] When using the `emoji` attribute you *have to* include Emoji-Toolkit files to `angular.json` or use imports. See README for more information';
export const errorKatexNotLoaded = '[ngx-markdown] When using the `katex` attribute you *have to* include KaTeX files to `angular.json` or use imports. See README for more information';
export const errorKatexExtensionNotLoaded = '[ngx-markdown] When using the `katex` attribute you *have to* include the `marked-katex-extension` package and its dependencies. See README for more information';
export const errorMermaidNotLoaded = '[ngx-markdown] When using the `mermaid` attribute you *have to* include Mermaid files to `angular.json` or use imports. See README for more information';
export const errorClipboardNotLoaded = '[ngx-markdown] When using the `clipboard` attribute you *have to* include Clipboard files to `angular.json` or use imports. See README for more information';
export const errorClipboardViewContainerRequired = '[ngx-markdown] When using the `clipboard` attribute you *have to* provide the `viewContainerRef` parameter to `MarkdownService.render()` function';
export const errorSrcWithoutHttpClient = '[ngx-markdown] When using the `src` attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information';

export interface ParseOptions {
  decodeHtml?: boolean;
  inline?: boolean;
  emoji?: boolean;
  katex?: boolean;
  katexOptions?: MarkedKatexOptions;
  mermaid?: boolean;
  markedOptions?: MarkedOptions;
  disableSanitizer?: boolean;
}

export interface RenderOptions {
  clipboard?: boolean;
  clipboardOptions?: ClipboardRenderOptions;
  mermaid?: boolean;
  mermaidOptions?: MermaidAPI.MermaidConfig;
}

export class ExtendedRenderer extends Renderer {
  ɵNgxMarkdownRendererExtendedForExtensions = false;
  ɵNgxMarkdownRendererExtendedForKatex = false;
  ɵNgxMarkdownRendererExtendedForMermaid = false;
}

@Injectable()
export class MarkdownService {
  private clipboardOptions = inject(CLIPBOARD_OPTIONS, { optional: true });
  private extensions = inject<MarkedExtension[]>(MARKED_EXTENSIONS, { optional: true });
  private http = inject(HttpClient, { optional: true });
  private mermaidOptions = inject(MERMAID_OPTIONS, { optional: true });
  private katexOptions = inject(KATEX_OPTIONS, { optional: true });
  private platform = inject(PLATFORM_ID);
  private sanitize = inject(SANITIZE, { optional: true });
  private sanitizer = inject(DomSanitizer);

  private katexGate: { enabled: boolean } = { enabled: false };
  private markedKatex: MarkedKatexExtension | null = null;

  private readonly DEFAULT_MARKED_OPTIONS: MarkedOptions = {
    renderer: new MarkedRenderer(),
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
    katex: false,
    katexOptions: undefined,
    mermaid: false,
    markedOptions: undefined,
    disableSanitizer: false,
  };

  private readonly DEFAULT_RENDER_OPTIONS: RenderOptions = {
    clipboard: false,
    clipboardOptions: undefined,
    mermaid: false,
    mermaidOptions: undefined,
  };

  private readonly DEFAULT_SECURITY_CONTEXT = SecurityContext.HTML;

  private _options: MarkedOptions | null = null;

  get options(): MarkedOptions { return this._options!; }
  set options(value: MarkedOptions | null) {
    this._options = { ...this.DEFAULT_MARKED_OPTIONS, ...value };
  }

  get renderer(): MarkedRenderer { return this.options.renderer!; }
  set renderer(value: MarkedRenderer) {
    this.options.renderer = value;
  }

  private readonly _reload$ = new Subject<void>();
  readonly reload$ = this._reload$.asObservable();

  constructor() {
    this.options = inject<MarkedOptions>(MARKED_OPTIONS, { optional: true });
  }

  async parse(markdown: string, parseOptions: ParseOptions = this.DEFAULT_PARSE_OPTIONS): Promise<string | Promise<string>> {
    const {
      decodeHtml,
      inline,
      emoji,
      katex,
      katexOptions,
      mermaid,
      disableSanitizer,
    } = parseOptions;

    this.katexGate = { enabled: !!parseOptions.katex };

    const markedOptions = {
      ...this.options,
      ...parseOptions.markedOptions,
    };

    const renderer = markedOptions.renderer || this.renderer || new Renderer();

    if (this.extensions) {
      this.renderer = this.extendsRendererForExtensions(renderer);
    }
    if (katex) {
      this.renderer = await this.extendsRendererForKatex(renderer, katexOptions);
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

  render(element: HTMLElement, options: RenderOptions = this.DEFAULT_RENDER_OPTIONS, viewContainerRef?: ViewContainerRef): void {
    const {
      clipboard,
      clipboardOptions,
      mermaid,
      mermaidOptions,
    } = options;

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

  private async extendsRendererForKatex(renderer: Renderer, options?: MarkedKatexOptions): Promise<Renderer> {
    const gate = this.katexGate;

    const extendedRenderer = renderer as ExtendedRenderer;
    if (extendedRenderer.ɵNgxMarkdownRendererExtendedForKatex === true) {
      return renderer;
    }

    this.markedKatex ??= await import('marked-katex-extension')
      .then(module => module.default)
      .catch(() => null);

    if (!this.markedKatex) {
      throw new Error(errorKatexExtensionNotLoaded);
    }

    const katexOptions = {
      ...this.katexOptions,
      ...options,
    };

    const original = this.markedKatex(katexOptions);

    // wrap marked-katex-extension with gate because marked does not support dynamic enabling/disabling
    // of extensions and without gate, as renderer is shared between multiple markdown components,
    // enabling katex in one of them would enable it for all the others
    const gatedExtensions = original.extensions?.map(extension => {
      const tokenizerExtension = extension as TokenizerExtension;
      const originalTokenizer = tokenizerExtension.tokenizer;
      return {
        ...extension,
        tokenizer(this: TokenizerThis, src: string) {
          if (!gate.enabled || !originalTokenizer) {
            return undefined;
          }
          return originalTokenizer.call(this, src, []);
        },
      };
    });

    const gatedExtension = {
      ...original,
      extensions: gatedExtensions,
    };

    marked.use(gatedExtension);

    extendedRenderer.ɵNgxMarkdownRendererExtendedForKatex = true;

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

  private parseMarked(html: string, markedOptions: MarkedOptions, inline = false): string | Promise<string> {
    if (markedOptions.renderer) {
      // clone renderer and remove extended flags otherwise
      // marked throws an error thinking it is a renderer prop
      const renderer = { ...markedOptions.renderer } as Partial<ExtendedRenderer>;
      delete renderer.ɵNgxMarkdownRendererExtendedForExtensions;
      delete renderer.ɵNgxMarkdownRendererExtendedForKatex;
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
    if (typeof joypixels === 'undefined' || typeof joypixels.shortnameToUnicode === 'undefined') {
      throw new Error(errorJoyPixelsNotLoaded);
    }
    return joypixels.shortnameToUnicode(html);
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
      toolbarWrapperElement.classList.add('markdown-clipboard-toolbar');
      toolbarWrapperElement.style.position = 'absolute';
      toolbarWrapperElement.style.top = '.5em';
      toolbarWrapperElement.style.right = '.5em';
      toolbarWrapperElement.style.zIndex = '1';
      preWrapperElement.insertAdjacentElement('beforeend', toolbarWrapperElement);

      // register listener to show/hide toolbar
      preWrapperElement.onmouseenter = () => toolbarWrapperElement.classList.add('hover');
      preWrapperElement.onmouseleave = () => toolbarWrapperElement.classList.remove('hover');

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
        const componentRef = viewContainerRef.createComponent(ClipboardButtonComponent);
        embeddedViewRef = componentRef.hostView as EmbeddedViewRef<unknown>;
        componentRef.changeDetectorRef.markForCheck();
      }

      // declare clipboard instance variable
      let clipboardInstance: typeof ClipboardJS;

      // attach clipboard.js to root node
      embeddedViewRef.rootNodes.forEach((node: HTMLElement) => {
        toolbarWrapperElement.appendChild(node);
        clipboardInstance = new ClipboardJS(node, { text: () => preElement.innerText });
      });

      // destroy clipboard instance when view is destroyed
      embeddedViewRef.onDestroy(() => clipboardInstance.destroy());
    }
  }

  private renderMermaid(element: HTMLElement, options: MermaidAPI.MermaidConfig = this.DEFAULT_MERMAID_OPTIONS): void {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }
    if (typeof mermaid === 'undefined' || typeof mermaid.initialize === 'undefined') {
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

  private async sanitizeHtml(html: string | Promise<string>): Promise<string> {
    if (isSanitizeFunction(this.sanitize)) {
      return this.sanitize(await html);
    }
    if (this.sanitize !== SecurityContext.NONE) {
      return this.sanitizer.sanitize(this.sanitize ?? this.DEFAULT_SECURITY_CONTEXT, html) ?? '';
    }
    return html;
  }
}
