/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { KatexOptions } from './katex-options';
import { MarkdownService, ParseOptions, RenderOptions } from './markdown.service';
import { MermaidAPI } from './mermaid-options';
import { PrismPlugin } from './prism-plugin';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'markdown, [markdown]',
  template: '<ng-content></ng-content>',
})
export class MarkdownComponent implements OnChanges, AfterViewInit, OnDestroy {

  protected static ngAcceptInputType_clipboard: boolean | '';
  protected static ngAcceptInputType_emoji: boolean | '';
  protected static ngAcceptInputType_katex: boolean | '';
  protected static ngAcceptInputType_mermaid: boolean | '';
  protected static ngAcceptInputType_lineHighlight: boolean | '';
  protected static ngAcceptInputType_lineNumbers: boolean | '';
  protected static ngAcceptInputType_commandLine: boolean | '';

  @Input() data: string | undefined;
  @Input() src: string | undefined;
  @Input() enableBasePath: boolean;

  @Input()
  get inline(): boolean { return this._inline; }
  set inline(value: boolean) { this._inline = this.coerceBooleanProperty(value); }

  // Plugin - clipboard
  @Input()
  get clipboard(): boolean { return this._clipboard; }
  set clipboard(value: boolean) { this._clipboard = this.coerceBooleanProperty(value); }
  @Input() clipboardButtonComponent: Type<unknown> | undefined;
  @Input() clipboardButtonTemplate: TemplateRef<unknown> | undefined;

  // Plugin - emoji
  @Input()
  get emoji(): boolean { return this._emoji; }
  set emoji(value: boolean) { this._emoji = this.coerceBooleanProperty(value); }

  // Plugin - katex
  @Input()
  get katex(): boolean { return this._katex; }
  set katex(value: boolean) { this._katex = this.coerceBooleanProperty(value); }
  @Input() katexOptions: KatexOptions | undefined;

  // Plugin - mermaid
  @Input()
  get mermaid(): boolean { return this._mermaid; }
  set mermaid(value: boolean) { this._mermaid = this.coerceBooleanProperty(value); }
  @Input() mermaidOptions: MermaidAPI.Config | undefined;

  // Plugin - lineHighlight
  @Input()
  get lineHighlight(): boolean { return this._lineHighlight; }
  set lineHighlight(value: boolean) { this._lineHighlight = this.coerceBooleanProperty(value); }
  @Input() line: string | string[] | undefined;
  @Input() lineOffset: number | undefined;

  // Plugin - lineNumbers
  @Input()
  get lineNumbers(): boolean { return this._lineNumbers; }
  set lineNumbers(value: boolean) { this._lineNumbers = this.coerceBooleanProperty(value); }
  @Input() start: number | undefined;

  // Plugin - commandLine
  @Input()
  get commandLine(): boolean { return this._commandLine; }
  set commandLine(value: boolean) { this._commandLine = this.coerceBooleanProperty(value); }
  @Input() filterOutput: string | undefined;
  @Input() host: string | undefined;
  @Input() prompt: string | undefined;
  @Input() output: string | undefined;
  @Input() user: string | undefined;

  // Event emitters
  @Output() error = new EventEmitter<string>();
  @Output() load = new EventEmitter<string>();
  @Output() ready = new EventEmitter<void>();

  private _commandLine = false;
  private _clipboard = false;
  private _emoji = false;
  private _inline = false;
  private _katex = false;
  private _lineHighlight = false;
  private _lineNumbers = false;
  private _mermaid = false;

  private readonly destroyed$ = new Subject<void>();

  constructor(
    public element: ElementRef<HTMLElement>,
    public markdownService: MarkdownService,
    public viewContainerRef: ViewContainerRef,
  ) {
    // default to false...  override by setting [enableBasePath]="true" in HTML element
    this.enableBasePath = false;
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
      this.handleSrc();
      return;
    }
  }

  ngAfterViewInit(): void {
    if (!this.data && !this.src) {
      this.handleTransclusion();
    }

    this.markdownService.reload$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.loadContent());
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  render(markdown: string, decodeHtml = false): void {
    const parsedOptions: ParseOptions = {
      decodeHtml,
      inline: this.inline,
      emoji: this.emoji,
      mermaid: this.mermaid,
    };

    const renderOptions: RenderOptions = {
      clipboard: this.clipboard,
      clipboardOptions: {
        buttonComponent: this.clipboardButtonComponent,
        buttonTemplate: this.clipboardButtonTemplate,
      },
      katex: this.katex,
      katexOptions: this.katexOptions,
      mermaid: this.mermaid,
      mermaidOptions: this.mermaidOptions,
    };

    const useBasePath = this.enableBasePath && this.src;
    const baseUrl = this.src ? new URL(this.src, location.origin).pathname : '';
    const parsed = useBasePath
      ? this.markdownService.parse(markdown, parsedOptions)
      : this.markdownService.parse(markdown, parsedOptions, { baseUrl });

    this.element.nativeElement.innerHTML = parsed;

    this.handlePlugins();

    this.markdownService.render(this.element.nativeElement, renderOptions, this.viewContainerRef);

    this.ready.emit();
  }

  private coerceBooleanProperty(value: boolean | ''): boolean {
    return value != null && `${String(value)}` !== 'false';
  }

  private handleData(): void {
    this.render(this.data!);
  }

  private handleSrc(): void {
    this.markdownService
      .getSource(this.src!)
      .subscribe({
        next: markdown => {
          this.render(markdown);
          this.load.emit(markdown);
        },
        error: error => this.error.emit(error),
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
      this.setPluginOptions(this.element.nativeElement, { dataLine: this.line, dataLineOffset: this.lineOffset });
    }
    if (this.lineNumbers) {
      this.setPluginClass(this.element.nativeElement, PrismPlugin.LineNumbers);
      this.setPluginOptions(this.element.nativeElement, { dataStart: this.start });
    }
  }

  private setPluginClass(element: HTMLElement, plugin: string | string[]): void {
    const preElements = element.querySelectorAll('pre');
    for (let i = 0; i < preElements.length; i++) {
      const classes = plugin instanceof Array ? plugin : [plugin];
      preElements.item(i).classList.add(...classes);
    }
  }

  private setPluginOptions(element: HTMLElement, options: { [key: string]: number | string | string[] | undefined }): void {
    const preElements = element.querySelectorAll('pre');
    for (let i = 0; i < preElements.length; i++) {
      Object.keys(options).forEach(option => {
        const attributeValue = options[option];
        if (attributeValue) {
          const attributeName = this.toLispCase(option);
          preElements.item(i).setAttribute(attributeName, attributeValue.toString());
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
      str = str.replace(new RegExp(upperChars[i]), '-' + upperChars[i].toLowerCase());
    }
    if (str.slice(0, 1) === '-') {
      str = str.slice(1);
    }
    return str;
  }
}
