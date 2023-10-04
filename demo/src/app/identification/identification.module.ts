import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MarkdownModule } from 'ngx-markdown';

import { ScrollspyNavLayoutModule } from '@shared/scrollspy-nav-layout/scrollspy-nav-layout.module';
import { SharedModule } from '@shared/shared.module';
import { IdentificationRoutingModule } from './identification-routing.module';
import { IdentificationComponent } from './identification.component';

@NgModule({
  imports: [
    FormsModule,
    MarkdownModule.forChild(),
    MatInputModule,
    IdentificationRoutingModule,
    ScrollspyNavLayoutModule,
    SharedModule,
  ],
  declarations: [IdentificationComponent],
})
export class IdentificationModule { }
