import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MarkdownModule } from 'ngx-markdown';

import { ScrollspyNavLayoutModule } from '@shared/scrollspy-nav-layout/scrollspy-nav-layout.module';
import { SharedModule } from '@shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';

@NgModule({
  imports: [
    AuthenticationRoutingModule,
    FormsModule,
    MarkdownModule.forChild(),
    MatInputModule,
    ScrollspyNavLayoutModule,
    SharedModule,
  ],
  declarations: [AuthenticationComponent],
})
export class AuthenticationModule { }
