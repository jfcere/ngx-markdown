import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MarkdownService } from './markdown.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'markdown, [markdown]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./markdown.component.scss'],
})
export class MarkdownComponent implements AfterViewInit, OnChanges {
  @Input() data: string;
  @Input() src: string;

  constructor(
    public element: ElementRef,
    public markdownService: MarkdownService,
  ) { }

  ngAfterViewInit() {
    if (this.data) {
      this.handleData();
      return;
    }
    if (this.src) {
      this.handleSrc();
      return;
    }
    this.handleRaw(this.element.nativeElement.innerHTML);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('data' in changes) {
      this.handleData();
      return;
    }
    if ('src' in changes) {
      this.handleSrc();
      return;
    }
  }

  handleData() {
    this.handleRaw(this.data);
  }

  handleSrc() {
    this.markdownService
      .getSource(this.src)
      .subscribe(raw => this.handleRaw(raw));
  }

  handleRaw(raw: string) {
    this.element.nativeElement.innerHTML = this.markdownService.compile(raw);
    this.markdownService.highlight();
  }
}
