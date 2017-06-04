import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { LanguagePipe } from './language.pipe';
import { MarkdownToHtmlComponent } from './markdown-to-html.component';
import { MarkdownToHtmlService } from './markdown-to-html.service';

@NgModule({
  exports: [
    MarkdownToHtmlComponent,
    LanguagePipe,
  ],
  imports: [HttpModule],
  declarations: [
    MarkdownToHtmlComponent,
    LanguagePipe,
  ],
})
export class MarkdownToHtmlModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MarkdownToHtmlModule,
      providers: [MarkdownToHtmlService],
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: MarkdownToHtmlModule,
    };
  }
}
