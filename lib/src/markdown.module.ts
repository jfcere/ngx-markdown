import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Provider, SecurityContext } from '@angular/core';
// eslint-disable-next-line import/named
import { Marked, MarkedExtension } from 'marked';
import { ClipboardButtonComponent } from './clipboard-button.component';
import { LanguagePipe } from './language.pipe';
import { MARKDOWN_EXTENSIONS } from './markdown-extensions';
import { MarkdownComponent } from './markdown.component';
import { MarkdownPipe } from './markdown.pipe';
import { MarkdownService, SECURITY_CONTEXT } from './markdown.service';
import { ɵMARKED } from './marked';

// having a dependency on `HttpClientModule` within a library
// breaks all the interceptors from the app consuming the library
// here, we explicitely ask the user to pass a provider with
// their own instance of `HttpClientModule`
export interface MarkdownModuleConfig {
  clipboardOptions?: Provider;
  markedOptions?: Provider;
  sanitize?: SecurityContext;
  extensions?: MarkedExtension[];
}

const sharedDeclarations = [
  ClipboardButtonComponent,
  LanguagePipe,
  MarkdownComponent,
  MarkdownPipe,
];

@NgModule({
  imports: [CommonModule],
  exports: sharedDeclarations,
  declarations: sharedDeclarations,
})
export class MarkdownModule {
  static forRoot(markdownModuleConfig?: MarkdownModuleConfig): ModuleWithProviders<MarkdownModule> {
    return {
      ngModule: MarkdownModule,
      providers: [
        MarkdownService,
        markdownModuleConfig && markdownModuleConfig.clipboardOptions || [],
        markdownModuleConfig && markdownModuleConfig.markedOptions || [],
        {
          provide: SECURITY_CONTEXT,
          useValue: markdownModuleConfig && markdownModuleConfig.sanitize != null
            ? markdownModuleConfig.sanitize
            : SecurityContext.HTML,
        },
        {
          provide: MARKDOWN_EXTENSIONS,
          useValue: markdownModuleConfig?.extensions ?? [],
        },
        {
          provide: ɵMARKED,
          useValue: Marked,
        },
      ],
    };
  }

  static forChild(): ModuleWithProviders<MarkdownModule> {
    return {
      ngModule: MarkdownModule,
    };
  }
}
