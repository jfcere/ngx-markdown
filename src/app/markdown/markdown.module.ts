import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import * as marked from 'marked';

import { LanguagePipe } from './language.pipe';
import { MarkdownComponent } from './markdown.component';
import { MarkdownPipe } from './markdown.pipe';
import { MarkdownService } from './markdown.service';
import { MarkedOptions } from './marked-options';

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

@NgModule({
  imports: [HttpClientModule],
  exports: [
    LanguagePipe,
    MarkdownComponent,
    MarkdownPipe,
  ],
  declarations: [
    LanguagePipe,
    MarkdownComponent,
    MarkdownPipe,
  ],
})
export class MarkdownModule {
  static forRoot(markedOptions?: Provider): ModuleWithProviders {
    return {
      ngModule: MarkdownModule,
      providers: [
        MarkdownService,
        markedOptions || initialMarkedOptions,
      ],
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: MarkdownModule,
    };
  }
}
