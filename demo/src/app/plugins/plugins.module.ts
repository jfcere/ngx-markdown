import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MarkdownModule } from 'ngx-markdown';

import { ScrollspyNavLayoutModule } from '@shared/scrollspy-nav-layout/scrollspy-nav-layout.module';
import { SharedModule } from '@shared/shared.module';
import { PluginsRoutingModule } from './plugins-routing.module';
import { PluginsComponent } from './plugins.component';

@NgModule({
  imports: [
    FormsModule,
    MarkdownModule.forChild(),
    MatInputModule,
    PluginsRoutingModule,
    ScrollspyNavLayoutModule,
    SharedModule,
  ],
  declarations: [PluginsComponent],
})
export class PluginsModule { }
