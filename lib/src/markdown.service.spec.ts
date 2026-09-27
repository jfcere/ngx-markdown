import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentRef, EmbeddedViewRef, SecurityContext, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { marked, MarkedExtension, Tokens } from 'marked';
import { first } from 'rxjs/operators';
import { beforeEach, describe, expect, it, type MockedFunction, vi } from 'vitest';
import { ClipboardButtonComponent } from './clipboard-button.component';
import { MarkedKatexOptions } from './katex-options';
import {
  errorClipboardNotLoaded,
  errorClipboardViewContainerRequired,
  errorJoyPixelsNotLoaded,
  errorKatexExtensionNotLoaded,
  errorMermaidNotLoaded,
  errorSrcWithoutHttpClient,
  ExtendedRenderer,
  MarkdownService,
  ParseOptions,
} from './markdown.service';
import { MARKED_EXTENSIONS } from './marked-extensions';
import { MarkedOptions } from './marked-options';
import { MarkedRenderer } from './marked-renderer';
import { MermaidAPI } from './mermaid-options';
import { provideMarkdown } from './provide-markdown';
import { SANITIZE, SanitizeFunction } from './sanitize-options';

declare let window: any;
declare let Prism: any;
declare let joypixels: any;
declare let mermaid: any;

describe('MarkdownService', () => {
  let domSanitizer: DomSanitizer;
  let http: HttpTestingController;
  let markdownService: MarkdownService;
  let sanitize: SecurityContext | SanitizeFunction | null;
  let viewContainerRef: ViewContainerRef;

  const mockExtensions = [
    { name: 'mock-extension-one' } as MarkedExtension,
    { name: 'mock-extension-two' } as MarkedExtension,
  ];
  const viewContainerRefSpy = { createComponent: vi.fn(), createEmbeddedView: vi.fn() };

  describe('without sanitize provider', () => {

    describe('parse', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            provideMarkdown(),
          ],
        });

        domSanitizer = TestBed.inject(DomSanitizer);
        markdownService = TestBed.inject(MarkdownService);
        sanitize = TestBed.inject(SANITIZE, null, { optional: true });
      });

      it('should sanitize parsed markdown using default HTML security context', async () => {

        const mockRaw = '### Markdown-x';
        const sanitized = domSanitizer.sanitize(SecurityContext.HTML, await marked.parse(mockRaw))!;
        const unsanitized = await marked.parse(mockRaw);

        expect(sanitize).toBeNull();
        await expect(markdownService.parse(mockRaw)).resolves.toEqual(sanitized);
        await expect(markdownService.parse(mockRaw)).resolves.not.toEqual(unsanitized);
      });
    });
  });

  describe('with sanitize function', () => {

    describe('parse', () => {
      let sanitizeFuncSpy: MockedFunction<SanitizeFunction>;

      beforeEach(() => {
        sanitizeFuncSpy = vi.fn();

        TestBed.configureTestingModule({
          providers: [
            provideMarkdown({ sanitize: { provide: SANITIZE, useValue: sanitizeFuncSpy } }),
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

        sanitizeFuncSpy.mockImplementation(
          (value: string) => value === unsanitized ? mockSanitized : undefined!,
        );

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
          providers: [
            provideMarkdown({ sanitize: { provide: SANITIZE, useValue: SecurityContext.HTML } }),
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

        await expect(markdownService.parse(mockRaw)).resolves.toEqual(sanitized);
        await expect(markdownService.parse(mockRaw)).resolves.not.toEqual(unsanitized);

        await expect(markdownService.parse(mockRaw, { disableSanitizer: false })).resolves.toEqual(sanitized);
        await expect(markdownService.parse(mockRaw, { disableSanitizer: false })).resolves.not.toEqual(unsanitized);

        await expect(markdownService.parse(mockRaw, { disableSanitizer: null! })).resolves.toEqual(sanitized);
        await expect(markdownService.parse(mockRaw, { disableSanitizer: null! })).resolves.not.toEqual(unsanitized);

        await expect(markdownService.parse(mockRaw, { disableSanitizer: undefined })).resolves.toEqual(sanitized);
        await expect(markdownService.parse(mockRaw, { disableSanitizer: undefined })).resolves.not.toEqual(unsanitized);
      });

      it('should not sanitize parsed markdown when disableSanitizer is true', async () => {

        const mockRaw = '### Markdown-x';
        const sanitized = domSanitizer.sanitize(sanitize as SecurityContext, await marked.parse(mockRaw))!;
        const unsanitized = await marked.parse(mockRaw);

        await expect(markdownService.parse(mockRaw, { disableSanitizer: true })).resolves.not.toEqual(sanitized);
        await expect(markdownService.parse(mockRaw, { disableSanitizer: true })).resolves.toEqual(unsanitized);
      });
    });
  });

  describe('with SecurityContext.NONE', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          BrowserModule,
        ],
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          provideMarkdown({
            markedExtensions: [
              { provide: MARKED_EXTENSIONS, useValue: mockExtensions[0], multi: true },
              { provide: MARKED_EXTENSIONS, useFactory: () => mockExtensions[1], multi: true },
            ],
            sanitize: { provide: SANITIZE, useValue: SecurityContext.NONE },
          }),
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

        expect(markdownService.options.breaks).toBe(true);
        expect(markdownService.options.gfm).toBe(false);
        expect(markdownService.options.pedantic).toBe(true);
        expect(markdownService.options.silent).toBe(false);
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

      it('should register extensions for marked renderer when extensions are provided', async () => {

        const mockRaw = '### Markdown-x';

        const markedUseSpy = vi.spyOn(marked, 'use').mockImplementation((() => undefined) as never);

        await markdownService.parse(mockRaw);

        expect(markedUseSpy).toHaveBeenCalledWith(...mockExtensions);
      });

      it('should not register extensions for marked renderer more than once', async () => {

        const mockRaw = '### Markdown-x';

        const markedUseSpy = vi.spyOn(marked, 'use').mockImplementation((() => undefined) as never);

        await markdownService.parse(mockRaw);

        expect(markedUseSpy).toHaveBeenCalledWith(...mockExtensions);

        markedUseSpy.mockClear();

        await markdownService.parse(mockRaw);

        expect(markedUseSpy).not.toHaveBeenCalledWith(...mockExtensions);
      });

      it('should extend marked renderer when katex is true', async () => {

        const markedKatexSpy = vi.fn().mockReturnValue({
          extensions: [
            { name: 'inlineKatex' },
            { name: 'blockKatex' },
          ],
        });
        markdownService['markedKatex'] = markedKatexSpy;

        const markedUseSpy = vi.spyOn(marked, 'use').mockImplementation((() => undefined) as never);

        await markdownService.parse('### Markdown-x', { katex: true });

        expect(markedUseSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            extensions: expect.arrayContaining([
              expect.objectContaining({ name: 'inlineKatex' }),
              expect.objectContaining({ name: 'blockKatex' }),
            ]),
          }),
        );
      });

      it('should not extend marked renderer more than once when katex is true', async () => {

        const markedKatexSpy = vi.fn().mockReturnValue({
          extensions: [
            { name: 'inlineKatex' },
            { name: 'blockKatex' },
          ],
        });
        markdownService['markedKatex'] = markedKatexSpy;

        const markedUseSpy = vi.spyOn(marked, 'use').mockImplementation((() => undefined) as never);

        await markdownService.parse('### Markdown-x', { katex: true });

        expect(markedUseSpy).toHaveBeenCalled();
        markedUseSpy.mockClear();

        await markdownService.parse('### Markdown-y', { katex: true });

        expect(markedUseSpy).not.toHaveBeenCalledWith(
          expect.objectContaining({
            extensions: expect.arrayContaining([
              expect.objectContaining({ name: 'inlineKatex' }),
              expect.objectContaining({ name: 'blockKatex' }),
            ]),
          }),
        );
      });

      it('should only import marked-katex-extension only once', async () => {

        const markedKatexSpy = vi.fn().mockReturnValue({
          extensions: [
            { name: 'inlineKatex' },
            { name: 'blockKatex' },
          ],
        });
        markdownService['markedKatex'] = markedKatexSpy;

        const markedUseSpy = vi.spyOn(marked, 'use').mockImplementation((() => undefined) as never);

        await markdownService.parse('### Markdown-x', { katex: true });

        markedUseSpy.mockClear();

        await markdownService.parse('### Markdown-x', { katex: true });

        expect(markedUseSpy).not.toHaveBeenCalledWith(
          expect.objectContaining({
            extensions: expect.arrayContaining([
              expect.objectContaining({ name: 'inlineKatex' }),
              expect.objectContaining({ name: 'blockKatex' }),
            ]),
          }),
        );
      });

      it('should throw when katex is true and marked-katex-extension is not loaded ', async () => {

        markdownService['markedKatex'] = false as any;

        await expect(markdownService.parse('### Markdown-x', { katex: true })).rejects.toThrowError(errorKatexExtensionNotLoaded);
      });

      it('should provide katexOptions correctly when parsing', async () => {

        const markedKatexSpy = vi.fn().mockReturnValue({ extensions: [] });
        markdownService['markedKatex'] = markedKatexSpy;

        const katexOptions: MarkedKatexOptions = { displayMode: true };

        await markdownService.parse('### Markdown-x', { katex: true, katexOptions });

        expect(markedKatexSpy).toHaveBeenCalledWith(katexOptions);
      });

      it('should gate KaTeX parse extension behind `katex` flag', async () => {

        const tokenizerSpy = vi.fn().mockReturnValue(undefined);
        const markedKatexSpy = vi.fn().mockReturnValue({
          extensions: [{ name: 'marked-katex-extension', level: 'block', tokenizer: tokenizerSpy }],
        });

        markdownService['markedKatex'] = markedKatexSpy;

        await markdownService.parse('$E=mc^2$', { katex: false });

        expect(tokenizerSpy).not.toHaveBeenCalled();

        await markdownService.parse('$E=mc^2$', { katex: true });

        expect(tokenizerSpy).toHaveBeenCalled();
      });

      it('should disable an already-installed KaTeX tokenizer when katex is false', async () => {

        // The renderer is shared across components, and marked cannot disable an
        // extension once registered. Once `katex: true` has installed the gated
        // tokenizer, a later `katex: false` parse must go through the gate and
        // bail out, otherwise enabling katex in one component enables it for all.
        const tokenizerSpy = vi.fn().mockReturnValue(undefined);
        const markedKatexSpy = vi.fn().mockReturnValue({
          extensions: [{ name: 'marked-katex-extension', level: 'block', tokenizer: tokenizerSpy }],
        });

        markdownService['markedKatex'] = markedKatexSpy;

        await markdownService.parse('$E=mc^2$', { katex: true });

        expect(tokenizerSpy).toHaveBeenCalled();

        tokenizerSpy.mockClear();

        await markdownService.parse('$E=mc^2$', { katex: false });

        expect(tokenizerSpy).not.toHaveBeenCalled();
      });

      it('should not extend marked renderer when katex is false', async () => {

        const markedKatexSpy = vi.fn().mockReturnValue({ extensions: [] } as any);
        markdownService['markedKatex'] = markedKatexSpy;

        const markedUseSpy = vi.spyOn(marked, 'use').mockImplementation((() => undefined) as never);

        await markdownService.parse('### Markdown-x', { katex: false });

        expect(markedKatexSpy).not.toHaveBeenCalled();
        expect(markedUseSpy).not.toHaveBeenCalledWith(
          expect.objectContaining({
            extensions: expect.arrayContaining([
              expect.objectContaining({ name: 'inlineKatex' }),
              expect.objectContaining({ name: 'blockKatex' }),
            ]),
          }),
        );
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

      it('should not pass extended flags to `marked.use` when parsing', async () => {

        const mockRaw = '### Markdown-x';
        const mockRenderer = new MarkedRenderer();
        const mockMarkedOptions: MarkedOptions = { renderer: mockRenderer };

        const markedUseSpy = vi.spyOn(marked, 'use').mockImplementation((() => undefined) as never);

        markdownService.options = mockMarkedOptions;
        await markdownService.parse(mockRaw, { mermaid: true });

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

        await expect(markdownService.parse(mockRaw)).resolves.toEqual(expected);
        await expect(markdownService.parse(mockRaw, { decodeHtml: false })).resolves.toEqual(expected);
        await expect(markdownService.parse(mockRaw, { decodeHtml: null! })).resolves.toEqual(expected);
        await expect(markdownService.parse(mockRaw, { decodeHtml: undefined })).resolves.toEqual(expected);
      });

      it('should not decode HTML when platform is not browser as it uses `document`', async () => {

        const mockRaw = '&lt;html&gt;';
        const expected = '<p>&lt;html&gt;</p>\n';

        markdownService['platform'] = 'server';

        const result = await markdownService.parse(mockRaw, { decodeHtml: true });

        expect(result).toBe(expected);
      });

      it('should throw when emoji is true but emoji-toolkit is not loaded', async () => {

        window['joypixels'] = undefined;

        await expect(markdownService.parse('I :heart: ngx-markdown', { decodeHtml: false, emoji: true })).rejects.toThrowError(errorJoyPixelsNotLoaded);

        window['joypixels'] = { shortnameToUnicode: undefined };

        await expect(markdownService.parse('I :heart: ngx-markdown', { decodeHtml: false, emoji: true })).rejects.toThrowError(errorJoyPixelsNotLoaded);
      });

      it('should call joypixels when emoji is true', async () => {

        const mockRaw = 'I :heart: ngx-markdown';
        const mockEmojified = 'I ❤️ ngx-markdown';

        window['joypixels'] = { shortnameToUnicode: () => {} };

        vi.spyOn(joypixels, 'shortnameToUnicode').mockReturnValue(mockEmojified);

        const result = await markdownService.parse(mockRaw, { decodeHtml: false, emoji: true });

        expect(result).toEqual(await marked.parse(mockEmojified));
        expect(joypixels.shortnameToUnicode).toHaveBeenCalledWith(mockRaw);
      });

      it('should not call joypixels when emoji is omitted/false/null/undefined', async () => {

        const mockRaw = '### Markdown-x';

        window['joypixels'] = { shortnameToUnicode: () => {} };

        vi.spyOn(joypixels, 'shortnameToUnicode').mockImplementation((() => undefined) as never);

        const useCases = [
          () => markdownService.parse(mockRaw, { decodeHtml: false }),
          () => markdownService.parse(mockRaw, { decodeHtml: false, emoji: false }),
          () => markdownService.parse(mockRaw, { decodeHtml: false, emoji: null! }),
          () => markdownService.parse(mockRaw, { decodeHtml: false, emoji: undefined }),
        ];

        for (const func of useCases) {
          await func();
          expect(joypixels.shortnameToUnicode).not.toHaveBeenCalled();
        }
      });

      it('should not call joypixels or throw when platform is not browser', async () => {

        const mockRaw = 'I :heart: ngx-markdown';

        window['joypixels'] = { shortnameToUnicode: () => {} };

        vi.spyOn(joypixels, 'shortnameToUnicode').mockImplementation((() => undefined) as never);

        markdownService['platform'] = 'server';

        await expect(markdownService.parse(mockRaw, { decodeHtml: false, emoji: true })).resolves.not.toThrow();
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

          await expect(markdownService.parse(mockRaw)).resolves.not.toThrow();
          await expect(markdownService.parse(mockRaw)).resolves.toEqual(await marked.parse(mockRaw));
        }
      });

      it('should return inline parsed markdown when inline is true', async () => {

        const mockRaw = '### Markdown-x';

        await expect(markdownService.parse(mockRaw, { inline: true })).resolves.toEqual(await marked.parseInline(mockRaw));
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
          await expect(func()).resolves.toEqual(await marked.parse(mockRaw));
        }
      });

      it('should provide markedOptions correctly when parsing', async () => {

        const mockRaw = '### Markdown-x';
        const mockMarkedOptions: MarkedOptions = { breaks: true, gfm: false, pedantic: true, silent: false };
        const parseOptions: ParseOptions = { markedOptions: mockMarkedOptions };

        const expectedOptions = {
          ...markdownService.options,
          ...mockMarkedOptions,
        };
        delete expectedOptions.renderer;

        const markedParseSpy = vi.spyOn(marked, 'parse').mockImplementation((() => undefined) as never);

        await markdownService.parse(mockRaw, parseOptions);

        expect(markedParseSpy).toHaveBeenCalled();
        expect(markedParseSpy.mock.calls[0][0]).toBe(mockRaw);
        expect(markedParseSpy.mock.calls[0][1]).toEqual(expectedOptions);
      });

      it('should not override markedOptions.renderer when parsing and parseOptions.renderer is not provided', async () => {

        const mockRaw = '### Markdown-x';
        const mockRenderer = new MarkedRenderer();
        mockRenderer.blockquote = () => 'mock-blocquote';
        const mockMarkedOptions: MarkedOptions = { breaks: true, gfm: false, pedantic: true, silent: false, renderer: mockRenderer };

        const markedUseSpy = vi.spyOn(marked, 'use').mockImplementation((() => undefined) as never);

        markdownService.options = mockMarkedOptions;
        await markdownService.parse(mockRaw);

        const expectedMockRenderer = { ...mockRenderer } as Partial<ExtendedRenderer>;
        delete expectedMockRenderer.ɵNgxMarkdownRendererExtendedForExtensions;

        expect(markedUseSpy).toHaveBeenCalledWith(...mockExtensions);
        expect(markedUseSpy).toHaveBeenCalledWith({ renderer: expectedMockRenderer });
      });

      it('should return empty string when raw is null/undefined/empty', async () => {

        await expect(markdownService.parse(null!)).resolves.toEqual('');
        await expect(markdownService.parse(undefined!)).resolves.toEqual('');
        await expect(markdownService.parse('')).resolves.toEqual('');
      });

      it('should not sanitize parsed markdown', async () => {

        const mockRaw = '### Markdown-x';
        const unsanitized = await marked.parse(mockRaw);

        await expect(markdownService.parse(mockRaw, { decodeHtml: false })).resolves.toEqual(unsanitized);
      });
    });

    describe('render', () => {

      function mockComponentRef(): { componentRef: ComponentRef<unknown>; rootNode: HTMLElement; } {
        const rootNode = document.createElement('button');

        const embeddedViewRef = {
          rootNodes: [rootNode],
          onDestroy: (callback) => {},
        } as EmbeddedViewRef<unknown> as ViewRef;

        const componentRef = {
          changeDetectorRef: {
            markForCheck: () => {},
          },
          hostView: embeddedViewRef,
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

        vi.spyOn(mermaid, 'initialize').mockImplementation((() => undefined) as never);
        vi.spyOn(mermaid, 'run').mockImplementation((() => undefined) as never);

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

        vi.spyOn(mermaid, 'initialize').mockImplementation((() => undefined) as never);
        vi.spyOn(mermaid, 'run').mockImplementation((() => undefined) as never);

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

        vi.spyOn(mermaid, 'initialize').mockImplementation((() => undefined) as never);
        vi.spyOn(mermaid, 'run').mockImplementation((() => undefined) as never);

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

        vi.spyOn(mermaid, 'initialize').mockImplementation((() => undefined) as never);
        vi.spyOn(mermaid, 'run').mockImplementation((() => undefined) as never);

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

        vi.spyOn(mermaid, 'initialize').mockImplementation((() => undefined) as never);
        vi.spyOn(mermaid, 'run').mockImplementation((() => undefined) as never);

        expect(() => markdownService.render(container, { mermaid: true })).not.toThrowError();
        expect(mermaid.initialize).not.toHaveBeenCalled();
        expect(mermaid.run).not.toHaveBeenCalled();
      });

      it('should render clipboard after mermaid', () => {

        const container = document.createElement('div');
        const pluginRenderingOrder: string[] = [];

        // clipboard
        const clipboardPreElement = document.createElement('pre');
        clipboardPreElement.innerText = 'mock-pre-element-text';
        container.append(clipboardPreElement);

        const { componentRef } = mockComponentRef();
        viewContainerRefSpy.createComponent.mockReturnValue(componentRef);

        window['ClipboardJS'] = class ClipboardJS {
          constructor() {
            pluginRenderingOrder.push('clipboard');
          }
        };

        // mermaid
        const mermaidElement = document.createElement('div');
        mermaidElement.classList.add('mermaid');
        mermaidElement.innerHTML = 'graph TD; A-->B;';

        container.append(mermaidElement);

        window['mermaid'] = {
          initialize: (options: MermaidAPI.MermaidConfig) => {},
          run: (runOptions: MermaidAPI.RunOptions) => {},
        };

        vi.spyOn(mermaid, 'run').mockImplementation(() => {
          pluginRenderingOrder.push('mermaid');
        });

        markdownService.render(container, { clipboard: true, mermaid: true }, viewContainerRef);

        expect(pluginRenderingOrder).toEqual(['mermaid', 'clipboard']);
      });

      it('should render clipboard with default button when clipboard is true and buttonComponent/buttonTemplate is not provided', () => {

        const preElement = document.createElement('pre');
        preElement.innerText = 'mock-pre-element-text';
        const container = document.createElement('div');
        container.append(preElement);

        const { componentRef, rootNode } = mockComponentRef();

        window['ClipboardJS'] = class ClipboardJS {};

        const clipboardSpy = vi.spyOn(window, 'ClipboardJS').mockImplementation(function () { return undefined; } as never);
        const markForCheckSpy = vi.spyOn(componentRef.changeDetectorRef, 'markForCheck').mockImplementation((() => undefined));

        viewContainerRefSpy.createComponent.mockReturnValue(componentRef);

        markdownService.render(container, { clipboard: true }, viewContainerRef);

        expect(viewContainerRefSpy.createComponent).toHaveBeenCalledWith(ClipboardButtonComponent as any);
        expect(markForCheckSpy).toHaveBeenCalled();
        expect(clipboardSpy).toHaveBeenCalledWith(rootNode, { text: expect.any(Function) });
        expect((clipboardSpy.mock.calls[0][1] as any).text()).toBe(preElement.innerText);
      });

      it('should render clipboard with buttonComponent when clipboard is true and buttonComponent is provided', () => {

        class MockButtonComponent { mockButton = true; }

        const preElement = document.createElement('pre');
        preElement.innerText = 'mock-pre-element-text';
        const container = document.createElement('div');
        container.append(preElement);

        const { componentRef, rootNode } = mockComponentRef();

        window['ClipboardJS'] = class ClipboardJS {};

        const clipboardSpy = vi.spyOn(window, 'ClipboardJS').mockImplementation(function () { return undefined; } as never);
        const markForCheckSpy = vi.spyOn(componentRef.changeDetectorRef, 'markForCheck').mockImplementation((() => undefined));

        viewContainerRefSpy.createComponent.mockReturnValue(componentRef);

        markdownService.render(
          container,
          { clipboard: true, clipboardOptions: { buttonComponent: MockButtonComponent } },
          viewContainerRef,
        );

        expect(viewContainerRefSpy.createComponent).toHaveBeenCalledWith(MockButtonComponent as any);
        expect(markForCheckSpy).toHaveBeenCalled();
        expect(clipboardSpy).toHaveBeenCalledWith(rootNode, { text: expect.any(Function) });
        expect((clipboardSpy.mock.calls[0][1] as any).text()).toBe(preElement.innerText);
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

        const clipboardSpy = vi.spyOn(window, 'ClipboardJS').mockImplementation(function () { return undefined; } as never);

        viewContainerRefSpy.createEmbeddedView.mockReturnValue(embeddedViewRef);

        markdownService.render(
          container,
          { clipboard: true, clipboardOptions: { buttonTemplate: mockTemplateRef } },
          viewContainerRef,
        );

        expect(viewContainerRefSpy.createEmbeddedView).toHaveBeenCalledWith(mockTemplateRef);
        expect(clipboardSpy).toHaveBeenCalledWith(rootNode, { text: expect.any(Function) });
        expect((clipboardSpy.mock.calls[0][1] as any).text()).toBe(preElement.innerText);
      });

      it('should destroy clipboard instances when host view is destroyed', () => {

        const preElement = document.createElement('pre');
        preElement.innerText = 'mock-pre-element-text';
        const container = document.createElement('div');
        container.append(preElement);

        const { componentRef } = mockComponentRef();
        const mockClipboardInstance = { destroy: () => {} };

        window['ClipboardJS'] = () => {};

        vi.spyOn(window, 'ClipboardJS').mockImplementation(function () { return mockClipboardInstance; } as never);

        const hostViewDestroySpy = vi.spyOn(componentRef.hostView, 'onDestroy').mockImplementation((() => undefined));
        const clipboardDestroySpy = vi.spyOn(mockClipboardInstance, 'destroy').mockImplementation((() => undefined));

        viewContainerRefSpy.createComponent.mockReturnValue(componentRef);

        markdownService.render(container, { clipboard: true }, viewContainerRef);

        expect(hostViewDestroySpy).toHaveBeenCalled();

        const hostViewDestroyCallback = hostViewDestroySpy.mock.calls[0][0];
        hostViewDestroyCallback();

        expect(clipboardDestroySpy).toHaveBeenCalled();
      });

      it('should not render clipboard when clipboard is omitted/false/null/undefined', () => {

        const preElement = document.createElement('pre');
        const container = document.createElement('div');
        container.append(preElement);

        const clipboardSpy = vi.fn();
        window['ClipboardJS'] = clipboardSpy;

        const useCases = [
          () => markdownService.render(container),
          () => markdownService.render(container, { clipboard: false }, viewContainerRef),
          () => markdownService.render(container, { clipboard: null! }, viewContainerRef),
          () => markdownService.render(container, { clipboard: undefined }, viewContainerRef),
        ];

        useCases.forEach(func => {
          func();
          expect(clipboardSpy).not.toHaveBeenCalled();
        });
      });

      it('should not render clipboard or throw when platform is not browser', () => {

        const preElement = document.createElement('pre');
        const container = document.createElement('div');
        container.append(preElement);

        const clipboardSpy = vi.fn();
        window['ClipboardJS'] = clipboardSpy;

        markdownService['platform'] = 'server';

        expect(() => markdownService.render(container, { clipboard: true })).not.toThrowError();
        expect(clipboardSpy).not.toHaveBeenCalled();
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

        vi.spyOn(markdownService, 'highlight').mockImplementation((() => undefined));

        markdownService.render(element);

        expect(markdownService.highlight).toHaveBeenCalled();
      });
    });

    describe('reload', () => {

      it('should request reload through reload$ subject', async () => {

        // `firstValueFrom` is rxjs 7+; the library still supports rxjs 6.
        const reloaded = new Promise<void>(resolve => {
          markdownService.reload$
            .pipe(first())
            .subscribe(() => resolve());
        });

        markdownService.reload();

        await expect(reloaded).resolves.toBeUndefined();
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

        vi.spyOn(Prism, 'highlightAllUnder').mockImplementation((() => undefined) as never);

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

        vi.spyOn(Prism, 'highlightAllUnder').mockImplementation((() => undefined) as never);

        markdownService.highlight(mockHtmlElement);

        expect(Prism.highlightAllUnder).toHaveBeenCalledWith(mockHtmlElement);
      });

      it('should call Prism when available and element parameter is ommited/null/undefined', () => {

        window['Prism'] = { highlightAllUnder: () => {} };

        vi.spyOn(Prism, 'highlightAllUnder').mockImplementation((() => undefined) as never);

        const useCases = [
          () => markdownService.highlight(),
          () => markdownService.highlight(null!),
          () => markdownService.highlight(undefined),
        ];

        useCases.forEach(func => {
          func();
          expect(Prism.highlightAllUnder).toHaveBeenCalledWith(document);
          Prism.highlightAllUnder.mockClear();
        });
      });
    });
  });

  describe('without HttpClient provider', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          provideMarkdown(),
          { provide: HttpClient, useValue: null },
        ],
      });

      markdownService = TestBed.inject(MarkdownService);
    });

    it('should throw an error when using src attribute', () => {

      const mockSrc = 'file-x.md';

      expect(() => markdownService.getSource(mockSrc)).toThrowError(errorSrcWithoutHttpClient);
    });
  });
});
