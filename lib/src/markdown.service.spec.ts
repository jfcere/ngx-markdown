import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { parse } from 'marked';

import { SecurityContext } from '@angular/core';
import { MarkdownService } from './markdown.service';
import { MarkedOptions } from './marked-options';

// Prism mock
declare var Prism: any;

describe('MarkdowService', () => {
  let domSanitizer: DomSanitizer;
  let http: HttpTestingController;
  let markdownService: MarkdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: MarkedOptions, useValue: {} },
        MarkdownService,
      ],
    });
  });

  beforeEach(() => {
    domSanitizer = TestBed.get(DomSanitizer);
    http = TestBed.get(HttpTestingController);
    markdownService = TestBed.get(MarkdownService);
  });

  describe('constructor', () => {

    it('should initialize renderer', () => {

      expect(markdownService.renderer).toBeDefined();
    });
  });

  describe('compile', () => {

    it('should return parsed markdown correctly', () => {

      const mockRaw = '### Markdown-x';

      expect(markdownService.compile(mockRaw)).toBe(parse(mockRaw));
    });

    it('should return empty string when raw is null/undefined/empty', () => {

      expect(markdownService.compile(null)).toBe('');
      expect(markdownService.compile(undefined)).toBe('');
      expect(markdownService.compile('')).toBe('');
    });

    it('should remove leading whitespaces offset while keeping indent', () => {

      const mockRaw =  [
        '',               // wait for line with non-whitespaces
        '  * list',       // find first line with non-whitespaces to set offset
        '    * sub-list', // keep indent while removing from previous row offset
      ].join('\n');

      const expected = [
        '',
        '* list',
        '  * sub-list',
      ].join('\n');

      expect(markdownService.compile(mockRaw)).toBe(parse(expected));
    });

    it('should return line with indent correctly', () => {

      const mockRaw =  [
        '   ',              // first line with only whitespaces should not determine indent offset
        '  * list',         // find first line with non-whitespaces to set offset
        '    * sub-list',   // keep indent while removing from previous row offset
        '  ',               // keep blank line
        ' Negative indent', // keep line with negative offset according to first non-whitespaces line indent
        '  Lorem Ipsum',    // keep indent like equals to first non-whitespaces line ident
      ].join('\n');

      const expected = [
        '* list',
        '  * sub-list',
        '',
        'Negative indent',
        'Lorem Ipsum',
      ].join('\n');

      expect(markdownService.compile(mockRaw)).toBe(parse(expected));
    });

    it('should decode HTML correctly when decodeHtml is true ', () => {

      const mockRaw = '&lt;html&gt;';
      const expected = '<html>';

      expect(markdownService.compile(mockRaw, true)).toBe(expected);
    });

    it('should not decode HTML when decodeHtml is omitted/false/null/undefined', () => {

      const mockRaw = '&lt;html&gt;';
      const expected = '<p>&lt;html&gt;</p>\n';

      expect(markdownService.compile(mockRaw)).toBe(expected);
      expect(markdownService.compile(mockRaw, false)).toBe(expected);
      expect(markdownService.compile(mockRaw, null)).toBe(expected);
      expect(markdownService.compile(mockRaw, undefined)).toBe(expected);
    });

    it('should sanitize when markedOptions.sanitize is true and no sanitizer function is provided', () => {

      const markedOptions: MarkedOptions = { sanitize: true };
      const mockRaw = '### Markdown-x';
      const sanitized = domSanitizer.sanitize(SecurityContext.HTML, parse(mockRaw));
      const unsanitized = parse(mockRaw);

      expect(markdownService.compile(mockRaw, false, markedOptions)).toBe(sanitized);
      expect(markdownService.compile(mockRaw, false, markedOptions)).not.toBe(unsanitized);
    });

    it('should not sanitize when markedOptions.sanitize is true but a sanitizer function is provided', () => {

      const markedOptions: MarkedOptions = { sanitize: true, sanitizer: () => null };
      const mockRaw = '### Markdown-x';
      const expected = parse(mockRaw);

      expect(markdownService.compile(mockRaw, false, markedOptions)).toBe(expected);
    });

    it('should not sanitize when markedOptions.sanitize is false regardless of whether a sanitizer function is provided or not', () => {

      const mockRaw = '### Markdown-x';
      const expected = parse(mockRaw);

      expect(markdownService.compile(mockRaw, false, { sanitize: false })).toBe(expected);
      expect(markdownService.compile(mockRaw, false, { sanitize: false, sanitizer: () => null })).toBe(expected);
    });
  });

  describe('getSource', () => {

    it('should call http service to get src content', () => {

      const mockSrc = 'file-x.md';
      const mockResponse = 'response-x';

      let result: string;

      markdownService
        .getSource(mockSrc)
        .subscribe(data => result = data);

      http.expectOne(mockSrc).flush(mockResponse);

      expect(result).toEqual(mockResponse);
    });

    it('should return src content with language tick when file extension is not .md', () => {

      const mockSrc = './src-example/file.cpp';
      const mockResponse = 'response-x';

      let result: string;

      markdownService
        .getSource(mockSrc)
        .subscribe(data => result = data);

      http.expectOne(mockSrc).flush(mockResponse);

      expect(result).toEqual('```cpp\n' + mockResponse + '\n```');
    });

    it('should return src content without language tick when file extension is .md', () => {

      const mockSrc = './src-example/file.md';
      const mockResponse = 'response-x';

      let result: string;

      markdownService
        .getSource(mockSrc)
        .subscribe(data => result = data);

      http.expectOne(mockSrc).flush(mockResponse);

      expect(result).toEqual(mockResponse);
    });

    it('should ignore query parameters when resolving file extension', () => {

      const mockSrc = './src-example/file.js?param=123&another=abc';
      const mockResponse = 'response-x';

      let result: string;

      markdownService
        .getSource(mockSrc)
        .subscribe(data => result = data);

      http.expectOne(mockSrc).flush(mockResponse);

      expect(result).toEqual('```js\n' + mockResponse + '\n```');
    });
  });

  describe('highlight', () => {

    it('should not call Prism when not available', () => {

      const mockHtmlElement = document.createElement('div');

      global['Prism'] = undefined;

      expect(() => markdownService.highlight(mockHtmlElement)).not.toThrow();
    });

    it('should add `language-none` class on code blocks with no language class', () => {

      const preElement = document.createElement('pre');
      const codeElement = document.createElement('code');
      preElement.appendChild(codeElement);

      global['Prism'] = { highlightAllUnder: () => {} };

      markdownService.highlight(preElement);

      expect(codeElement.classList).toContain('language-none');
    });

    it('should not add `language-none` class on code blocks with language class', () => {

      const preElement = document.createElement('pre');
      const codeElement = document.createElement('code');
      codeElement.classList.add('language-mock');
      preElement.appendChild(codeElement);

      global['Prism'] = { highlightAllUnder: () => {} };

      markdownService.highlight(preElement);

      expect(codeElement.classList).not.toContain('language-none');
      expect(codeElement.classList).toContain('language-mock');
    });

    it('should not add `language-none` class on element other than code blocks without language class', () => {

      const divElement = document.createElement('div');
      const codeElement = document.createElement('code');
      codeElement.classList.add('language-mock');
      divElement.appendChild(codeElement);

      global['Prism'] = { highlightAllUnder: () => {} };

      markdownService.highlight(divElement);

      expect(codeElement.classList).not.toContain('language-none');
      expect(codeElement.classList).toContain('language-mock');
    });

    it('should call Prism when available and element parameter is present', () => {

      const mockHtmlElement = document.createElement('div');

      global['Prism'] = { highlightAllUnder: () => {} };

      spyOn(Prism, 'highlightAllUnder');

      markdownService.highlight(mockHtmlElement);

      expect(Prism.highlightAllUnder).toHaveBeenCalledWith(mockHtmlElement);
    });

    it('should call Prism when available and element parameter is ommited/null/undefined', () => {

      global['Prism'] = { highlightAllUnder: () => {} };

      spyOn(Prism, 'highlightAllUnder');

      const useCases = [
        () => markdownService.highlight(),
        () => markdownService.highlight(null),
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
