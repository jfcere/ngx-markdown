import { HttpClient, HttpClientModule } from '@angular/common/http';
import { createEnvironmentInjector, EnvironmentInjector, EnvironmentProviders, Provider, SecurityContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MarkedExtension } from 'marked';
import { CLIPBOARD_OPTIONS, ClipboardOptions } from './clipboard-options';
import { MARKED_EXTENSIONS } from './marked-extensions';
import { MARKED_OPTIONS, MarkedOptions } from './marked-options';
import { provideMarkdown } from './provide-markdown';
import { SANITIZE } from './sanitize-options';

describe('provideMarkdown', () => {

  function createInjectorForProviders(providers: (Provider | EnvironmentProviders)[]): EnvironmentInjector {
    const parentInjector = undefined as unknown as EnvironmentInjector;
    return createEnvironmentInjector(providers, parentInjector);
  }

  it('should provide HttpClient when config.loader is provided', () => {

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        provideMarkdown({ loader: HttpClient }),
      ],
    });

    const httpClient = TestBed.inject(HttpClient);

    expect(httpClient instanceof HttpClient).toBeTruthy();
  });

  it('should not provide HttpClient when config is provided without loader', () => {

    const injector = createInjectorForProviders([
      provideMarkdown({
        markedOptions: {
          provide: MARKED_OPTIONS,
          useValue: {},
        },
      }),
    ]);

    const httpClient = injector.get(HttpClient, null, { optional: true });

    expect(httpClient).toBeNull();
  });

  it('should not provide HttpClient when config is not provided', () => {

    const injector = createInjectorForProviders([
      provideMarkdown(),
    ]);

    const httpClient = injector.get(HttpClient, null, { optional: true });

    expect(httpClient).toBeNull();
  });

  it('should provide ClipboardOptions when config is provided with clipboardOptions', () => {

    const mockClipboardOptions: ClipboardOptions = { buttonComponent: class mockClipboardButtonComponent {} };

    TestBed.configureTestingModule({
      providers: [
        provideMarkdown({
          clipboardOptions: {
            provide: CLIPBOARD_OPTIONS,
            useValue: mockClipboardOptions,
          },
        }),
      ],
    });

    const clipboardOptions = TestBed.inject(CLIPBOARD_OPTIONS);

    expect(clipboardOptions).toEqual(mockClipboardOptions);
  });

  it('should not provide ClipboardOptions when config is provided without clipboardOptions', () => {

    TestBed.configureTestingModule({
      providers: [
        provideMarkdown({ loader: HttpClient }),
      ],
    });

    const clipboardOptions = TestBed.inject(CLIPBOARD_OPTIONS, null, { optional: true });

    expect(clipboardOptions).toBeNull();
  });

  it('should provide MarkedOptions when config is provided with markedOptions', () => {

    const mockMarkedOptions: MarkedOptions = { breaks: true, gfm: false };

    TestBed.configureTestingModule({
      providers: [
        provideMarkdown({
          markedOptions: {
            provide: MARKED_OPTIONS,
            useValue: mockMarkedOptions,
          },
        }),
      ],
    });

    const markedOptions = TestBed.inject(MARKED_OPTIONS);

    expect(markedOptions).toEqual(mockMarkedOptions);
  });

  it('should not provide MarkedOptions when config is provided without markedOptions', () => {

    TestBed.configureTestingModule({
      providers: [
        provideMarkdown({ loader: HttpClient }),
      ],
    });

    const markedOptions = TestBed.inject(MARKED_OPTIONS, null, { optional: true });

    expect(markedOptions).toBeNull();
  });

  it('should not provide MarkedOptions when config is not provided', () => {

    TestBed.configureTestingModule({
      providers: [
        provideMarkdown(),
      ],
    });

    const markedOptions = TestBed.inject(MARKED_OPTIONS, null, { optional: true });

    expect(markedOptions).toBeNull();
  });

  it('should provide MarkedExtensions when config is provided with markedExtension providers', () => {
    const mockExtensionOne = { name: 'mock-extension-one' } as MarkedExtension;
    const mockExtensionTwo = { name: 'mock-extension-two' } as MarkedExtension;

    TestBed.configureTestingModule({
      providers: [
        provideMarkdown({
          markedExtensions: [
            {
              provide: MARKED_EXTENSIONS,
              useValue: mockExtensionOne,
              multi: true,
            },
            {
              provide: MARKED_EXTENSIONS,
              useFactory: () => mockExtensionTwo,
              multi: true,
            },
          ],
        }),
      ],
    });

    const markedExtensions = TestBed.inject<MarkedExtension[]>(MARKED_EXTENSIONS);

    expect(markedExtensions).toEqual([mockExtensionOne, mockExtensionTwo]);
  });

  it('should provide null when config is provided without markedExtensions', () => {

    TestBed.configureTestingModule({
      providers: [
        provideMarkdown({
          markedOptions: {
            provide: MARKED_OPTIONS,
            useValue: {},
          },
        }),
      ],
    });

    const markedExtensions = TestBed.inject<MarkedExtension[]>(MARKED_EXTENSIONS, null, { optional: true });

    expect(markedExtensions).toBeNull();
  });

  it('should provide null when config is not provided', () => {

    TestBed.configureTestingModule({
      providers: [
        provideMarkdown(),
      ],
    });

    const markedExtensions = TestBed.inject<MarkedExtension[]>(MARKED_EXTENSIONS, null, { optional: true });

    expect(markedExtensions).toBeNull();
  });

  it('should provide SecurityContext when config is provided with sanitize', () => {

    TestBed.configureTestingModule({
      providers: [
        provideMarkdown({ sanitize: { provide: SANITIZE, useValue: SecurityContext.NONE } }),
      ],
    });

    const sanitize = TestBed.inject(SANITIZE);

    expect(sanitize).toBe(SecurityContext.NONE);
  });

  it('should not provide SecurityContext when config is provided without sanitize', () => {

    TestBed.configureTestingModule({
      providers: [
        provideMarkdown({
          markedOptions: {
            provide: MARKED_OPTIONS,
            useValue: {},
          },
        }),
      ],
    });

    const sanitize = TestBed.inject(SANITIZE, null, { optional: true });

    expect(sanitize).toBeNull();
  });

  it('should not provide SecurityContext when config is not provided', () => {

    TestBed.configureTestingModule({
      providers: [
        provideMarkdown(),
      ],
    });

    const sanitize = TestBed.inject(SANITIZE, null, { optional: true });

    expect(sanitize).toBeNull();
  });
});
