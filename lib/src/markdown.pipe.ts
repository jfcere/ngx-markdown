import { ElementRef, NgZone, Pipe, PipeTransform, ViewContainerRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { first } from 'rxjs/operators';

import { MarkdownService, ParseOptions, RenderOptions } from './markdown.service';

export type MarkdownPipeOptions = ParseOptions & RenderOptions;

@Pipe({
  name: 'markdown',
  standalone: true,
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

    const render = () =>
      this.markdownService.render(
        this.elementRef.nativeElement,
        options,
        this.viewContainerRef
      );

    // This check is required for zoneless apps because `onStable` would never emit any value
    // when the `NoopNgZone` is used over the `NgZone`.
    if (NgZone.isInAngularZone()) {
      this.zone.onStable.pipe(first()).subscribe(render);
    } else {
      Promise.resolve().then(render);
    }

    return this.domSanitizer.bypassSecurityTrustHtml(markdown);
  }
}
