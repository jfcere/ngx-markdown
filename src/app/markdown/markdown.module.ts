import { ModuleWithProviders, NgModule, OpaqueToken } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import * as marked from 'marked';

import { LanguagePipe } from './language.pipe';
import { MarkdownComponent } from './markdown.component';
import { MarkdownService } from './markdown.service';

export const MARKED_OPTIONS = new OpaqueToken('marked.options');

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
        MarkdownService,
      ],
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: MarkdownModule,
    };
  }
}
