/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentRef, EmbeddedViewRef, SecurityContext, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { marked, MarkedExtension, Tokens } from 'marked';
import { first } from 'rxjs/operators';
import { ClipboardButtonComponent } from './clipboard-button.component';
import { KatexOptions } from './katex-options';
import { MarkdownModule } from './markdown.module';
import {
  errorClipboardNotLoaded,
  errorClipboardViewContainerRequired,
  errorJoyPixelsNotLoaded,
  errorKatexNotLoaded,
  errorMermaidNotLoaded,
  ExtendedRenderer,
  MarkdownService,
  ParseOptions,
} from './markdown.service';
import { MARKED_EXTENSIONS } from './marked-extensions';
import { MarkedOptions } from './marked-options';
import { MarkedRenderer } from './marked-renderer';
import { MermaidAPI } from './mermaid-options';
import { SANITIZE, SanitizeFunction } from './sanitize-options';

declare let window: any;
declare let Prism: any;
declare let joypixels: any;
declare let mermaid: any;

fdescribe('MarkdownService', () => {
  let domSanitizer: DomSanitizer;
  let http: HttpTestingController;
  let markdownService: MarkdownService;
  let sanitize: SecurityContext | SanitizeFunction;
  let viewContainerRef: ViewContainerRef;

  const mockExtensions = [
    { name: 'mock-extension-one' } as MarkedExtension,
    { name: 'mock-extension-two' } as MarkedExtension,
  ];
  const viewContainerRefSpy = jasmine.createSpyObj<ViewContainerRef>(['createComponent', 'createEmbeddedView']);

  describe('with sanitize function', () => {

    describe('parse', () => {
      let sanitizeFuncSpy: jasmine.Spy<SanitizeFunction>;

      beforeEach(() => {
        sanitizeFuncSpy = jasmine.createSpy('sanitize');

        TestBed.configureTestingModule({
          imports: [
            MarkdownModule.forRoot({ sanitize: sanitizeFuncSpy }),
          ],
        });

        domSanitizer = TestBed.inject(DomSanitizer);
        markdownService = TestBed.inject(MarkdownService);
        sanitize = TestBed.inject(SANITIZE);
      });

      it('should sanitize parsed markdown using provided sanitize function', async () => {
        const mockRaw = '### Markdown-x';
        const mockSanitized = '### Markdown-x sanitized';
        const unsanitized = await marked.parse(mockRaw);

        sanitizeFuncSpy
          .withArgs(unsanitized)
          .and.returnValue(mockSanitized);

        const result = await markdownService.parse(mockRaw);

        expect(sanitizeFuncSpy).toHaveBeenCalledWith(unsanitized);
        expect(result).toBe(mockSanitized);
        expect(result).not.toBe(unsanitized);
      });
    });
  });

  describe('with SecurityContext.HTML', () => {

    describe('parse', () => {

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
            MarkdownModule.forRoot({ sanitize: SecurityContext.HTML }),
          ],
        });

        domSanitizer = TestBed.inject(DomSanitizer);
        markdownService = TestBed.inject(MarkdownService);
        sanitize = TestBed.inject(SANITIZE);
      });

      it('should sanitize parsed markdown when disableSanitizer is ommited/false/null/undefined', async () => {

        const mockRaw = '### Markdown-x';
        const sanitized = domSanitizer.sanitize(sanitize as SecurityContext, await marked.parse(mockRaw))!;
        const unsanitized = await marked.parse(mockRaw);

        expect(await markdownService.parse(mockRaw)).toBe(sanitized);
        expect(await markdownService.parse(mockRaw)).not.toBe(unsanitized);

        expect(await markdownService.parse(mockRaw, { disableSanitizer: false })).toBe(sanitized);
        expect(await markdownService.parse(mockRaw, { disableSanitizer: false })).not.toBe(unsanitized);

        expect(await markdownService.parse(mockRaw, { disableSanitizer: null! })).toBe(sanitized);
        expect(await markdownService.parse(mockRaw, { disableSanitizer: null! })).not.toBe(unsanitized);

        expect(await markdownService.parse(mockRaw, { disableSanitizer: undefined })).toBe(sanitized);
        expect(await markdownService.parse(mockRaw, { disableSanitizer: undefined })).not.toBe(unsanitized);
      });

      it('should not sanitize parsed markdown when disableSanitizer is true', () => {

        const mockRaw = '### Markdown-x';
        const sanitized = domSanitizer.sanitize(sanitize as SecurityContext, marked.parse(mockRaw))!;
        const unsanitized = marked.parse(mockRaw);

        expect(markdownService.parse(mockRaw, { disableSanitizer: true })).not.toBe(sanitized);
        expect(markdownService.parse(mockRaw, { disableSanitizer: true })).toBe(unsanitized);
      });
    });
  });

  describe('with SecurityContext.NONE', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          BrowserModule,
          HttpClientTestingModule,
          MarkdownModule.forRoot({
            markedExtensions: [
              { provide: MARKED_EXTENSIONS, useValue: mockExtensions[0], multi: true },
              { provide: MARKED_EXTENSIONS, useFactory: () => mockExtensions[1], multi: true },
            ],
            sanitize: SecurityContext.NONE,
          }),
        ],
        providers: [
          { provide: ViewContainerRef, useValue: viewContainerRefSpy },
        ],
      });

      domSanitizer = TestBed.inject(DomSanitizer);
      http = TestBed.inject(HttpTestingController);
      markdownService = TestBed.inject(MarkdownService);
      sanitize = TestBed.inject(SANITIZE);
      viewContainerRef = TestBed.inject(ViewContainerRef);
    });

    describe('options', () => {

      it('should be initialized correctly', () => {

        expect(markdownService.options).toBeDefined();
        expect(markdownService.options.renderer).toBeDefined();
      });

      it('should update correctly', () => {

        markdownService.options = { breaks: true, gfm: false, pedantic: true, silent: false };

        expect(markdownService.options.breaks).toBeTrue();
        expect(markdownService.options.gfm).toBeFalse();
        expect(markdownService.options.pedantic).toBeTrue();
        expect(markdownService.options.silent).toBeFalse();
        expect(markdownService.options.renderer).toBeDefined();
      });
    });

    describe('renderer', () => {

      it('should be initialized correctly', () => {

        expect(markdownService.renderer).toBeDefined();
      });

      it('should update option.renderer when updated', () => {

        const blockquote = ({ text }: Tokens.Blockquote) => `<mock-blockquote>${text}</mock-blockquote>`;

        markdownService.renderer.blockquote = blockquote;

        const blockquoteToken = { text: 'foobar' } as Tokens.Blockquote;
        const expectedBlockquote = blockquote(blockquoteToken);
        const rendererBlockquote = markdownService.renderer.blockquote(blockquoteToken);
        const optionsRendererBlockquote = markdownService.options.renderer!.blockquote(blockquoteToken);

        expect(rendererBlockquote).toBe(expectedBlockquote);
        expect(optionsRendererBlockquote).toBe(expectedBlockquote);
      });
    });

    describe('parse', () => {

      it('should register extensions for marked renderer when extensions are provided', () => {

        const mockRaw = '### Markdown-x';

        const markedUseSpy = spyOn(marked, 'use');

        markdownService.parse(mockRaw);

        expect(markedUseSpy).toHaveBeenCalledWith(...mockExtensions);
      });

      it('should not register extensions for marked renderer more than once', () => {

        const mockRaw = '### Markdown-x';

        const markedUseSpy = spyOn(marked, 'use');

        markdownService.parse(mockRaw);

        expect(markedUseSpy).toHaveBeenCalledWith(...mockExtensions);

        markedUseSpy.calls.reset();

        markdownService.parse(mockRaw);

        expect(markedUseSpy).not.toHaveBeenCalledWith(...mockExtensions);
      });

      it('should extend marked renderer when mermaid is true', async () => {

        const mermaid = 'graph TD; A-->B;';
        const mockRaw = `\`\`\`mermaid\n${mermaid}\n\`\`\``;

        const parsed = await markdownService.parse(mockRaw, { mermaid: true });

        expect(parsed).toBe(`<div class="mermaid">${mermaid}</div>`);
      });

      it('should not extend marked renderer when mermaid is false', async () => {

        const mermaid = 'graph TD; A-->B;';
        const mockRaw = `\`\`\`mermaid\n${mermaid}\n\`\`\``;

        const parsed = await markdownService.parse(mockRaw, { mermaid: false });

        expect(parsed).toBe(await marked.parse(mockRaw));
      });

      it('should not pass extended flags to `marked.use` when parsing', () => {

        const mockRaw = '### Markdown-x';
        const mockRenderer = new MarkedRenderer();
        const mockMarkedOptions: MarkedOptions = { renderer: mockRenderer };

        const markedUseSpy = spyOn(marked, 'use');

        markdownService.options = mockMarkedOptions;
        markdownService.parse(mockRaw, { mermaid: true });

        const expectedMockRenderer = { ...mockRenderer } as Partial<ExtendedRenderer>;
        delete expectedMockRenderer.ɵNgxMarkdownRendererExtendedForExtensions;
        delete expectedMockRenderer.ɵNgxMarkdownRendererExtendedForMermaid;

        expect(markedUseSpy).toHaveBeenCalledWith(...mockExtensions);
        expect(markedUseSpy).toHaveBeenCalledWith({ renderer: expectedMockRenderer });
      });

      it('should remove leading whitespaces offset while keeping indent', async () => {

        const mockRaw =  [
          '',               // wait for line with non-whitespaces
          '  * list',       // find first line with non-whitespaces to set offset
          '     * sub-list', // keep indent while removing from previous row offset
        ].join('\n');

        const expected = [
          '',
          '* list',
          '   * sub-list',
        ].join('\n');

        const result = await markdownService.parse(mockRaw);

        expect(result).toBe(await marked.parse(expected));
      });

      it('should return line with indent correctly', async () => {

        const mockRaw =  [
          '   ',              // first line with only whitespaces should not determine indent offset
          '  * list',         // find first line with non-whitespaces to set offset
          '     * sub-list',   // keep indent while removing from previous row offset
          '  ',               // keep blank line
          ' Negative indent', // keep line with negative offset according to first non-whitespaces line indent
          '  Lorem Ipsum',    // keep indent like equals to first non-whitespaces line ident
        ].join('\n');

        const expected = [
          '* list',
          '   * sub-list',
          '',
          'Negative indent',
          'Lorem Ipsum',
        ].join('\n');

        const result = await markdownService.parse(mockRaw);

        expect(result).toBe(await marked.parse(expected));
      });

      it('should decode HTML correctly when decodeHtml is true', async () => {

        const mockRaw = '&lt;html&gt;';
        const expected = '<html>';

        const result = await markdownService.parse(mockRaw, { decodeHtml: true });

        expect(result).toBe(expected);
      });

      it('should not decode HTML when decodeHtml is omitted/false/null/undefined', async () => {

        const mockRaw = '&lt;html&gt;';
        const expected = '<p>&lt;html&gt;</p>\n';

        expect(await markdownService.parse(mockRaw)).toBe(expected);
        expect(await markdownService.parse(mockRaw, { decodeHtml: false })).toBe(expected);
        expect(await markdownService.parse(mockRaw, { decodeHtml: null! })).toBe(expected);
        expect(await markdownService.parse(mockRaw, { decodeHtml: undefined })).toBe(expected);
      });

      it('should not decode HTML when platform is not browser as it uses `document`', async () => {

        const mockRaw = '&lt;html&gt;';
        const expected = '<p>&lt;html&gt;</p>\n';

        markdownService['platform'] = 'server';

        const result = await markdownService.parse(mockRaw, { decodeHtml: true });

        expect(result).toBe(expected);
      });

      it('should throw when emoji is true but emoji-toolkit is not loaded', () => {

        window['joypixels'] = undefined;

        expect(() => markdownService.parse('I :heart: ngx-markdown', { decodeHtml: false, emoji: true })).toThrowError(errorJoyPixelsNotLoaded);

        window['joypixels'] = { shortnameToUnicode: undefined };

        expect(() => markdownService.parse('I :heart: ngx-markdown', { decodeHtml: false, emoji: true })).toThrowError(errorJoyPixelsNotLoaded);
      });

      it('should call joypixels when emoji is true', async () => {

        const mockRaw = 'I :heart: ngx-markdown';
        const mockEmojified = 'I ❤️ ngx-markdown';

        window['joypixels'] = { shortnameToUnicode: () => {} };

        spyOn(joypixels, 'shortnameToUnicode').and.returnValue(mockEmojified);

        const result = await markdownService.parse(mockRaw, { decodeHtml: false, emoji: true });

        expect(result).toEqual(await marked.parse(mockEmojified));
        expect(joypixels.shortnameToUnicode).toHaveBeenCalledWith(mockRaw);
      });

      it('should not call joypixels when emoji is omitted/false/null/undefined', () => {

        const mockRaw = '### Markdown-x';

        window['joypixels'] = { shortnameToUnicode: () => {} };

        spyOn(joypixels, 'shortnameToUnicode');

        const useCases = [
          () => markdownService.parse(mockRaw, { decodeHtml: false }),
          () => markdownService.parse(mockRaw, { decodeHtml: false, emoji: false }),
          () => markdownService.parse(mockRaw, { decodeHtml: false, emoji: null! }),
          () => markdownService.parse(mockRaw, { decodeHtml: false, emoji: undefined }),
        ];

        useCases.forEach(func => {
          func();
          expect(joypixels.shortnameToUnicode).not.toHaveBeenCalled();
        });
      });

      it('should not call joypixels or throw when platform is not browser', () => {

        const mockRaw = 'I :heart: ngx-markdown';

        window['joypixels'] = { shortnameToUnicode: () => {} };

        spyOn(joypixels, 'shortnameToUnicode');

        markdownService['platform'] = 'server';

        expect(() => markdownService.parse(mockRaw, { decodeHtml: false, emoji: true })).not.toThrowError();
        expect(joypixels.shortnameToUnicode).not.toHaveBeenCalled();
      });

      it('should parse markdown when platform is either browser/server to allow server-side rendering', async () => {

        const mockRaw = '### Markdown-x';

        const useCases = [
          'browser',
          'server',
        ];

        for (const platform of useCases) {
          markdownService['platform'] = platform;

          expect(async () => await markdownService.parse(mockRaw)).not.toThrowError();
          expect(await markdownService.parse(mockRaw)).toBe(await marked.parse(mockRaw));
        }
      });

      it('should return inline parsed markdown when inline is true', async () => {

        const mockRaw = '### Markdown-x';

        expect(await markdownService.parse(mockRaw, { inline: true })).toBe(await marked.parseInline(mockRaw));
      });

      it('should return parsed markdown when inline is omitted/false/null/undefined', async () => {

        const mockRaw = '### Markdown-x';

        const useCases = [
          () => markdownService.parse(mockRaw),
          () => markdownService.parse(mockRaw, { inline: false }),
          () => markdownService.parse(mockRaw, { inline: null! }),
          () => markdownService.parse(mockRaw, { inline: undefined }),
        ];

        for (const func of useCases) {
          expect(await func()).toBe(await marked.parse(mockRaw));
        }
      });

      it('should provide markedOptions correctly when parsing', () => {

        const mockRaw = '### Markdown-x';
        const mockMarkedOptions: MarkedOptions = { breaks: true, gfm: false, pedantic: true, silent: false };
        const parseOptions: ParseOptions = { markedOptions: mockMarkedOptions };

        const expectedOptions = {
          ...markdownService.options,
          ...mockMarkedOptions,
        };
        delete expectedOptions.renderer;

        const markedParseSpy = spyOn(marked, 'parse');

        markdownService.parse(mockRaw, parseOptions);

        expect(markedParseSpy).toHaveBeenCalled();
        expect(markedParseSpy.calls.argsFor(0)[0]).toBe(mockRaw);
        expect(markedParseSpy.calls.argsFor(0)[1]).toEqual(expectedOptions);
      });

      it('should not override markedOptions.renderer when parsing and parseOptions.renderer is not provided', () => {

        const mockRaw = '### Markdown-x';
        const mockRenderer = new MarkedRenderer();
        mockRenderer.blockquote = () => 'mock-blocquote';
        const mockMarkedOptions: MarkedOptions = { breaks: true, gfm: false, pedantic: true, silent: false, renderer: mockRenderer };

        const markedUseSpy = spyOn(marked, 'use');

        markdownService.options = mockMarkedOptions;
        markdownService.parse(mockRaw);

        const expectedMockRenderer = { ...mockRenderer } as Partial<ExtendedRenderer>;
        delete expectedMockRenderer.ɵNgxMarkdownRendererExtendedForExtensions;

        expect(markedUseSpy).toHaveBeenCalledWith(...mockExtensions);
        expect(markedUseSpy).toHaveBeenCalledWith({ renderer: expectedMockRenderer });
      });

      it('should return empty string when raw is null/undefined/empty', async () => {

        expect(await markdownService.parse(null!)).toBe('');
        expect(await markdownService.parse(undefined!)).toBe('');
        expect(await markdownService.parse('')).toBe('');
      });

      it('should not sanitize parsed markdown', async () => {

        const mockRaw = '### Markdown-x';
        const unsanitized = await marked.parse(mockRaw);

        expect(await markdownService.parse(mockRaw, { decodeHtml: false })).toBe(unsanitized);
      });
    });

    describe('render', () => {

      const KATEX_DEFAULT_OPTIONS: KatexOptions = {
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

      function mockComponentRef(): { componentRef: ComponentRef<unknown>; rootNode: HTMLElement; } {
        const rootNode = document.createElement('button');

        const componentRef = {
          changeDetectorRef: {
            markForCheck: () => {},
          },
          hostView: {
            rootNodes: [rootNode],
            onDestroy: (callback) => {},
          } as EmbeddedViewRef<unknown> as ViewRef,
        } as ComponentRef<unknown>;

        return { componentRef, rootNode };
      }

      function mockEmbeddedViewRef(): { embeddedViewRef: EmbeddedViewRef<unknown>; rootNode: HTMLElement; } {
        const rootNode = document.createElement('button');

        const embeddedViewRef = {
          rootNodes: [rootNode],
          onDestroy: (callback) => {},
        } as EmbeddedViewRef<unknown>;

        return { embeddedViewRef, rootNode };
      }

      it('should render katex when katex is true', () => {

        const element = document.createElement('div');
        element.innerHTML = '$E=mc^2$';

        const container = document.createElement('div');
        container.append(element);

        const katexOptions = { strict: 'error', ignoredClasses: ['ignore'] };

        window['katex'] = {};
        window['renderMathInElement'] = (elem: HTMLElement, options?: KatexOptions) => {};

        spyOn(window, 'renderMathInElement');

        markdownService.render(container, { katex: true, katexOptions });

        expect(window['renderMathInElement']).toHaveBeenCalledWith(container, {
          ...katexOptions,
          ...KATEX_DEFAULT_OPTIONS,
        });
      });

      it('should not render katex when katex is omitted/false/null/undefined', () => {

        const element = document.createElement('div');
        element.innerHTML = '$E=mc^2$';

        window['katex'] = {};
        window['renderMathInElement'] = (elem: HTMLElement, options?: KatexOptions) => {};

        spyOn(window, 'renderMathInElement');

        const useCases = [
          () => markdownService.render(element),
          () => markdownService.render(element, { katex: false }),
          () => markdownService.render(element, { katex: null! }),
          () => markdownService.render(element, { katex: undefined }),
        ];

        useCases.forEach(func => {
          func();
          expect(window['renderMathInElement']).not.toHaveBeenCalled();
        });
      });

      it('should not render katex or throw when platform is not browser', () => {

        const element = document.createElement('div');
        element.innerHTML = '$E=mc^2$';

        window['katex'] = {};
        window['renderMathInElement'] = (elem: HTMLElement, options?: KatexOptions) => {};

        spyOn(window, 'renderMathInElement');

        markdownService['platform'] = 'server';

        expect(() => markdownService.render(element, { katex: true })).not.toThrowError();
        expect(window['renderMathInElement']).not.toHaveBeenCalled();
      });

      it('should throw when katex is called but not loaded', () => {

        const element = document.createElement('div');
        element.innerHTML = '$E=mc^2$';

        window['katex'] = undefined;

        expect(() => markdownService.render(element, { katex: true })).toThrowError(errorKatexNotLoaded);

        window['katex'] = {};
        window['renderMathInElement'] = undefined;

        expect(() => markdownService.render(element, { katex: true })).toThrowError(errorKatexNotLoaded);
      });

      it('should render katex with math expressions', () => {

        const element = document.createElement('div');
        element.innerHTML = '$E=mc^2$';

        window['katex'] = {};
        window['renderMathInElement'] = (elem: HTMLElement, options?: KatexOptions) => {};

        spyOn(window, 'renderMathInElement');

        const createElement = (innerHTML: string): HTMLElement => {
          const element = document.createElement('div');
          element.innerHTML = innerHTML;
          return element;
        };

        const useCases = [
          { element: createElement('$E=mc^2$') },
          { element: createElement('$$x^2 + y^2 = z^2$$'), options: { ignoredClasses: ['error'] } },
        ];

        useCases.forEach(useCase => {
          markdownService.render(useCase.element, { katex: true, katexOptions: useCase.options });
          expect(window['renderMathInElement']).toHaveBeenCalledWith(useCase.element, {
            ...useCase.options,
            ...KATEX_DEFAULT_OPTIONS,
          });
          window['renderMathInElement'].calls.reset();
        });
      });

      it('should render mermaid with default options when mermaid is true and options are omitted', () => {

        const elementOne = document.createElement('div');
        elementOne.classList.add('mermaid');

        const elementTwo = document.createElement('div');
        elementTwo.classList.add('mermaid');

        const container = document.createElement('div');
        container.append(elementOne);
        container.append(elementTwo);

        const defaultOptions: MermaidAPI.MermaidConfig = { startOnLoad: false };
        const mermaidElements = container.querySelectorAll<HTMLElement>('.mermaid');

        window['mermaid'] = {
          initialize: (options: MermaidAPI.MermaidConfig) => {},
          run: (runOptions: MermaidAPI.RunOptions) => {},
        };

        spyOn(mermaid, 'initialize');
        spyOn(mermaid, 'run');

        markdownService.render(container, { mermaid: true });

        expect(mermaid.initialize).toHaveBeenCalledWith(defaultOptions);
        expect(mermaid.run).toHaveBeenCalledWith({ nodes: mermaidElements });
      });

      it('should render mermaid with provided options when mermaid is true and at least one element is found', () => {

        const element = document.createElement('div');
        element.classList.add('mermaid');
        element.innerHTML = 'graph TD; A-->B;';

        const container = document.createElement('div');
        container.append(element);

        const providedOptions: MermaidAPI.MermaidConfig = {
          startOnLoad: false,
          darkMode: true,
        };

        const mermaidElements = container.querySelectorAll<HTMLElement>('.mermaid');

        window['mermaid'] = {
          initialize: (options: MermaidAPI.MermaidConfig) => {},
          run: (runOptions: MermaidAPI.RunOptions) => {},
        };

        spyOn(mermaid, 'initialize');
        spyOn(mermaid, 'run');

        markdownService.render(container, { mermaid: true, mermaidOptions: providedOptions });

        expect(mermaid.initialize).toHaveBeenCalledWith(providedOptions);
        expect(mermaid.run).toHaveBeenCalledWith({ nodes: mermaidElements });
      });

      it('should not render mermaid when mermaid is omitted/false/null/undefined', () => {

        const container = document.createElement('div');

        window['mermaid'] = {
          initialize: (options: MermaidAPI.MermaidConfig) => {},
          run: (runOptions: MermaidAPI.RunOptions) => {},
        };

        spyOn(mermaid, 'initialize');
        spyOn(mermaid, 'run');

        const useCases = [
          () => markdownService.render(container),
          () => markdownService.render(container, { mermaid: false }),
          () => markdownService.render(container, { mermaid: null! }),
          () => markdownService.render(container, { mermaid: undefined }),
        ];

        useCases.forEach(func => {
          func();
          expect(mermaid.initialize).not.toHaveBeenCalled();
          expect(mermaid.run).not.toHaveBeenCalled();
        });
      });

      it('should not render mermaid or throw when platform is not browser', () => {

        const container = document.createElement('div');

        window['mermaid'] = {
          initialize: (options: MermaidAPI.MermaidConfig) => {},
          run: (runOptions: MermaidAPI.RunOptions) => {},
        };

        spyOn(mermaid, 'initialize');
        spyOn(mermaid, 'run');

        markdownService['platform'] = 'server';

        expect(() => markdownService.render(container, { mermaid: true })).not.toThrowError();
        expect(mermaid.initialize).not.toHaveBeenCalled();
        expect(mermaid.run).not.toHaveBeenCalled();
      });

      it('should throw when mermaid is called but not loaded', () => {

        const container = document.createElement('div');

        window['mermaid'] = undefined;

        expect(() => markdownService.render(container, { mermaid: true })).toThrowError(errorMermaidNotLoaded);

        window['mermaid'] = { initialize: undefined };
        window['mermaid'] = { run: undefined };

        expect(() => markdownService.render(container, { mermaid: true })).toThrowError(errorMermaidNotLoaded);
      });

      it('should not render mermaid when no elements are found', () => {

        const element = document.createElement('div');
        element.classList.add('not-mermaid');

        const container = document.createElement('div');
        container.append(element);

        window['mermaid'] = {
          initialize: (options: MermaidAPI.MermaidConfig) => {},
          run: (runOptions: MermaidAPI.RunOptions) => {},
        };

        spyOn(mermaid, 'initialize');
        spyOn(mermaid, 'run');

        expect(() => markdownService.render(container, { mermaid: true })).not.toThrowError();
        expect(mermaid.initialize).not.toHaveBeenCalled();
        expect(mermaid.run).not.toHaveBeenCalled();
      });

      it('should render clipboard after katex and mermaid', () => {

        const container = document.createElement('div');
        const pluginRenderingOrder: string[] = [];

        // clipboard
        const clipboardPreElement = document.createElement('pre');
        clipboardPreElement.innerText = 'mock-pre-element-text';
        container.append(clipboardPreElement);

        const { componentRef } = mockComponentRef();
        viewContainerRefSpy.createComponent.and.returnValue(componentRef);

        window['ClipboardJS'] = class ClipboardJS {
          constructor() {
            pluginRenderingOrder.push('clipboard');
          }
        };

        // katex
        const katexElement = document.createElement('div');
        katexElement.innerHTML = '$E=mc^2$';
        container.append(katexElement);

        window['katex'] = {};
        window['renderMathInElement'] = (elem: HTMLElement, options?: KatexOptions) => {};

        spyOn(window, 'renderMathInElement').and.callFake(() => {
          pluginRenderingOrder.push('katex');
        });

        // mermaid
        const mermaidElement = document.createElement('div');
        mermaidElement.classList.add('mermaid');
        mermaidElement.innerHTML = 'graph TD; A-->B;';

        container.append(mermaidElement);

        window['mermaid'] = {
          initialize: (options: MermaidAPI.MermaidConfig) => {},
          run: (runOptions: MermaidAPI.RunOptions) => {},
        };

        spyOn(mermaid, 'run').and.callFake(() => {
          pluginRenderingOrder.push('mermaid');
        });

        markdownService.render(container, { clipboard: true, katex: true, mermaid: true }, viewContainerRef);
        expect(pluginRenderingOrder).toEqual(['katex', 'mermaid', 'clipboard']);
      });

      it('should render clipboard with default button when clipboard is true and buttonComponent/buttonTemplate is not provided', () => {

        const preElement = document.createElement('pre');
        preElement.innerText = 'mock-pre-element-text';
        const container = document.createElement('div');
        container.append(preElement);

        const { componentRef, rootNode } = mockComponentRef();

        window['ClipboardJS'] = class ClipboardJS {};

        const clipboardSpy = spyOn(window, 'ClipboardJS');
        const markForCheckSpy = spyOn(componentRef.changeDetectorRef, 'markForCheck');

        viewContainerRefSpy.createComponent.and.returnValue(componentRef);

        markdownService.render(container, { clipboard: true }, viewContainerRef);

        expect(viewContainerRefSpy.createComponent).toHaveBeenCalledWith(ClipboardButtonComponent as any);
        expect(markForCheckSpy).toHaveBeenCalled();
        expect(clipboardSpy).toHaveBeenCalledWith(rootNode, { text: jasmine.any(Function) });
        expect((clipboardSpy.calls.argsFor(0)[1] as any).text()).toBe(preElement.innerText);
      });

      it('should render clipboard with buttonComponent when clipboard is true and buttonComponent is provided', () => {

        class MockButtonComponent { mockButton = true; }

        const preElement = document.createElement('pre');
        preElement.innerText = 'mock-pre-element-text';
        const container = document.createElement('div');
        container.append(preElement);

        const { componentRef, rootNode } = mockComponentRef();

        window['ClipboardJS'] = class ClipboardJS {};

        const clipboardSpy = spyOn(window, 'ClipboardJS');
        const markForCheckSpy = spyOn(componentRef.changeDetectorRef, 'markForCheck');

        viewContainerRefSpy.createComponent.and.returnValue(componentRef);

        markdownService.render(
          container,
          { clipboard: true, clipboardOptions: { buttonComponent: MockButtonComponent } },
          viewContainerRef,
        );

        expect(viewContainerRefSpy.createComponent).toHaveBeenCalledWith(MockButtonComponent as any);
        expect(markForCheckSpy).toHaveBeenCalled();
        expect(clipboardSpy).toHaveBeenCalledWith(rootNode, { text: jasmine.any(Function) });
        expect((clipboardSpy.calls.argsFor(0)[1] as any).text()).toBe(preElement.innerText);
      });

      it('should render clipboard with buttonTemplate when clipboard is true and buttonTemplate is provided', () => {

        const mockTemplateRef = {
          elementRef: { nativeElement: 'mock-template-ref' },
        } as TemplateRef<unknown>;

        const preElement = document.createElement('pre');
        preElement.innerText = 'mock-pre-element-text';
        const container = document.createElement('div');
        container.append(preElement);

        const { embeddedViewRef, rootNode } = mockEmbeddedViewRef();

        window['ClipboardJS'] = class ClipboardJS {};

        const clipboardSpy = spyOn(window, 'ClipboardJS');

        viewContainerRefSpy.createEmbeddedView.and.returnValue(embeddedViewRef);

        markdownService.render(
          container,
          { clipboard: true, clipboardOptions: { buttonTemplate: mockTemplateRef } },
          viewContainerRef,
        );

        expect(viewContainerRefSpy.createEmbeddedView).toHaveBeenCalledWith(mockTemplateRef);
        expect(clipboardSpy).toHaveBeenCalledWith(rootNode, { text: jasmine.any(Function) });
        expect((clipboardSpy.calls.argsFor(0)[1] as any).text()).toBe(preElement.innerText);
      });

      it('should destroy clipboard instances when host view is destroyed', () => {

        const preElement = document.createElement('pre');
        preElement.innerText = 'mock-pre-element-text';
        const container = document.createElement('div');
        container.append(preElement);

        const { componentRef } = mockComponentRef();
        const mockClipboardInstance = { destroy: () => {} };

        window['ClipboardJS'] = () => {};

        spyOn(window, 'ClipboardJS').and.returnValue(mockClipboardInstance);

        const hostViewDestroySpy = spyOn(componentRef.hostView, 'onDestroy');
        const clipboardDestroySpy = spyOn(mockClipboardInstance, 'destroy');

        viewContainerRefSpy.createComponent.and.returnValue(componentRef);

        markdownService.render(container, { clipboard: true }, viewContainerRef);

        expect(hostViewDestroySpy).toHaveBeenCalled();

        const hostViewDestroyCallback = hostViewDestroySpy.calls.argsFor(0)[0];
        hostViewDestroyCallback();

        expect(clipboardDestroySpy).toHaveBeenCalled();
      });

      it('should not render clipboard when clipboard is omitted/false/null/undefined', () => {

        const preElement = document.createElement('pre');
        const container = document.createElement('div');
        container.append(preElement);

        window['ClipboardJS'] = {
          new: () => {},
        };

        spyOn(window, 'ClipboardJS');

        const useCases = [
          () => markdownService.render(container),
          () => markdownService.render(container, { clipboard: false }, viewContainerRef),
          () => markdownService.render(container, { clipboard: null! }, viewContainerRef),
          () => markdownService.render(container, { clipboard: undefined }, viewContainerRef),
        ];

        useCases.forEach(func => {
          func();
          expect(window['ClipboardJS']).not.toHaveBeenCalled();
        });
      });

      it('should not render clipboard or throw when platform is not browser', () => {

        const preElement = document.createElement('pre');
        const container = document.createElement('div');
        container.append(preElement);

        window['ClipboardJS'] = {};

        spyOn(window, 'ClipboardJS');

        markdownService['platform'] = 'server';

        expect(() => markdownService.render(container, { clipboard: true })).not.toThrowError();
        expect(window['ClipboardJS']).not.toHaveBeenCalled();
      });

      it('should throw when clipboard is called but not loaded', () => {

        const container = document.createElement('div');

        window['ClipboardJS'] = undefined;

        expect(() => markdownService.render(container, { clipboard: true })).toThrowError(errorClipboardNotLoaded);
      });

      it('should throw when clipboard is called and viewContainerRef is omitted/null/undefined', () => {

        const container = document.createElement('div');

        window['ClipboardJS'] = {};

        const useCases = [
          () => markdownService.render(container, { clipboard: true }),
          () => markdownService.render(container, { clipboard: true }, null!),
          () => markdownService.render(container, { clipboard: true }, undefined),
        ];

        useCases.forEach(func => {
          expect(func).toThrowError(errorClipboardViewContainerRequired);
        });
      });

      it('should highlight element', () => {

        const element = document.createElement('div');

        spyOn(markdownService, 'highlight');

        markdownService.render(element);

        expect(markdownService.highlight).toHaveBeenCalled();
      });
    });

    describe('reload', () => {

      it('should request reload through reload$ subject', (done) => {

        markdownService.reload$
          .pipe(first())
          .subscribe(() => {
            expect(true).toBeTruthy();
            done();
          });

        markdownService.reload();
      });
    });

    describe('getSource', () => {

      it('should call http service to get src content', () => {

        const mockSrc = 'file-x.md';
        const mockResponse = 'response-x';

        markdownService
          .getSource(mockSrc)
          .subscribe(data => {
            expect(data).toEqual(mockResponse);
          });

        http.expectOne(mockSrc).flush(mockResponse);
      });

      it('should return src content with language tick when file extension is not .md', () => {

        const mockSrc = './src-example/file.cpp';
        const mockResponse = 'response-x';

        markdownService
          .getSource(mockSrc)
          .subscribe(data => {
            expect(data).toEqual('```cpp\n' + mockResponse + '\n```');
          });

        http.expectOne(mockSrc).flush(mockResponse);

      });

      it('should return src content without language tick when file extension is .md', () => {

        const mockSrc = './src-example/file.md';
        const mockResponse = 'response-x';

        markdownService
          .getSource(mockSrc)
          .subscribe(data => {
            expect(data).toEqual(mockResponse);
          });

        http.expectOne(mockSrc).flush(mockResponse);
      });

      it('should return src content without language tick when URL has no file extension', () => {
        const mockSrc = 'https://domain.com/file/path';
        const mockResponse = 'response-x';

        markdownService
          .getSource(mockSrc)
          .subscribe(data => {
            expect(data).toEqual(mockResponse);
          });

        http.expectOne(mockSrc).flush(mockResponse);
      });

      it('should ignore query parameters when resolving file extension', () => {

        const mockSrc = './src-example/file.js?param=123&another=abc';
        const mockResponse = 'response-x';

        markdownService
          .getSource(mockSrc)
          .subscribe(data => {
            expect(data).toEqual('```js\n' + mockResponse + '\n```');
          });

        http.expectOne(mockSrc).flush(mockResponse);
      });

      it('should return src content correctly when using different URL pattern', () => {

        const mockResponse = 'response-x';

        const useCases = [
          { url: 'https://domain.com/abc', extension: 'md' },
          { url: 'https://domain.com/abc.js', extension: 'js' },
          { url: 'https://domain.com/abc/def', extension: 'md' },
          { url: 'https://domain.com/abc/def/hij.ts', extension: 'ts' },
          { url: 'https://domain.com/abc/def/hij/jkl.tsx?mno=123', extension: 'tsx' },
          { url: 'https://domain.com/abc?def=123&hij=456', extension: 'md' },

          { url: 'http://domain.com/abc', extension: 'md' },
          { url: 'http://domain.com/abc.js', extension: 'js' },
          { url: 'http://domain.com/abc/def', extension: 'md' },
          { url: 'http://domain.com/abc/def/hij.ts', extension: 'ts' },
          { url: 'http://domain.com/abc/def/hij/jkl.tsx?mno=123', extension: 'tsx' },
          { url: 'http://domain.com/abc?def=123&hij=456', extension: 'md' },

          { url: './abc', extension: 'md' },
          { url: './abc.js', extension: 'js' },
          { url: './abc/def', extension: 'md' },
          { url: './abc/def/hij.ts', extension: 'ts' },
          { url: './abc/def/hij/jkl.tsx?mno=123', extension: 'tsx' },
          { url: './abc?def=123&hij=456', extension: 'md' },

          { url: '/abc', extension: 'md' },
          { url: '/abc.js', extension: 'js' },
          { url: '/abc/def', extension: 'md' },
          { url: '/abc/def/hij.ts', extension: 'ts' },
          { url: '/abc/def/hij/jkl.tsx?mno=123', extension: 'tsx' },
          { url: '/abc?def=123&hij=456', extension: 'md' },

          { url: 'abc/def', extension: 'md' },
          { url: 'abc/def/hij.ts', extension: 'ts' },
          { url: 'abc/def/hij/jkl.tsx?mno=123', extension: 'tsx' },
          { url: 'abc?def=123&hij=456', extension: 'md' },
        ];

        useCases.forEach(({ url, extension }) => {
          const expectedResponse = extension !== 'md'
            ? '```' + extension + '\n' + mockResponse + '\n```'
            : mockResponse;

          markdownService
            .getSource(url)
            .subscribe(data => {
              expect(data).toEqual(expectedResponse);
            });

          http.expectOne(url).flush(mockResponse);
        });
      });
    });

    describe('highlight', () => {

      it('should not call Prism or throw when platform is not browser', () => {

        const mockHtmlElement = document.createElement('div');

        window['Prism'] = { highlightAllUnder: () => {} };

        spyOn(Prism, 'highlightAllUnder');

        markdownService['platform'] = 'server';

        expect(() => markdownService.highlight(mockHtmlElement)).not.toThrow();
        expect(Prism.highlightAllUnder).not.toHaveBeenCalled();
      });

      it('should not call Prism when not available', () => {

        const mockHtmlElement = document.createElement('div');

        window['Prism'] = undefined;

        expect(() => markdownService.highlight(mockHtmlElement)).not.toThrow();
      });

      it('should add `language-none` class on code blocks with no language class', () => {

        const preElement = document.createElement('pre');
        const codeElement = document.createElement('code');
        preElement.appendChild(codeElement);

        window['Prism'] = { highlightAllUnder: () => {} };

        markdownService.highlight(preElement);

        expect(codeElement.classList).toContain('language-none');
      });

      it('should not add `language-none` class on code blocks with language class', () => {

        const preElement = document.createElement('pre');
        const codeElement = document.createElement('code');
        codeElement.classList.add('language-mock');
        preElement.appendChild(codeElement);

        window['Prism'] = { highlightAllUnder: () => {} };

        markdownService.highlight(preElement);

        expect(codeElement.classList).not.toContain('language-none');
        expect(codeElement.classList).toContain('language-mock');
      });

      it('should not add `language-none` class on element other than code blocks without language class', () => {

        const divElement = document.createElement('div');
        const codeElement = document.createElement('code');
        codeElement.classList.add('language-mock');
        divElement.appendChild(codeElement);

        window['Prism'] = { highlightAllUnder: () => {} };

        markdownService.highlight(divElement);

        expect(codeElement.classList).not.toContain('language-none');
        expect(codeElement.classList).toContain('language-mock');
      });

      it('should call Prism when available and element parameter is present', () => {

        const mockHtmlElement = document.createElement('div');

        window['Prism'] = { highlightAllUnder: () => {} };

        spyOn(Prism, 'highlightAllUnder');

        markdownService.highlight(mockHtmlElement);

        expect(Prism.highlightAllUnder).toHaveBeenCalledWith(mockHtmlElement);
      });

      it('should call Prism when available and element parameter is ommited/null/undefined', () => {

        window['Prism'] = { highlightAllUnder: () => {} };

        spyOn(Prism, 'highlightAllUnder');

        const useCases = [
          () => markdownService.highlight(),
          () => markdownService.highlight(null!),
          () => markdownService.highlight(undefined),
        ];

        useCases.forEach(func => {
          func();
          expect(Prism.highlightAllUnder).toHaveBeenCalledWith(document);
          Prism.highlightAllUnder.calls.reset();
        });
      });
    });
  });
});
