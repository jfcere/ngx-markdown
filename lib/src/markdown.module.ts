import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Provider, SecurityContext } from '@angular/core';

import { ClipboardButtonComponent } from './clipboard-button.component';
import { LanguagePipe } from './language.pipe';
import { MarkdownComponent } from './markdown.component';
import { MarkdownPipe } from './markdown.pipe';
import { MarkdownService, SECURITY_CONTEXT } from './markdown.service';

// having a dependency on `HttpClientModule` within a library
// breaks all the interceptors from the app consuming the library
// here, we explicitely ask the user to pass a provider with
// their own instance of `HttpClientModule`
export interface MarkdownModuleConfig {
  loader?: Provider;
  clipboardOptions?: Provider;
  markedOptions?: Provider;
  sanitize?: SecurityContext;
}

const sharedDeclarations = [
  ClipboardButtonComponent,
  LanguagePipe,
  MarkdownComponent,
  MarkdownPipe,
];

const sharedEntryComponents = [
  ClipboardButtonComponent,
];

@NgModule({
  imports: [CommonModule],
  exports: sharedDeclarations,
  declarations: sharedDeclarations,
  entryComponents: sharedEntryComponents,
})
export class MarkdownModule {
  static forRoot(markdownModuleConfig?: MarkdownModuleConfig): ModuleWithProviders<MarkdownModule> {
    return {
      ngModule: MarkdownModule,
      providers: [
        MarkdownService,
        markdownModuleConfig && markdownModuleConfig.loader || [],
        markdownModuleConfig && markdownModuleConfig.clipboardOptions || [],
        markdownModuleConfig && markdownModuleConfig.markedOptions || [],
        {
          provide: SECURITY_CONTEXT,
          useValue: markdownModuleConfig && markdownModuleConfig.sanitize != null
            ? markdownModuleConfig.sanitize
            : SecurityContext.HTML,
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
