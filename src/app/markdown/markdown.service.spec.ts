import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SecurityContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import * as marked from 'marked';

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
      const expected = domSanitizer.sanitize(SecurityContext.HTML, marked(mockRaw));

      expect(markdownService.compile(mockRaw)).toBe(expected);
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

      const expected = domSanitizer.sanitize(SecurityContext.HTML, marked([
        '',
        '* list',
        '  * sub-list',
      ].join('\n')));

      expect(markdownService.compile(mockRaw)).toBe(expected);
    });

    it('should return line with indent correctly', () => {

      const mockRaw =  [
        '* list',       // find first line with non-whitespaces to set offset
        '  * sub-list', // keep indent while removing from previous row offset
        '',             // keep blank line
        'Lorem Ipsum',  // keep everthing else
      ].join('\n');

      const expected = domSanitizer.sanitize(SecurityContext.HTML, marked([
        '* list',
        '  * sub-list',
        '',
        'Lorem Ipsum',
      ].join('\n')));

      expect(markdownService.compile(mockRaw)).toBe(expected);
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
