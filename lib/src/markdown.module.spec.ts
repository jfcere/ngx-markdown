import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { initialMarkedOptions, MarkdownModule } from './markdown.module';
import { errorSrcWithoutHttpClient } from './markdown.service';
import { MarkedOptions } from './marked-options';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'host-comp',
  template: `
    <div *ngIf="src; else dataTemplate">
      <markdown [src]="src"></markdown>
    </div>

    <ng-template #dataTemplate>
      <markdown [data]="markdown"></markdown>
    </ng-template>
  `,
})
class HostComponent {
  markdown = '# Markdown Title';
  src: string;
}

describe('MarkdownModule', () => {

  describe('forRoot', () => {

    it('should provide HttpClientModule when MarkdownModuleConfig.loader is provided', () => {

      TestBed.configureTestingModule({
        imports: [
          HttpClientModule,
          MarkdownModule.forRoot({ loader: HttpClient }),
        ],
      });

      const httpClient = TestBed.inject(HttpClient);

      expect(httpClient instanceof HttpClient).toBeTruthy();
    });

    it('should not provide HttpClientModule when MarkdownModuleConfig.loader is not provided', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot(),
        ],
      });

      const httpClient = TestBed.inject(HttpClient, null);

      expect(httpClient).toBeNull();
    });

    it('should not provide HttpClientModule when MarkdownModuleConfig.markedOptions is provided', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot({
            markedOptions: {
              provide: MarkedOptions,
              useValue: 'mockMarkedOptions',
            },
          }),
        ],
      });

      const httpClient = TestBed.inject(HttpClient, null);

      expect(httpClient).toBeNull();
    });

    it('should provide marked options when provided', () => {

      const mockMarkedOptions: MarkedOptions = { baseUrl: 'mock' };

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot({
            markedOptions: {
              provide: MarkedOptions,
              useValue: mockMarkedOptions,
            },
          }),
        ],
      });

      const markedOptions = TestBed.inject(MarkedOptions);

      expect(markedOptions).toBe(mockMarkedOptions);
    });

    it('should provide default marked options when not provided', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot(),
        ],
      });

      const markedOptions = TestBed.inject(MarkedOptions);

      expect(markedOptions).toEqual(initialMarkedOptions['useValue']);
    });

    it('should provide default marked options when loader is provided provided', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot({ loader: HttpClient }),
        ],
      });

      const markedOptions = TestBed.inject(MarkedOptions);

      expect(markedOptions).toEqual(initialMarkedOptions['useValue']);
    });
  });

  describe('forChild', () => {

    it('should not provide any providers', () => {

      const forChildModule = MarkdownModule.forChild();

      expect(forChildModule.providers).toBeUndefined();
    });

    it('should inherit from forRoot providers', () => {

      const mockMarkedOptions: MarkedOptions = { baseUrl: 'mock' };

      TestBed.configureTestingModule({
        imports: [
          HttpClientModule,
          MarkdownModule.forRoot({
            loader: HttpClient,
            markedOptions: { provide: MarkedOptions, useValue: mockMarkedOptions },
          }),
          MarkdownModule.forChild(),
        ],
      });

      const httpClient = TestBed.inject(HttpClient);
      const markedOptions = TestBed.inject(MarkedOptions);

      expect(httpClient instanceof HttpClient).toBeTruthy();
      expect(markedOptions).toEqual(mockMarkedOptions);
    });
  });

  describe('without HttpClient', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          MarkdownModule.forRoot(),
        ],
        declarations: [HostComponent],
      }).compileComponents();
    }));

    it('should render the markdown if not passing src attribute', () => {

      const fixture = TestBed.createComponent(HostComponent);

      fixture.detectChanges();

      const title = (fixture.nativeElement as HTMLElement).textContent.trim();

      expect(title).toEqual('Markdown Title');
    });

    it('should throw an error when using src attribute', () => {

      const fixture = TestBed.createComponent(HostComponent);

      fixture.componentInstance.src = '/some/path/to/file.md';

      expect(() => fixture.detectChanges()).toThrowError(errorSrcWithoutHttpClient);
    });
  });
});
