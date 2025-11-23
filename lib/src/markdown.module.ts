import { InjectionToken, ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { ClipboardButtonComponent } from './clipboard-button.component';
import { CLIPBOARD_OPTIONS } from './clipboard-options';
import { LanguagePipe } from './language.pipe';
import { MarkdownComponent } from './markdown.component';
import { MarkdownPipe } from './markdown.pipe';
import { MARKED_EXTENSIONS } from './marked-extensions';
import { MARKED_OPTIONS } from './marked-options';
import { MERMAID_OPTIONS } from './mermaid-options';
import { provideMarkdown } from './provide-markdown';
import { SANITIZE } from './sanitize-options';

type InjectionTokenType<T extends InjectionToken<any>> = T extends InjectionToken<infer R> ? R : unknown;

interface TypedValueProvider<T extends InjectionToken<any>> {
  provide: T;
  useValue: InjectionTokenType<T>;
};

interface TypedFactoryProvider<T extends InjectionToken<any>> {
  provide: T;
  useFactory: (...args: any[]) => InjectionTokenType<T>;
  deps?: any[];
};

type TypedProvider<T extends InjectionToken<any>> = TypedValueProvider<T> | TypedFactoryProvider<T>;

type MultiTypedProvider<T extends InjectionToken<any>> = TypedProvider<T> & { multi: true };

// having a dependency on `HttpClientModule` within a library
// breaks all the interceptors from the app consuming the library
// here, we explicitely ask the user to pass a provider with
// their own instance of `HttpClientModule`
export interface MarkdownModuleConfig {
  loader?: Provider;
  clipboardOptions?: TypedProvider<typeof CLIPBOARD_OPTIONS>;
  markedOptions?: TypedProvider<typeof MARKED_OPTIONS>;
  markedExtensions?: MultiTypedProvider<typeof MARKED_EXTENSIONS>[];
  mermaidOptions?: TypedProvider<typeof MERMAID_OPTIONS>;
  sanitize?: TypedProvider<typeof SANITIZE>;
}

const sharedDeclarations = [
  ClipboardButtonComponent,
  LanguagePipe,
  MarkdownComponent,
  MarkdownPipe,
];

@NgModule({
  imports: sharedDeclarations,
  exports: sharedDeclarations,
})
export class MarkdownModule {
  static forRoot(markdownModuleConfig?: MarkdownModuleConfig): ModuleWithProviders<MarkdownModule> {
    return {
      ngModule: MarkdownModule,
      providers: [
        provideMarkdown(markdownModuleConfig),
      ],
    };
  }

  static forChild(): ModuleWithProviders<MarkdownModule> {
    return {
      ngModule: MarkdownModule,
    };
  }
}
