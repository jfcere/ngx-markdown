import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MarkdownModule } from 'ngx-markdown';

import { HttpRawLoaderModule } from '@shared/http-raw-loader';
import { ScrollspyNavLayoutModule } from '@shared/scrollspy-nav-layout/scrollspy-nav-layout.module';
import { SharedModule } from '@shared/shared.module';
import { BindingsRoutingModule } from './bindings-routing.module';
import { BindingsComponent } from './bindings.component';

@NgModule({
  imports: [
    BindingsRoutingModule,
    FormsModule,
    HttpRawLoaderModule,
    MarkdownModule.forChild(),
    MatInputModule,
    ScrollspyNavLayoutModule,
    SharedModule,
  ],
  declarations: [BindingsComponent],
})
export class BindingsModule { }
