import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import { MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';

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
