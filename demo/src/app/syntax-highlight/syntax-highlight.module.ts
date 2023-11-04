import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { ScrollspyNavLayoutModule } from '@shared/scrollspy-nav-layout/scrollspy-nav-layout.module';
import { SyntaxHighlightRoutingModule } from './syntax-highlight-routing.module';
import { SyntaxHighlightComponent } from './syntax-highlight.component';

@NgModule({
  imports: [
    MarkdownModule.forChild(),
    ScrollspyNavLayoutModule,
    SyntaxHighlightRoutingModule,
    SyntaxHighlightComponent,
  ],
})
export class SyntaxHighlightModule { }
