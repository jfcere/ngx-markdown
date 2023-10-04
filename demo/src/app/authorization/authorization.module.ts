import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MarkdownModule } from 'ngx-markdown';

import { ClipboardButtonModule } from '@shared/clipboard-button';
import { ScrollspyNavLayoutModule } from '@shared/scrollspy-nav-layout/scrollspy-nav-layout.module';
import { SharedModule } from '@shared/shared.module';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationComponent } from './authorization.component';

@NgModule({
  imports: [
    ClipboardButtonModule,
    FormsModule,
    MarkdownModule.forChild(),
    MatInputModule,
    MatSnackBarModule,
    AuthorizationRoutingModule,
    ScrollspyNavLayoutModule,
    SharedModule,
  ],
  declarations: [AuthorizationComponent],
})
export class AuthorizationModule { }
