import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MarkdownModule } from 'ngx-markdown';
import { ScrollspyNavLayoutModule } from '@shared/scrollspy-nav-layout/scrollspy-nav-layout.module';
import { RerenderRoutingModule } from './rerender-routing.module';
import { RerenderComponent } from './rerender.component';

@NgModule({
  imports: [
    FormsModule,
    MarkdownModule.forChild(),
    MatInputModule,
    RerenderRoutingModule,
    ScrollspyNavLayoutModule,
    RerenderComponent,
  ],
})
export class RerenderModule { }
