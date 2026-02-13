import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  NgZone,
  OnChanges,
  Output,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ClipboardRenderOptions } from './clipboard-options';
import { KatexOptions } from './katex-options';
import {
  MarkdownService,
  ParseOptions,
  RenderOptions,
} from './markdown.service';
import { MermaidAPI } from './mermaid-options';
import { PrismPlugin } from './prism-plugin';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'markdown, [markdown]',
  template: '<ng-content></ng-content>',
})
export class MarkdownComponent implements OnChanges, AfterViewInit {
  element = inject<ElementRef<HTMLElement>>(ElementRef);
  markdownService = inject(MarkdownService);
  viewContainerRef = inject(ViewContainerRef);

  protected static ngAcceptInputType_clipboard: boolean | '';
  protected static ngAcceptInputType_emoji: boolean | '';
  protected static ngAcceptInputType_katex: boolean | '';
  protected static ngAcceptInputType_mermaid: boolean | '';
  protected static ngAcceptInputType_lineHighlight: boolean | '';
  protected static ngAcceptInputType_lineNumbers: boolean | '';
  protected static ngAcceptInputType_commandLine: boolean | '';

  @Input() data: string | null | undefined;
  @Input() src: string | null | undefined;

  @Input()
  get disableSanitizer(): boolean {
    return this._disableSanitizer;
  }
  set disableSanitizer(value: boolean) {
    this._disableSanitizer = this.coerceBooleanProperty(value);
  }

  @Input()
  get inline(): boolean {
    return this._inline;
  }
  set inline(value: boolean) {
    this._inline = this.coerceBooleanProperty(value);
  }

  // Plugin - clipboard
  @Input()
  get clipboard(): boolean {
    return this._clipboard;
  }
  set clipboard(value: boolean) {
    this._clipboard = this.coerceBooleanProperty(value);
  }

  @Input() clipboardButtonComponent: Type<unknown> | undefined;
  @Input() clipboardButtonTemplate: TemplateRef<unknown> | undefined;

  // Plugin - emoji
  @Input()
  get emoji(): boolean {
    return this._emoji;
  }
  set emoji(value: boolean) {
    this._emoji = this.coerceBooleanProperty(value);
  }

  // Plugin - katex
  @Input()
  get katex(): boolean {
    return this._katex;
  }
  set katex(value: boolean) {
    this._katex = this.coerceBooleanProperty(value);
  }

  @Input() katexOptions: KatexOptions | undefined;

  // Plugin - mermaid
  @Input()
  get mermaid(): boolean {
    return this._mermaid;
  }
  set mermaid(value: boolean) {
    this._mermaid = this.coerceBooleanProperty(value);
  }

  @Input() mermaidOptions: MermaidAPI.MermaidConfig | undefined;

  // Plugin - lineHighlight
  @Input()
  get lineHighlight(): boolean {
    return this._lineHighlight;
  }
  set lineHighlight(value: boolean) {
    this._lineHighlight = this.coerceBooleanProperty(value);
  }

  @Input() line: string | string[] | undefined;
  @Input() lineOffset: number | undefined;

  // Plugin - lineNumbers
  @Input()
  get lineNumbers(): boolean {
    return this._lineNumbers;
  }
  set lineNumbers(value: boolean) {
    this._lineNumbers = this.coerceBooleanProperty(value);
  }

  @Input() start: number | undefined;

  // Plugin - commandLine
  @Input()
  get commandLine(): boolean {
    return this._commandLine;
  }
  set commandLine(value: boolean) {
    this._commandLine = this.coerceBooleanProperty(value);
  }

  @Input() filterOutput: string | undefined;
  @Input() host: string | undefined;
  @Input() prompt: string | undefined;
  @Input() output: string | undefined;
  @Input() user: string | undefined;

  // Event emitters
  @Output() error = new EventEmitter<string | Error>();
  @Output() load = new EventEmitter<string>();
  @Output() ready = new EventEmitter<void>();

  private _clipboard = false;
  private _commandLine = false;
  private _disableSanitizer = false;
  private _emoji = false;
  private _inline = false;
  private _katex = false;
  private _lineHighlight = false;
  private _lineNumbers = false;
  private _mermaid = false;

  private readonly handleSrc$ = new Subject<string>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly ngZone = inject(NgZone);

  constructor() {
    this.setupHandleSrcListener();
  }

  ngOnChanges(): void {
    this.loadContent();
  }

  loadContent(): void {
    if (this.data != null) {
      this.handleData();
      return;
    }
    if (this.src != null) {
      this.handleSrc$.next(this.src);
      return;
    }
  }

