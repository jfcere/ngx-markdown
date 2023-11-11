import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MarkdownModule } from 'ngx-markdown';
import { ScrollspyNavLayoutModule } from '@shared/scrollspy-nav-layout/scrollspy-nav-layout.module';
import { SharedModule } from '@shared/shared.module';
import { RerenderRoutingModule } from './rerender-routing.module';
import { RerenderComponent } from './rerender.component';

@NgModule({
  imports: [
    FormsModule,
    MarkdownModule.forChild(),
    MatInputModule,
    RerenderRoutingModule,
    ScrollspyNavLayoutModule,
    SharedModule,
    RerenderComponent,
  ],
})
export class RerenderModule {}
