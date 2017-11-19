import { async, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { AnonymousSubject } from 'rxjs/Subject';

import { MarkdownService } from './markdown.service';
import { MarkdownOptions } from './models';

// window mock
declare var window: any;

const mockHttpProvider = {
  provide: Http,
  deps: [
    MockBackend,
    BaseRequestOptions,
  ],
  useFactory: (
    backend: MockBackend,
    defaultOptions: BaseRequestOptions
  ) => new Http(backend, defaultOptions),
};

describe('MarkdowService', () => {
  let http: Http;
  let markdownService: MarkdownService;
  let mockBackend: MockBackend;

  function mockBackendResponse(responseOptions: ResponseOptions = new ResponseOptions()): Response {
    const response = new Response(responseOptions);

    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(response);
    });

    return response;
  }

  function mockBackendError(errorMessage: string): Error {
    const error = new Error(errorMessage);

    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockError(error);
    });

    return error;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MarkdownService,
        MockBackend,
        mockHttpProvider,
        { provide: MarkdownOptions, useValue: null },
      ],
    });
  });

  beforeEach(() => {
    http = TestBed.get(Http);
    markdownService = TestBed.get(MarkdownService);
    mockBackend = TestBed.get(MockBackend);
  });

  describe('compile', () => {

    it('should precompile provided string', () => {

      const mockMarkdown = 'markdown-x';

      spyOn(markdownService, 'precompile');
      spyOn(markdownService.markdownIt, 'render');

      markdownService.compile(mockMarkdown);

      expect(markdownService['precompile']).toHaveBeenCalledWith(mockMarkdown);
    });

    it('should return rendered markdown', () => {

      const mockPrecompiled = 'precompiled-x';
      const mockCompiled = 'compiled-x';

      spyOn(markdownService, 'precompile').and.returnValue(mockPrecompiled);
      spyOn(markdownService.markdownIt, 'render').and.returnValue(mockCompiled);

      const result = markdownService.compile('### Markdown');

      expect(markdownService.markdownIt.render).toHaveBeenCalledWith(mockPrecompiled);
      expect(result).toBe(mockCompiled);
    });
  });

  describe('getSource', () => {

    it('should call http service to get src content', async(() => {

      const mockSrc = 'src-x';

      spyOn(http, 'get').and.returnValue(Observable.of());
      spyOn(markdownService, 'extractData').and.returnValue(mockSrc);

      markdownService
        .getSource(mockSrc)
        .subscribe(result => {
          expect(http.get).toHaveBeenCalledWith(mockSrc);
        });
    }));

    it('should map returned data', async(() => {

      spyOn(markdownService, 'extractData');

      const response = mockBackendResponse(<ResponseOptions>{ body: 'response-text-x' });

      markdownService
        .getSource('src-x')
        .subscribe(responseData => {
          expect(markdownService['extractData']).toHaveBeenCalledWith(response);
        });
    }));

    it('should call handleError when an error occurs', async(() => {

      spyOn(markdownService, 'handleError');

      const error = mockBackendError('error-x');

      markdownService
        .getSource('src-x')
        .subscribe(null, responseError => {
          expect(markdownService['handleError']).toHaveBeenCalledWith(error);
        });
    }));

    it('should add tick for language when src file extension is not .md', async(() => {

      const mockRaw =  'raw-text';

      spyOn(http, 'get').and.returnValue(Observable.of());
      spyOn(markdownService, 'extractData').and.returnValue(mockRaw);

      markdownService
        .getSource('./src-example/file.cpp')
        .subscribe(result => {
          expect(result).toBe('```cpp\n' + mockRaw + '\n```');
        });
    }));

    it('should not add tick for langauge when src file extension is .md', async(() => {

      const mockRaw = 'raw-text';

      spyOn(http, 'get').and.returnValue(Observable.of());
      spyOn(markdownService, 'extractData').and.returnValue(mockRaw);

      markdownService
        .getSource('./src-example/file.md')
        .subscribe(result => {
          expect(result).toBe(mockRaw);
        });
    }));
  });

  describe('highlight', () => {

    it('should not call Prism when not available', () => {

      window['Prism'] = undefined;

      markdownService.highlight();
    });

    it('should call Prism when available', () => {

      window['Prism'] = { highlightAll: () => {} };

      spyOn(window['Prism'], 'highlightAll');

      markdownService.highlight();

      expect(window['Prism'].highlightAll).toHaveBeenCalledWith(false);
    });
  });

  describe('createMarkdownitInstance', () => {

    it('should instantiate markdownit correctly when no options is provided', () => {

      const result = markdownService['createMarkdownitInstance']();

      expect(result).toBeTruthy();
    });

    it('should instantiate markdownit correctly when only preset is provided', () => {

      const markdownOptions: MarkdownOptions = { preset: 'zero' };

      const result = markdownService['createMarkdownitInstance'](markdownOptions);

      expect(result).toBeTruthy();
    });

    it('should instantiate markdownit correctly when only options is provided', () => {

      const markdownOptions: MarkdownOptions = {
        options: {
          html: true,
          linkify: true,
        },
      };

      const result = markdownService['createMarkdownitInstance'](markdownOptions);

      expect(result).toBeTruthy();
    });

    it('should instantiate markdownit correctly when both preset and options are provided', () => {

      const markdownOptions: MarkdownOptions = {
        preset: 'zero',
        options: {
          html: true,
          linkify: true,
        },
      };

      const result = markdownService['createMarkdownitInstance'](markdownOptions);

      expect(result).toBeTruthy();
    });
  });

  describe('extractData', () => {

    it('should return value correctly', () => {

      const reponseText = 'reponse-text-x';
      const responseOptions = new ResponseOptions({ body: reponseText });

      const extractedData = markdownService['extractData'](new Response(responseOptions));

      expect(extractedData).toEqual(reponseText);
    });

    it('should return empty string when no value returned', () => {

      const responseOptions = new ResponseOptions();

      const extractedData = markdownService['extractData'](new Response(responseOptions));

      expect(extractedData).toEqual('');
    });
  });

  describe('handleError', () => {

    it('should format error message correctly when Response', () => {

      const responseOptions = new ResponseOptions({
        body: {
          error: 'error-x',
        },
        status: 200,
        statusText: 'ok',
      });
      const error = new Response(responseOptions);

      spyOn(console, 'error');
      spyOn(Observable, 'create');

      markdownService['handleError'](error);

      expect(console.error).toHaveBeenCalledWith(`${error.status} - ${error.statusText || ''} ${(responseOptions.body as any).error}`);
    });

    it('should write error message in console', () => {

      const error = 'error-x';

      spyOn(console, 'error');
      spyOn(Observable, 'create');

      markdownService['handleError'](error);

      expect(console.error).toHaveBeenCalledWith(error);
    });

    it('should throw observable error', async(() => {

      const error = 'error-x';

      spyOn(console, 'error');
      spyOn(Observable, 'create');

      const observable = markdownService['handleError'](error);

      observable.subscribe(null, () => {
        expect(observable).toEqual(jasmine.any(ErrorObservable));
        expect(observable.error).toBe(error);
      });
    }));
  });

  describe('precompile', () => {

    it('should return empty string when raw is null/undefined/empty', () => {

      expect(markdownService['precompile'](null)).toBe('');
      expect(markdownService['precompile'](undefined)).toBe('');
      expect(markdownService['precompile']('')).toBe('');
    });

    it('should remove leading whitespaces offset while keeping indent', () => {

      const mockRaw =  [
        '',               // wait for line with non-whitespaces
        '  * list',       // find first line with non-whitespaces to set offset
        '    * sub-list', // keep indent while removing from previous row offset
      ];

      const expected = [
        '',
        '* list',
        '  * sub-list',
      ];

      expect(markdownService['precompile'](mockRaw.join('\n'))).toBe(expected.join('\n'));
    });

    it('should return line with indent correctly', () => {

      const mockRaw =  [
        '* list',       // find first line with non-whitespaces to set offset
        '  * sub-list', // keep indent while removing from previous row offset
        '',             // keep blank line
        'Lorem Ipsum',  // keep everthing else
      ];

      const expected = [
        '* list',
        '  * sub-list',
        '',
        'Lorem Ipsum',
      ];

      expect(markdownService['precompile'](mockRaw.join('\n'))).toBe(expected.join('\n'));
    });
  });
});
