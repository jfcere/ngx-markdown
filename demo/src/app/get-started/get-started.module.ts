import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { ScrollspyNavLayoutModule } from '@shared/scrollspy-nav-layout/scrollspy-nav-layout.module';
import { SharedModule } from '@shared/shared.module';
import { GetStartedRoutingModule } from './get-started-routing.module';
import { GetStartedComponent } from './get-started.component';

@NgModule({
  imports: [
    GetStartedRoutingModule,
    MarkdownModule.forChild(),
    ScrollspyNavLayoutModule,
    SharedModule,
    GetStartedComponent,
  ],
})
export class GetStartedModule {}
