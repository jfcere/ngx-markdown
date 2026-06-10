/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentRef, EmbeddedViewRef, SecurityContext, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { marked, MarkedExtension, Tokens } from 'marked';
import { first } from 'rxjs/operators';
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
  const viewContainerRefSpy = jasmine.createSpyObj<ViewContainerRef>(['createComponent', 'createEmbeddedView']);

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
        await expectAsync(markdownService.parse(mockRaw)).toBeResolvedTo(sanitized);
        await expectAsync(markdownService.parse(mockRaw)).not.toBeResolvedTo(unsanitized);
      });
    });
  });

  describe('with sanitize function', () => {

    describe('parse', () => {
      let sanitizeFuncSpy: jasmine.Spy<SanitizeFunction>;

      beforeEach(() => {
        sanitizeFuncSpy = jasmine.createSpy('sanitize');

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

        await expectAsync(markdownService.parse(mockRaw)).toBeResolvedTo(sanitized);
        await expectAsync(markdownService.parse(mockRaw)).not.toBeResolvedTo(unsanitized);

        await expectAsync(markdownService.parse(mockRaw, { disableSanitizer: false })).toBeResolvedTo(sanitized);
        await expectAsync(markdownService.parse(mockRaw, { disableSanitizer: false })).not.toBeResolvedTo(unsanitized);

        await expectAsync(markdownService.parse(mockRaw, { disableSanitizer: null! })).toBeResolvedTo(sanitized);
        await expectAsync(markdownService.parse(mockRaw, { disableSanitizer: null! })).not.toBeResolvedTo(unsanitized);

        await expectAsync(markdownService.parse(mockRaw, { disableSanitizer: undefined })).toBeResolvedTo(sanitized);
        await expectAsync(markdownService.parse(mockRaw, { disableSanitizer: undefined })).not.toBeResolvedTo(unsanitized);
      });

      it('should not sanitize parsed markdown when disableSanitizer is true', async () => {

        const mockRaw = '### Markdown-x';
        const sanitized = domSanitizer.sanitize(sanitize as SecurityContext, await marked.parse(mockRaw))!;
        const unsanitized = await marked.parse(mockRaw);

        await expectAsync(markdownService.parse(mockRaw, { disableSanitizer: true })).not.toBeResolvedTo(sanitized);
        await expectAsync(markdownService.parse(mockRaw, { disableSanitizer: true })).toBeResolvedTo(unsanitized);
      });
    });
  });

  describe('with SecurityContext.NONE', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          BrowserModule,
          HttpClientTestingModule,
        ],
        providers: [
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

      it('should register extensions for marked renderer when extensions are provided', async () => {

        const mockRaw = '### Markdown-x';

        const markedUseSpy = spyOn(marked, 'use');

        await markdownService.parse(mockRaw);

        expect(markedUseSpy).toHaveBeenCalledWith(...mockExtensions);
      });

      it('should not register extensions for marked renderer more than once', async () => {

        const mockRaw = '### Markdown-x';

        const markedUseSpy = spyOn(marked, 'use');

        await markdownService.parse(mockRaw);

        expect(markedUseSpy).toHaveBeenCalledWith(...mockExtensions);

        markedUseSpy.calls.reset();

        await markdownService.parse(mockRaw);

        expect(markedUseSpy).not.toHaveBeenCalledWith(...mockExtensions);
      });

      it('should extend marked renderer when katex is true', async () => {

        const markedUseSpy = spyOn(marked, 'use');

        await markdownService.parse('### Markdown-x', { katex: true });

        expect(markedUseSpy).toHaveBeenCalledWith(
          jasmine.objectContaining({
            extensions: jasmine.arrayContaining([
              jasmine.objectContaining({ name: 'inlineKatex' }),
              jasmine.objectContaining({ name: 'blockKatex' }),
            ]),
          }),
        );
      });

      it('should not extend marked renderer more than once when katex is true', async () => {

        const markedUseSpy = spyOn(marked, 'use');

        await markdownService.parse('### Markdown-x', { katex: true });

        expect(markedUseSpy).toHaveBeenCalled();
        markedUseSpy.calls.reset();

        await markdownService.parse('### Markdown-y', { katex: true });

        expect(markedUseSpy).not.toHaveBeenCalledWith(
          jasmine.objectContaining({
            extensions: jasmine.arrayContaining([
              jasmine.objectContaining({ name: 'inlineKatex' }),
              jasmine.objectContaining({ name: 'blockKatex' }),
            ]),
          }),
        );
      });

      it('should only import marked-katex-extension only once', async () => {

        const markedUseSpy = spyOn(marked, 'use');

        await markdownService.parse('### Markdown-x', { katex: true });

        markedUseSpy.calls.reset();

        await markdownService.parse('### Markdown-x', { katex: true });

        expect(markedUseSpy).not.toHaveBeenCalledWith(
          jasmine.objectContaining({
            extensions: jasmine.arrayContaining([
              jasmine.objectContaining({ name: 'inlineKatex' }),
              jasmine.objectContaining({ name: 'blockKatex' }),
            ]),
          }),
        );
      });

      it('should throw when katex is true and marked-katex-extension is not loaded ', async () => {

        markdownService['markedKatex'] = false as any;

        await expectAsync(markdownService.parse('### Markdown-x', { katex: true })).toBeRejectedWithError(errorKatexExtensionNotLoaded);
      });

      it('should provide katexOptions correctly when parsing', async () => {

        const markedKatexSpy = jasmine.createSpy('markedKatex').and.returnValue({ extensions: [] });
        markdownService['markedKatex'] = markedKatexSpy;

        const katexOptions: MarkedKatexOptions = { displayMode: true };

        await markdownService.parse('### Markdown-x', { katex: true, katexOptions });

        expect(markedKatexSpy).toHaveBeenCalledWith(katexOptions);
      });

      it('should gate KaTeX parse extension behind `katex` flag', async () => {

        const tokenizerSpy = jasmine.createSpy('katexTokenizer').and.returnValue(undefined);
        const markedKatexSpy = jasmine.createSpy('markedKatex').and.returnValue({
          extensions: [{ name: 'marked-katex-extension', level: 'block', tokenizer: tokenizerSpy }],
        });

        markdownService['markedKatex'] = markedKatexSpy;

        await markdownService.parse('$E=mc^2$', { katex: false });

        expect(tokenizerSpy).not.toHaveBeenCalled();

        await markdownService.parse('$E=mc^2$', { katex: true });

        expect(tokenizerSpy).toHaveBeenCalled();
      });

      it('should not extend marked renderer when katex is false', async () => {

        const markedKatexSpy = jasmine.createSpy('markedKatex').and.returnValue({ extensions: [] } as any);
        markdownService['markedKatex'] = markedKatexSpy;

        const markedUseSpy = spyOn(marked, 'use');

        await markdownService.parse('### Markdown-x', { katex: false });

        expect(markedKatexSpy).not.toHaveBeenCalled();
        expect(markedUseSpy).not.toHaveBeenCalledWith(
          jasmine.objectContaining({
            extensions: jasmine.arrayContaining([
              jasmine.objectContaining({ name: 'inlineKatex' }),
              jasmine.objectContaining({ name: 'blockKatex' }),
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

        const markedUseSpy = spyOn(marked, 'use');

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

        await expectAsync(markdownService.parse(mockRaw)).toBeResolvedTo(expected);
        await expectAsync(markdownService.parse(mockRaw, { decodeHtml: false })).toBeResolvedTo(expected);
        await expectAsync(markdownService.parse(mockRaw, { decodeHtml: null! })).toBeResolvedTo(expected);
        await expectAsync(markdownService.parse(mockRaw, { decodeHtml: undefined })).toBeResolvedTo(expected);
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

        await expectAsync(markdownService.parse('I :heart: ngx-markdown', { decodeHtml: false, emoji: true })).toBeRejectedWithError(errorJoyPixelsNotLoaded);

        window['joypixels'] = { shortnameToUnicode: undefined };

        await expectAsync(markdownService.parse('I :heart: ngx-markdown', { decodeHtml: false, emoji: true })).toBeRejectedWithError(errorJoyPixelsNotLoaded);
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

      it('should not call joypixels when emoji is omitted/false/null/undefined', async () => {

        const mockRaw = '### Markdown-x';

        window['joypixels'] = { shortnameToUnicode: () => {} };

        spyOn(joypixels, 'shortnameToUnicode');

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

        spyOn(joypixels, 'shortnameToUnicode');

        markdownService['platform'] = 'server';

        await expectAsync(markdownService.parse(mockRaw, { decodeHtml: false, emoji: true })).not.toBeRejected();
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

          await expectAsync(markdownService.parse(mockRaw)).not.toBeRejected();
          await expectAsync(markdownService.parse(mockRaw)).toBeResolvedTo(await marked.parse(mockRaw));
        }
      });

      it('should return inline parsed markdown when inline is true', async () => {

        const mockRaw = '### Markdown-x';

        await expectAsync(markdownService.parse(mockRaw, { inline: true })).toBeResolvedTo(await marked.parseInline(mockRaw));
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
          await expectAsync(func()).toBeResolvedTo(await marked.parse(mockRaw));
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

        const markedParseSpy = spyOn(marked, 'parse');

        await markdownService.parse(mockRaw, parseOptions);

        expect(markedParseSpy).toHaveBeenCalled();
        expect(markedParseSpy.calls.argsFor(0)[0]).toBe(mockRaw);
        expect(markedParseSpy.calls.argsFor(0)[1]).toEqual(expectedOptions);
      });

      it('should not override markedOptions.renderer when parsing and parseOptions.renderer is not provided', async () => {

        const mockRaw = '### Markdown-x';
        const mockRenderer = new MarkedRenderer();
        mockRenderer.blockquote = () => 'mock-blocquote';
        const mockMarkedOptions: MarkedOptions = { breaks: true, gfm: false, pedantic: true, silent: false, renderer: mockRenderer };

        const markedUseSpy = spyOn(marked, 'use');

        markdownService.options = mockMarkedOptions;
        await markdownService.parse(mockRaw);

        const expectedMockRenderer = { ...mockRenderer } as Partial<ExtendedRenderer>;
        delete expectedMockRenderer.ɵNgxMarkdownRendererExtendedForExtensions;

        expect(markedUseSpy).toHaveBeenCalledWith(...mockExtensions);
        expect(markedUseSpy).toHaveBeenCalledWith({ renderer: expectedMockRenderer });
      });

      it('should return empty string when raw is null/undefined/empty', async () => {

        await expectAsync(markdownService.parse(null!)).toBeResolvedTo('');
        await expectAsync(markdownService.parse(undefined!)).toBeResolvedTo('');
        await expectAsync(markdownService.parse('')).toBeResolvedTo('');
      });

      it('should not sanitize parsed markdown', async () => {

        const mockRaw = '### Markdown-x';
        const unsanitized = await marked.parse(mockRaw);

        await expectAsync(markdownService.parse(mockRaw, { decodeHtml: false })).toBeResolvedTo(unsanitized);
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

      it('should render clipboard after mermaid', () => {

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
