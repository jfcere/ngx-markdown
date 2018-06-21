import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import { LanguagePipe } from './language.pipe';
import { MarkdownComponent } from './markdown.component';
import { MarkdownPipe } from './markdown.pipe';
import { MarkdownService } from './markdown.service';
import { MarkedOptions } from './marked-options';

// having a dependency on `HttpClientModule` within a library
// breaks all the interceptors from the app consuming the library
// here, we explicitely ask the user to pass a provider with
// their own instance of `HttpClientModule`
export interface MarkdownModuleConfig {
  loader?: Provider;
  markedOptions?: Provider;
}

export const initialMarkedOptions: Provider = {
  provide: MarkedOptions,
  useValue: {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  },
};

const sharedDeclarations = [
  LanguagePipe,
  MarkdownComponent,
  MarkdownPipe,
];

@NgModule({
  exports: [
    ...sharedDeclarations,
  ],
  declarations: [
    ...sharedDeclarations,
  ],
})
export class MarkdownModule {
  static forRoot(markdownModuleConfig?: MarkdownModuleConfig): ModuleWithProviders {
    return {
      ngModule: MarkdownModule,
      providers: [
        MarkdownService,
        ...(markdownModuleConfig
          ? [
              markdownModuleConfig.loader || [],
              markdownModuleConfig.markedOptions || initialMarkedOptions,
            ]
          : [initialMarkedOptions]),
      ],
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: MarkdownModule,
    };
  }
}
