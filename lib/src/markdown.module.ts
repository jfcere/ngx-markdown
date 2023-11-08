import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Provider, SecurityContext } from '@angular/core';

// eslint-disable-next-line import/named
import { Marked, MarkedExtension } from 'marked';
import { ClipboardButtonComponent } from './clipboard-button.component';
import { LanguagePipe } from './language.pipe';
import { MARKED_EXTENSIONS } from './markdown-extensions';
import { MarkdownComponent } from './markdown.component';
import { MarkdownPipe } from './markdown.pipe';
import { MarkdownService, SECURITY_CONTEXT } from './markdown.service';
import { ɵMARKED } from './marked';

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
        markdownModuleConfig?.loader ?? [],
        markdownModuleConfig?.clipboardOptions ?? [],
        markdownModuleConfig?.markedOptions ?? [],
        {
          provide: MARKED_EXTENSIONS,
          useValue: markdownModuleConfig?.markedExtensions ?? [],
        },
        {
          provide: SECURITY_CONTEXT,
          useValue: markdownModuleConfig?.sanitize ?? SecurityContext.HTML,
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
