import { ModuleWithProviders, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import * as marked from 'marked';

import { LanguagePipe } from './language.pipe';
import { MarkdownComponent } from './markdown.component';
import { MarkdownPipe } from './markdown.pipe';
import { MarkdownService } from './markdown.service';
import { MarkedOptionsToken } from './marked-options.token';

@NgModule({
  imports: [HttpModule],
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
  static forRoot(markedOptions?: marked.MarkedOptions): ModuleWithProviders {
    return {
      ngModule: MarkdownModule,
      providers: [
        { provide: MarkedOptionsToken, useValue: markedOptions },
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