  ngAfterViewInit(): void {
    if (!this.data && !this.src) {
      this.handleTransclusion();
    }

    this.markdownService.reload$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.loadContent());
  }

  async render(
    markdown: string,
    decodeHtml = false,
    abortController?: AbortController,
  ): Promise<void> {
    const parsedOptions: ParseOptions = {
      decodeHtml,
      inline: this.inline,
      emoji: this.emoji,
      mermaid: this.mermaid,
      disableSanitizer: this.disableSanitizer,
    };

    const renderOptions: RenderOptions = {
      clipboard: this.clipboard,
      clipboardOptions: this.getClipboardOptions(),
      katex: this.katex,
      katexOptions: this.katexOptions,
      mermaid: this.mermaid,
      mermaidOptions: this.mermaidOptions,
    };

    // Parse markdown (potentially expensive operation).
    const parsed = await this.markdownService.parse(markdown, parsedOptions);

    // Early exit if the operation was aborted while parsing.
    // Without this check, we'd waste CPU updating the DOM for a stale/cancelled request.
    // This is the cancellation checkpoint - prevents executing the expensive DOM operations below.
    if (abortController?.signal.aborted) {
      return;
    }

    // Only proceed with DOM updates if not aborted.
    this.element.nativeElement.innerHTML = parsed;

    this.handlePlugins();

    this.markdownService.render(
      this.element.nativeElement,
      renderOptions,
      this.viewContainerRef,
    );

    this.ready.emit();
  }

  private coerceBooleanProperty(value: boolean | ''): boolean {
    return value != null && `${String(value)}` !== 'false';
  }

  private getClipboardOptions(): ClipboardRenderOptions | undefined {
    if (this.clipboardButtonComponent || this.clipboardButtonTemplate) {
      return {
        buttonComponent: this.clipboardButtonComponent,
        buttonTemplate: this.clipboardButtonTemplate,
      };
    }
    return undefined;
  }

  private handleData(): void {
    this.render(this.data!);
  }

  private setupHandleSrcListener(): void {
    this.handleSrc$
      .pipe(
        // `switchMap` ensures that if `src` changes rapidly, only the latest request matters.
        // Previous in-flight requests are cancelled automatically.
        // We wait for `render()` to complete before emitting the markdown to subscribers.
        switchMap((src) =>
          this.markdownService.getSource(src).pipe(
            switchMap((markdown) => {
              // Wrap the async `render()` in an Observable to make it cancellable.
              // CRITICAL: Promises/async functions are NOT cancellable by default in JavaScript.
              // Once a Promise starts, it runs to completion even if no one is waiting for it.
              // By wrapping in an Observable with a teardown function, we can:
              // 1. Signal cancellation via AbortController when switchMap cancels
              // 2. Prevent unnecessary DOM updates if the user navigates away or src changes
              // 3. Abort expensive async operations (parsing, rendering) mid-flight
              return new Observable<string>((subscriber) => {
                const abortController = new AbortController();
                this.render(
                  markdown,
                  /* decodeHtml */ false,
                  abortController,
                ).then(() => subscriber.next(markdown));

                // Teardown function: called when switchMap cancels this inner Observable.
                // This aborts the render operation, preventing wasted work.
                return () => abortController.abort();
              });
            }),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (markdown) => {
          // Re-enter Angular's zone ONLY if someone is listening to the load event.
          // This completes the zone.js optimization loop:
          // 1. HTTP request ran OUTSIDE zone (from `getSource`) - no CD during XHR
          // 2. Now we run INSIDE zone to emit the event - triggers ONE CD cycle
          // This ensures `@Output()` emissions properly trigger change detection in parent components,
          // but only when necessary (i.e., when observers actually exist).
          if (this.load.observers.length) {
            this.ngZone.run(() => this.load.emit(markdown));
          }
        },
        error: (error: string | Error) => this.error.emit(error),
      });
  }

  private handleTransclusion(): void {
    this.render(this.element.nativeElement.innerHTML, true);
  }

  private handlePlugins(): void {
    if (this.commandLine) {
      this.setPluginClass(this.element.nativeElement, PrismPlugin.CommandLine);
      this.setPluginOptions(this.element.nativeElement, {
        dataFilterOutput: this.filterOutput,
        dataHost: this.host,
        dataPrompt: this.prompt,
        dataOutput: this.output,
        dataUser: this.user,
      });
    }
    if (this.lineHighlight) {
      this.setPluginOptions(this.element.nativeElement, {
        dataLine: this.line,
        dataLineOffset: this.lineOffset,
      });
    }
    if (this.lineNumbers) {
      this.setPluginClass(this.element.nativeElement, PrismPlugin.LineNumbers);
      this.setPluginOptions(this.element.nativeElement, {
        dataStart: this.start,
      });
    }
  }

  private setPluginClass(
    element: HTMLElement,
    plugin: string | string[],
  ): void {
    const preElements = element.querySelectorAll('pre');
    for (let i = 0; i < preElements.length; i++) {
      const classes = plugin instanceof Array ? plugin : [plugin];
      preElements.item(i).classList.add(...classes);
    }
  }

  private setPluginOptions(
    element: HTMLElement,
    options: Record<string, number | string | string[] | undefined>,
  ): void {
    const preElements = element.querySelectorAll('pre');
    for (let i = 0; i < preElements.length; i++) {
      Object.keys(options).forEach((option) => {
        const attributeValue = options[option];
        if (attributeValue) {
          const attributeName = this.toLispCase(option);
          preElements
            .item(i)
            .setAttribute(attributeName, attributeValue.toString());
        }
      });
    }
  }

  private toLispCase(value: string): string {
    const upperChars = value.match(/([A-Z])/g);
    if (!upperChars) {
      return value;
    }
    let str = value.toString();
    for (let i = 0, n = upperChars.length; i < n; i++) {
      str = str.replace(
        new RegExp(upperChars[i]),
        '-' + upperChars[i].toLowerCase(),
      );
    }
    if (str.slice(0, 1) === '-') {
      str = str.slice(1);
    }
    return str;
  }
}
