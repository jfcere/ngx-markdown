import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { MarkdownToHtmlComponent } from './markdown-to-html.component';
import { MarkdownToHtmlService } from './markdown-to-html.service';

@NgModule({
  exports: [MarkdownToHtmlComponent],
  imports: [HttpModule],
  declarations: [MarkdownToHtmlComponent],
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
