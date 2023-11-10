import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { HttpRawLoaderModule } from '@shared/http-raw-loader';
import { ScrollspyNavLayoutModule } from '@shared/scrollspy-nav-layout/scrollspy-nav-layout.module';
import { SharedModule } from '@shared/shared.module';
import { CheatSheetRoutingModule } from './cheat-sheet-routing.module';
import { CheatSheetComponent } from './cheat-sheet.component';

@NgModule({
  imports: [
    CheatSheetRoutingModule,
    HttpRawLoaderModule,
    MarkdownModule.forChild(),
    ScrollspyNavLayoutModule,
    SharedModule,
  ],
  declarations: [CheatSheetComponent],
})
export class CheatSheetModule { }
