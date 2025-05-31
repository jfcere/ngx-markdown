import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { merge, of, Subject, timer } from 'rxjs';
import { distinctUntilChanged, mapTo, shareReplay, switchMap } from 'rxjs/operators';

const BUTTON_TEXT_COPY = 'Copy';
const BUTTON_TEXT_COPIED = 'Copied';

@Component({
  selector: 'markdown-clipboard',
  template: `
    <button
      class="markdown-clipboard-button"
      [class.copied]="copied()"
      (click)="onCopyToClipboardClick()"
    >{{ copiedText() }}</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipboardButtonComponent {
  private _buttonClick$ = new Subject<void>();

  readonly copied = toSignal(
    this._buttonClick$.pipe(
      switchMap(() => merge(
        of(true),
        timer(3000).pipe(mapTo(false)),
      )),
      distinctUntilChanged(),
      shareReplay(1),
    )
  );

  readonly copiedText = computed(() =>
    this.copied()
      ? BUTTON_TEXT_COPIED
      : BUTTON_TEXT_COPY
  );

  onCopyToClipboardClick(): void {
    this._buttonClick$.next();
  }
}
