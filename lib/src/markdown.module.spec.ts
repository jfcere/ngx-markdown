import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, SecurityContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ClipboardOptions } from './clipboard-options';
import { MarkdownModule } from './markdown.module';
import { errorSrcWithoutHttpClient, SECURITY_CONTEXT } from './markdown.service';
import { MarkedOptions } from './marked-options';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
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

    it('should provide ClipboardOptions when MarkdownModuleConfig is provided with clipboardOptions', () => {

      const mockClipboardOptions: ClipboardOptions = { buttonComponent: class mockClipboardButtonComponent {} };

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot({
            clipboardOptions: {
              provide: ClipboardOptions,
              useValue: mockClipboardOptions,
            },
          }),
        ],
      });

      const clipboardOptions = TestBed.inject(ClipboardOptions);

      expect(clipboardOptions).toBe(mockClipboardOptions);
    });

    it('should not provide ClipboardOptions when MarkdownModuleConfig is provided without clipboardOptions', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot({ loader: HttpClient }),
        ],
      });

      const clipboardOptions = TestBed.inject(ClipboardOptions, null);

      expect(clipboardOptions).toBeNull();
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
      const mockClipboardOptions: ClipboardOptions = { buttonComponent: class mockClipboardButtonComponent {} };

      TestBed.configureTestingModule({
        imports: [
          HttpClientModule,
          MarkdownModule.forRoot({
            loader: HttpClient,
            clipboardOptions: { provide: ClipboardOptions, useValue: mockClipboardOptions },
            markedOptions: { provide: MarkedOptions, useValue: mockMarkedOptions },
            sanitize: SecurityContext.NONE,
          }),
          MarkdownModule.forChild(),
        ],
      });

      const httpClient = TestBed.inject(HttpClient);
      const clipboardOptions = TestBed.inject(ClipboardOptions);
      const markedOptions = TestBed.inject(MarkedOptions);
      const securityContext = TestBed.inject(SECURITY_CONTEXT);

      expect(httpClient instanceof HttpClient).toBeTruthy();
      expect(clipboardOptions).toEqual(mockClipboardOptions);
      expect(markedOptions).toEqual(mockMarkedOptions);
      expect(securityContext).toBe(SecurityContext.NONE);
    });
  });

  describe('without HttpClient', () => {

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          CommonModule,
          MarkdownModule.forRoot(),
        ],
        declarations: [HostComponent],
      }).compileComponents();
    });

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
