import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { MarkdownService } from './markdown.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'markdown, [markdown]',
  template: '<ng-content></ng-content>',
})
export class MarkdownComponent implements AfterViewInit {
  private _data: string;
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

  @Output() error = new EventEmitter<string>();
  @Output() load = new EventEmitter<string>();

  constructor(
    public element: ElementRef,
    public markdownService: MarkdownService,
  ) { }

  ngAfterViewInit() {
    if (this._isTranscluded) {
      this.render(this.element.nativeElement.innerHTML, true);
    }
  }

  render(markdown: string, decodeHtml = false) {
    this.element.nativeElement.innerHTML = this.markdownService.compile(markdown, decodeHtml);
    this.markdownService.highlight();
  }
}
