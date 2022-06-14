import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ClipboardButtonComponent } from './clipboard-button.component';

@NgModule({
  imports: [
    MatButtonModule,
    MatSnackBarModule,
  ],
  declarations: [ClipboardButtonComponent],
  entryComponents: [ClipboardButtonComponent],
})
export class ClipboardButtonModule { }
