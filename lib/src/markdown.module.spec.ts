import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, SecurityContext } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { MarkdownModule } from './markdown.module';
import { errorSrcWithoutHttpClient, SECURITY_CONTEXT } from './markdown.service';
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
  src: string | undefined;
}

describe('MarkdownModule', () => {

  describe('forRoot', () => {

    it('should provide HttpClient when MarkdownModuleConfig.loader is provided', () => {

      TestBed.configureTestingModule({
        imports: [
          HttpClientModule,
          MarkdownModule.forRoot({ loader: HttpClient }),
        ],
      });

      const httpClient = TestBed.inject(HttpClient);

      expect(httpClient instanceof HttpClient).toBeTruthy();
    });

    it('should not provide HttpClient when MarkdownModuleConfig is provided without loader', () => {

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

    it('should not provide HttpClient when MarkdownModuleConfig is not provided', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot(),
        ],
      });

      const httpClient = TestBed.inject(HttpClient, null);

      expect(httpClient).toBeNull();
    });

    it('should provide MarkedOptions when MarkdownModuleConfig is provided with markedOptions', () => {

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

    it('should not provide MarkedOptions when MarkdownModuleConfig is provided without markedOptions', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot({ loader: HttpClient }),
        ],
      });

      const markedOptions = TestBed.inject(MarkedOptions, null);

      expect(markedOptions).toBeNull();
    });

    it('should not provide MarkedOptions when MarkdownModuleConfig is not provided', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot(),
        ],
      });

      const markedOptions = TestBed.inject(MarkedOptions, null);

      expect(markedOptions).toBeNull();
    });

    it('should provide SecurityContext when MarkdownModuleConfig is provided with sanitize', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot({ sanitize: SecurityContext.NONE }),
        ],
      });

      const securityContext = TestBed.inject(SECURITY_CONTEXT);

      expect(securityContext).toBe(SecurityContext.NONE);
    });

    it('should provide default SecurityContext when MarkdownModuleConfig is provided without sanitize', () => {

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

      const securityContext = TestBed.inject(SECURITY_CONTEXT);

      expect(securityContext).toBe(SecurityContext.HTML);
    });

    it('should provide default SecurityContext when MarkdownModuleConfig is not provided', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot(),
        ],
      });

      const securityContext = TestBed.inject(SECURITY_CONTEXT);

      expect(securityContext).toBe(SecurityContext.HTML);
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
            sanitize: SecurityContext.NONE,
          }),
          MarkdownModule.forChild(),
        ],
      });

      const httpClient = TestBed.inject(HttpClient);
      const markedOptions = TestBed.inject(MarkedOptions);
      const securityContext = TestBed.inject(SECURITY_CONTEXT);

      expect(httpClient instanceof HttpClient).toBeTruthy();
      expect(markedOptions).toEqual(mockMarkedOptions);
      expect(securityContext).toBe(SecurityContext.NONE);
    });
  });

  describe('without HttpClient', () => {

    beforeEach(waitForAsync(() => {
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

      const title = (fixture.nativeElement as HTMLElement).textContent!.trim();

      expect(title).toEqual('Markdown Title');
    });

    it('should throw an error when using src attribute', () => {

      const fixture = TestBed.createComponent(HostComponent);

      fixture.componentInstance.src = '/some/path/to/file.md';

      expect(() => fixture.detectChanges()).toThrowError(errorSrcWithoutHttpClient);
    });
  });
});
