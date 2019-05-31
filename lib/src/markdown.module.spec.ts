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
  markdown = '# Super title';
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

      const httpClient = TestBed.get(HttpClient);

      expect(httpClient instanceof HttpClient).toBeTruthy();
    });

    it('should not provide HttpClientModule when MarkdownModuleConfig.loader is not provided', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot(),
        ],
      });

      const httpClient = TestBed.get(HttpClient, null);

      expect(httpClient).toEqual(null);
    });

    it('should not provide HttpClientModule when MarkdownModuleConfig.markedOptions is provided', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot({
            markedOptions: {
              provide: MarkedOptions,
              useValue: { gfm: false },
            },
          }),
        ],
      });

      const httpClient = TestBed.get(HttpClient, null);

      expect(httpClient).toEqual(null);
    });

    it('should provide marked options when provided', () => {

      expect(initialMarkedOptions['useValue'].gfm).toBeTruthy();

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot({
            markedOptions: {
              provide: MarkedOptions,
              useValue: { gfm: false },
            },
          }),
        ],
      });

      const markedOptions = TestBed.get(MarkedOptions);

      expect(markedOptions.gmf).toBeFalsy();
    });

    it('should provide default marked options when not provided', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot(),
        ],
      });

      const markedOptions = TestBed.get(MarkedOptions);

      expect(markedOptions).toEqual(initialMarkedOptions['useValue']);
    });

    it('should provide default marked options when loader is provided provided', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot({ loader: HttpClient }),
        ],
      });

      const markedOptions = TestBed.get(MarkedOptions);

      expect(markedOptions).toEqual(initialMarkedOptions['useValue']);
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

      expect(title).toEqual('Super title');
    });

    it('should throw an error when using src attribute', () => {

      const fixture = TestBed.createComponent(HostComponent);

      fixture.componentInstance.src = '/some/path/to/file.md';

      expect(() => fixture.detectChanges()).toThrowError(errorSrcWithoutHttpClient);
    });
  });
});
