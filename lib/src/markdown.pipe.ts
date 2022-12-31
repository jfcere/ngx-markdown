import { ElementRef, NgZone, Pipe, PipeTransform, ViewContainerRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { first } from 'rxjs/operators';

import { MarkdownService, ParseOptions, RenderOptions } from './markdown.service';

export type MarkdownPipeOptions = ParseOptions & RenderOptions;

@Pipe({
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {

  constructor(
    private domSanitizer: DomSanitizer,
    private elementRef: ElementRef<HTMLElement>,
    private markdownService: MarkdownService,
    private viewContainerRef: ViewContainerRef,
    private zone: NgZone,
  ) { }

  transform(value: string, options?: MarkdownPipeOptions): SafeHtml {
    if (value == null) {
      return '';
    }

    if (typeof value !== 'string') {
      console.error(`MarkdownPipe has been invoked with an invalid value type [${typeof value}]`);
      return value;
    }

    const markdown = this.markdownService.parse(value, options);

    this.zone.onStable
      .pipe(first())
      .subscribe(() => this.markdownService.render(this.elementRef.nativeElement, options, this.viewContainerRef));

    return this.domSanitizer.bypassSecurityTrustHtml(markdown);
  }
}
