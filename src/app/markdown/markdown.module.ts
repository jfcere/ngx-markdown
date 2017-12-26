import { ModuleWithProviders, NgModule, OpaqueToken } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import * as marked from 'marked';

import { LanguagePipe } from './language.pipe';
import { MarkdownComponent } from './markdown.component';
import { MarkdownService } from './markdown.service';

export const MARKED_OPTIONS = new OpaqueToken('marked.options');

export function markdownServiceFactory(http, markedOptions): MarkdownService {
  return new MarkdownService(http, markedOptions);
}

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
        { provide: MARKED_OPTIONS, useValue: markedOptions },
        {
          provide: MarkdownService,
          useFactory: markdownServiceFactory,
          deps: [Http, MARKED_OPTIONS],
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
