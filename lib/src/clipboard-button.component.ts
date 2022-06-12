import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { timer } from 'rxjs';

const BUTTON_TEXT_COPY = 'Copy';
const BUTTON_TEXT_COPIED = 'Copied';

@Component({
  selector: 'markdown-clipboard',
  template: `
    <button
      class="markdown-clipboard-button"
      [class.copied]="copied"
      (click)="onCopyToClipboardClick()"
    >{{ text }}</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipboardButtonComponent {

  get text(): string {
    return this.copied
      ? BUTTON_TEXT_COPIED
      : BUTTON_TEXT_COPY;
  }

  copied = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  onCopyToClipboardClick(): void {
    if (this.copied) {
      return;
    }

    this.copied = true;

    timer(3000).subscribe(() => {
      this.copied = false;
      this.changeDetectorRef.markForCheck();
    });
  }
}
