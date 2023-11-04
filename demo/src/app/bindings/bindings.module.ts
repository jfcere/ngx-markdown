import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MarkdownModule } from 'ngx-markdown';
import { ScrollspyNavLayoutModule } from '@shared/scrollspy-nav-layout/scrollspy-nav-layout.module';
import { BindingsRoutingModule } from './bindings-routing.module';
import { BindingsComponent } from './bindings.component';

@NgModule({
  imports: [
    BindingsRoutingModule,
    FormsModule,
    MarkdownModule.forChild(),
    MatInputModule,
    ScrollspyNavLayoutModule,
    BindingsComponent,
  ],
})
export class BindingsModule { }
