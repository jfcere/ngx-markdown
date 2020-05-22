import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { ScrollspyNavLayoutModule } from '@shared/scrollspy-nav-layout/scrollspy-nav-layout.module';
import { SharedModule } from '@shared/shared.module';
import { SyntaxHighlightRoutingModule } from './syntax-highlight-routing.module';
import { SyntaxHighlightComponent } from './syntax-highlight.component';

@NgModule({
  imports: [
    MarkdownModule.forChild(),
    ScrollspyNavLayoutModule,
    SharedModule,
    SyntaxHighlightRoutingModule,
  ],
  declarations: [SyntaxHighlightComponent],
})
export class SyntaxHighlightModule { }
