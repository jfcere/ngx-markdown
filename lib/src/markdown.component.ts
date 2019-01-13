import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

import { MarkdownService } from './markdown.service';
import { PrismPlugin } from './prism-plugin';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'markdown, [markdown]',
  template: '<ng-content></ng-content>',
})
export class MarkdownComponent implements AfterViewInit {
  private _data: string;
  private _lineHighlight = false;
  private _lineNumbers = false;
  private _src: string;

  private get _isTranscluded() {
    return !this._data && !this._src;
  }

  @Input()
  get data(): string { return this._data; }
  set data(value: string) {
    this._data = value;
    this.render(value);
  }

  @Input()
  get src(): string { return this._src; }
  set src(value: string) {
    this._src = value;
    this.markdownService
      .getSource(value)
      .subscribe(
        markdown => {
          this.render(markdown);
          this.load.emit(markdown);
        },
        error => this.error.emit(error),
      );
  }

  // Plugin - lineNumbers
  @Input()
  get lineNumbers(): boolean { return this._lineNumbers; }
  set lineNumbers(value: boolean) { this._lineNumbers = this.coerceBooleanProperty(value); }
  @Input() start: number;

  // Plugin - lineHighlight
  @Input()
  get lineHighlight(): boolean { return this._lineHighlight; }
  set lineHighlight(value: boolean) { this._lineHighlight = this.coerceBooleanProperty(value); }
  @Input() line: string | string[];
  @Input() lineOffset: number;

  @Output() error = new EventEmitter<string>();
  @Output() load = new EventEmitter<string>();

  constructor(
    public element: ElementRef<HTMLElement>,
    public markdownService: MarkdownService,
  ) { }

  ngAfterViewInit() {
    if (this._isTranscluded) {
      this.render(this.element.nativeElement.innerHTML, true);
    }
  }

  render(markdown: string, decodeHtml = false) {
    this.element.nativeElement.innerHTML = this.markdownService.compile(markdown, decodeHtml);
    this.handlePlugins();
    this.markdownService.highlight(this.element.nativeElement);
  }

  private coerceBooleanProperty(value: boolean): boolean {
    return value != null && `${value}` !== 'false';
  }

  private handlePlugins() {
    if (this.lineHighlight) {
      this.setPluginClass(this.element.nativeElement, PrismPlugin.LineHighlight);
      this.setPluginOptions(this.element.nativeElement, { dataLine: this.line, dataLineOffset: this.lineOffset });
    }
    if (this.lineNumbers) {
      this.setPluginClass(this.element.nativeElement, PrismPlugin.LineNumbers);
      this.setPluginOptions(this.element.nativeElement, { dataStart: this.start });
    }
  }

  private setPluginClass(element: HTMLElement, plugin: string | string[]) {
    const preElements = element.querySelectorAll('pre');
    for (let i = 0; i < preElements.length; i++) {
      const classes = plugin instanceof Array ? plugin : [plugin];
      preElements.item(i).classList.add(...classes);
    }
  }

  private setPluginOptions(element: HTMLElement, options: object) {
    const preElements = element.querySelectorAll('pre');
    for (let i = 0; i < preElements.length; i++) {
      Object.keys(options).forEach(option => {
        const attributeValue = options[option];
        if (!!attributeValue) {
          const attributeName = this.toLispCase(option);
          preElements.item(i).setAttribute(attributeName, attributeValue.toString());
        }
      });
    }
  }

  private toLispCase(value: string) {
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
