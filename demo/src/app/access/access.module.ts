import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { ScrollspyNavLayoutModule } from '@shared/scrollspy-nav-layout/scrollspy-nav-layout.module';
import { SharedModule } from '@shared/shared.module';
import { AccessRoutingModule } from './access-routing.module';
import { AccessComponent } from './access.component';

@NgModule({
  imports: [
    MarkdownModule.forChild(),
    ScrollspyNavLayoutModule,
    SharedModule,
    AccessRoutingModule,
  ],
  declarations: [AccessComponent],
})
export class AccessModule { }
