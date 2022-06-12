import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { timer } from 'rxjs';

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

  private readonly copyText = 'Copy';
  private readonly copiedText = 'Copied';

  get text(): string {
    return this.copied
      ? this.copiedText
      : this.copyText;
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
