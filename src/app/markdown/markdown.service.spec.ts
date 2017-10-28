import { async, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { MarkdownService } from './markdown.service';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { AnonymousSubject } from 'rxjs/Subject';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

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
      ],
    });
  });

  beforeEach(() => {
    http = TestBed.get(Http);
    markdownService = TestBed.get(MarkdownService);
    mockBackend = TestBed.get(MockBackend);
  });

  describe('getSource', () => {

    it('should call http service to get src content', () => {

      spyOn(http, 'get').and.returnValue(Observable.of());

      const mockSrc = 'src-x';

      markdownService.getSource(mockSrc);

      expect(http.get).toHaveBeenCalledWith(mockSrc);
    });

    it('should map returned data', async(() => {

      spyOn(markdownService, 'extractData');

      const response = mockBackendResponse(<ResponseOptions>{ body: 'response-text-x' });

      const observable = markdownService.getSource('src-x');

      observable.subscribe(responseData => {
        expect(markdownService.extractData).toHaveBeenCalledWith(response, jasmine.any(Number));
      });
    }));

    it('should call handleError when an error occurs', async(() => {

      spyOn(markdownService, 'handleError');

      const error = mockBackendError('error-x');

      const observable = markdownService.getSource('src-x');

      observable.subscribe(null, responseError => {
        expect(markdownService.handleError).toHaveBeenCalledWith(error, jasmine.any(AnonymousSubject));
      });
    }));
  });

  describe('extractData', () => {

    it('should return value correctly', () => {

      const reponseText = 'reponse-text-x';
      const responseOptions = new ResponseOptions({ body: reponseText });

      const extractedData = markdownService.extractData(new Response(responseOptions));

      expect(extractedData).toEqual(reponseText);
    });

    it('should return empty string when no value returned', () => {

      const responseOptions = new ResponseOptions();

      const extractedData = markdownService.extractData(new Response(responseOptions));

      expect(extractedData).toEqual('');
    });
  });

  describe('handleError', () => {

    it('should write error message in console', () => {

      const error = 'error-x';

      spyOn(console, 'error');
      spyOn(Observable, 'create');

      markdownService.handleError(error);

      expect(console.error).toHaveBeenCalledWith(error);
    });

    it('should throw observable error', async(() => {

      const error = 'error-x';

      spyOn(console, 'error');
      spyOn(Observable, 'create');

      const observable = markdownService.handleError(error);

      observable.subscribe(null, () => {
        expect(observable).toEqual(jasmine.any(ErrorObservable));
        expect(observable.error).toBe(error);
      });
    }));
  });
});
