import { ModuleWithProviders, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import * as marked from 'marked';

import { LanguagePipe } from './language.pipe';
import { MarkdownComponent } from './markdown.component';
import { MarkdownService, markdownServiceFactory } from './markdown.service';

@NgModule({
  imports: [HttpModule],
  exports: [
    LanguagePipe,
    MarkdownComponent,
  ],
  declarations: [
    LanguagePipe,
    MarkdownComponent,
  ],
})
export class MarkdownModule {
  static forRoot(markedOptions?: marked.MarkedOptions): ModuleWithProviders {
    return {
      ngModule: MarkdownModule,
      providers: [
        {
          provide: MarkdownService,
          useFactory: (http) => markdownServiceFactory(http, markedOptions),
          deps: [Http],
        },
      ],
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: MarkdownModule,
    };
  }
}
