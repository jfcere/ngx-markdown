import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { LanguagePipe } from './language.pipe';
import { MarkdownComponent } from './markdown.component';
import { MarkdownService } from './markdown.service';

@NgModule({
  exports: [
    MarkdownComponent,
    LanguagePipe,
  ],
  imports: [HttpModule],
  declarations: [
    MarkdownComponent,
    LanguagePipe,
  ],
})
export class MarkdownModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MarkdownModule,
      providers: [MarkdownService],
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: MarkdownModule,
    };
  }
}
