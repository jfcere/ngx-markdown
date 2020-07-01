import { ModuleWithProviders, NgModule, Provider, SecurityContext } from '@angular/core';

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
  markedOptions?: Provider;
  sanitize?: SecurityContext;
}

const sharedDeclarations = [
  LanguagePipe,
  MarkdownComponent,
  MarkdownPipe,
];

@NgModule({
  exports: sharedDeclarations,
  declarations: sharedDeclarations,
})
export class MarkdownModule {
  static forRoot(markdownModuleConfig?: MarkdownModuleConfig): ModuleWithProviders<MarkdownModule> {
    return {
      ngModule: MarkdownModule,
      providers: [
        MarkdownService,
        markdownModuleConfig && markdownModuleConfig.loader || [],
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
