import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { ScrollspyNavLayoutModule } from '@shared/scrollspy-nav-layout/scrollspy-nav-layout.module';
import { SharedModule } from '@shared/shared.module';
import { IntroductionRoutingModule } from './introduction-routing.module';
import { IntroductionComponent } from './introduction.component';

@NgModule({
  imports: [
    IntroductionRoutingModule,
    MarkdownModule.forChild(),
    ScrollspyNavLayoutModule,
    SharedModule,
  ],
  declarations: [IntroductionComponent],
})
export class IntroductionModule { }
