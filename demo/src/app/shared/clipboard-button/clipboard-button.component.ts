import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clipboard-button',
  templateUrl: './clipboard-button.component.html',
  styleUrls: ['./clipboard-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipboardButtonComponent {

  constructor(
    private snackbar: MatSnackBar,
  ) { }

  onCopyToClipboard(): void {
    this.snackbar.open('Copied to clipboard via component!', undefined, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
