import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { parse } from 'marked';

import { MarkdownService } from './markdown.service';
import { MarkedOptions } from './marked-options';

// Prism mock
declare var Prism: any;

describe('MarkdowService', () => {
  let http: HttpTestingController;
  let markdownService: MarkdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MarkedOptions, useValue: {} },
        MarkdownService,
      ],
    });
  });

  beforeEach(() => {
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
  });

  describe('highlight', () => {

    it('should not call Prism when not available', () => {

      global['Prism'] = undefined;

      markdownService.highlight();
    });

    it('should call Prism when available', () => {

      global['Prism'] = { highlightAll: () => {} };

      spyOn(Prism, 'highlightAll');

      markdownService.highlight();

      expect(Prism.highlightAll).toHaveBeenCalledWith(false);
    });
  });
});
