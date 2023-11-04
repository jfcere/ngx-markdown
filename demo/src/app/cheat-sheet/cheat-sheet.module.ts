import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { ScrollspyNavLayoutModule } from '@shared/scrollspy-nav-layout/scrollspy-nav-layout.module';
import { CheatSheetRoutingModule } from './cheat-sheet-routing.module';
import { CheatSheetComponent } from './cheat-sheet.component';

@NgModule({
  imports: [
    CheatSheetRoutingModule,
    MarkdownModule.forChild(),
    ScrollspyNavLayoutModule,
    CheatSheetComponent,
  ],
})
export class CheatSheetModule { }
