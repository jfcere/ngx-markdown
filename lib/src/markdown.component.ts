/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AfterViewInit,
  Component,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ClipboardButtonComponent } from './clipboard-button.component';
import { ClipboardOptions } from './clipboard-options';
import { KatexOptions } from './katex-options';
import { MarkdownService } from './markdown.service';
import { MermaidAPI } from './mermaid-options';
import { PrismPlugin } from './prism-plugin';

declare let ClipboardJS: {
  new (
    selector: string | Element | NodeListOf<Element>,
    options?: { text?(elem: Element): string; },
  ): typeof ClipboardJS;
  destroy(): void;
};

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
    @Optional() public clipboardOptions: ClipboardOptions,
    public element: ElementRef<HTMLElement>,
    public markdownService: MarkdownService,
    public viewContainer: ViewContainerRef,
  ) { }

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
    const parsed = this.markdownService.parse(markdown, {
      decodeHtml,
      inline: this.inline,
      emoji: this.emoji,
      mermaid: this.mermaid,
    });

    this.element.nativeElement.innerHTML = parsed;

    this.handlePlugins();

    this.markdownService.render(this.element.nativeElement, {
      katex: this.katex,
      katexOptions: this.katexOptions,
      mermaid: this.mermaid,
      mermaidOptions: this.mermaidOptions,
    });

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
      .subscribe(
        markdown => {
          this.render(markdown);
          this.load.emit(markdown);
        },
        error => this.error.emit(error),
      );
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
    if (this.clipboard) {
      this.setPluginClipboard(this.element.nativeElement);
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

  private setPluginClipboard(element: HTMLElement): void {
    if (typeof ClipboardJS === 'undefined') {
      // should throw Error 'Clipboard.js is not loaded'
      return;
    }

    // target every <pre> elements
    const preElements = element.querySelectorAll('pre');
    for (let i = 0; i < preElements.length; i++) {
      const preElement = preElements.item(i);

      // create <pre> wrapper element
      const preWrapperElement = document.createElement('div');
      preWrapperElement.style.position = 'relative';
      preElement.parentNode!.insertBefore(preWrapperElement, preElement);
      preWrapperElement.appendChild(preElement);

      // create toolbar element
      const toolbarWrapperElement = document.createElement('div');
      toolbarWrapperElement.style.position = 'absolute';
      toolbarWrapperElement.style.top = '.5em';
      toolbarWrapperElement.style.right = '.5em';
      toolbarWrapperElement.style.opacity = '0';
      toolbarWrapperElement.style.transition = 'opacity 250ms ease-out';
      preWrapperElement.insertAdjacentElement('beforeend', toolbarWrapperElement);

      // register listener to show/hide toolbar
      preElement.onmouseover = () => toolbarWrapperElement.style.opacity = '1';
      preElement.onmouseout = () => toolbarWrapperElement.style.opacity = '0';

      // declare embbeddedview holding variable
      let embeddedView: EmbeddedViewRef<unknown>;

      // use provided component via input property
      if (this.clipboardButtonComponent) {
        const componentRef = this.viewContainer.createComponent(this.clipboardButtonComponent);
        embeddedView = componentRef.hostView as EmbeddedViewRef<unknown>;
      }
      // use provided template via input property
      else if (this.clipboardButtonTemplate) {
        embeddedView = this.viewContainer.createEmbeddedView(this.clipboardButtonTemplate);
      }
      // use provided component via ClipboardOptions provider
      else if (this.clipboardOptions?.buttonComponent) {
        const componentRef = this.viewContainer.createComponent(this.clipboardOptions.buttonComponent);
        embeddedView = componentRef.hostView as EmbeddedViewRef<unknown>;
      }
      // use default component
      else {
        const componentRef = this.viewContainer.createComponent(ClipboardButtonComponent);
        embeddedView = componentRef.hostView as EmbeddedViewRef<unknown>;
      }

      // attach clipboard.js to root node
      embeddedView.rootNodes.forEach((node: HTMLElement) => {
        node.onmouseover = () => toolbarWrapperElement.style.opacity = '1';
        toolbarWrapperElement.appendChild(node);
        // return value from new CliboardJS should be use to detroy clipboard in ngOnDestroy
        const _ = new ClipboardJS(node, { text: () => preElement.innerText });
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
