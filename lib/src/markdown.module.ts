import { CommonModule } from '@angular/common';
import { isDevMode, ModuleWithProviders, NgModule, Provider, SecurityContext } from '@angular/core';
// eslint-disable-next-line import/named
import { MarkedExtension } from 'marked';
import { ClipboardButtonComponent } from './clipboard-button.component';
import { LanguagePipe } from './language.pipe';
import { MarkdownComponent } from './markdown.component';
import { MarkdownPipe } from './markdown.pipe';
import { provideMarkdown } from './provide-markdown';

// having a dependency on `HttpClientModule` within a library
// breaks all the interceptors from the app consuming the library
// here, we explicitely ask the user to pass a provider with
// their own instance of `HttpClientModule`
export interface MarkdownModuleConfig {
  loader?: Provider;
  clipboardOptions?: Provider;
  markedOptions?: Provider;
  markedExtensions?: MarkedExtension[];
  sanitize?: SecurityContext;
}

const sharedDeclarations = [
  ClipboardButtonComponent,
  LanguagePipe,
  MarkdownComponent,
  MarkdownPipe,
];

/**
 * @deprecated use provideMarkdown instead
 * */
@NgModule({
  imports: [CommonModule, ...sharedDeclarations],
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

  constructor() {
    if (isDevMode()) {
      console.warn('you should use provideMarkdown instead of MarkdownModule');
    }
  }
}
