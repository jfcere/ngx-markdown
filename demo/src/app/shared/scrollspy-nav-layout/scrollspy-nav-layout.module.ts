import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MarkdownModule } from 'ngx-markdown';

import { ScrollspyNavModule } from '@shared/scrollspy-nav/scrollspy-nav.module';
import { ScrollspyNavLayoutComponent } from './scrollspy-nav-layout.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MarkdownModule,
    MatButtonModule,
    MatDividerModule,
    ScrollspyNavModule,
  ],
  declarations: [ScrollspyNavLayoutComponent],
  exports: [ScrollspyNavLayoutComponent],
})
export class ScrollspyNavLayoutModule { }
