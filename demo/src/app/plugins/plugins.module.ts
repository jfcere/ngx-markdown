import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MarkdownModule } from 'ngx-markdown';

import { ClipboardButtonModule } from '@shared/clipboard-button';
import { ScrollspyNavLayoutModule } from '@shared/scrollspy-nav-layout/scrollspy-nav-layout.module';
import { SharedModule } from '@shared/shared.module';
import { PluginsRoutingModule } from './plugins-routing.module';
import { PluginsComponent } from './plugins.component';

@NgModule({
  imports: [
    ClipboardButtonModule,
    FormsModule,
    MarkdownModule.forChild(),
    MatInputModule,
    MatSnackBarModule,
    PluginsRoutingModule,
    ScrollspyNavLayoutModule,
    SharedModule,
  ],
  declarations: [PluginsComponent],
})
export class PluginsModule { }
