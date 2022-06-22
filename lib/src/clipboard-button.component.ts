import { ChangeDetectionStrategy, Component } from '@angular/core';
import { merge, of, Subject, timer } from 'rxjs';
import { distinctUntilChanged, map, mapTo, shareReplay, startWith, switchMap } from 'rxjs/operators';

const BUTTON_TEXT_COPY = 'Copy';
const BUTTON_TEXT_COPIED = 'Copied';

@Component({
  selector: 'markdown-clipboard',
  template: `
    <button
      class="markdown-clipboard-button"
      [class.copied]="copied$ | async"
      (click)="onCopyToClipboardClick()"
    >{{ copiedText$ | async }}</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipboardButtonComponent {

  private _buttonClick$ = new Subject<void>();

  readonly copied$ = this._buttonClick$.pipe(
    switchMap(() => merge(
      of(true),
      timer(3000).pipe(mapTo(false)),
    )),
    distinctUntilChanged(),
    shareReplay(1),
  );

  readonly copiedText$ = this.copied$.pipe(
    startWith(false),
    map(copied => copied
      ? BUTTON_TEXT_COPIED
      : BUTTON_TEXT_COPY),
  );

  onCopyToClipboardClick(): void {
    this._buttonClick$.next();
  }
}
