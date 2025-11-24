import { ElementRef, inject, NgZone, Pipe, PipeTransform, ViewContainerRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { MarkdownService, ParseOptions, RenderOptions } from './markdown.service';

export type MarkdownPipeOptions = ParseOptions & RenderOptions;

@Pipe({
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
  private domSanitizer = inject(DomSanitizer);
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private markdownService = inject(MarkdownService);
  private viewContainerRef = inject(ViewContainerRef);
  private zone = inject(NgZone);

  async transform(value: string, options?: MarkdownPipeOptions): Promise<SafeHtml> {
    if (value == null) {
      return '';
    }

    if (typeof value !== 'string') {
      console.error(`MarkdownPipe has been invoked with an invalid value type [${typeof value}]`);
      return value;
    }

    const markdown = await this.markdownService.parse(value, options);

    this.zone.onStable
      .pipe(first())
      .subscribe(() => this.markdownService.render(this.elementRef.nativeElement, options, this.viewContainerRef));

    return this.domSanitizer.bypassSecurityTrustHtml(markdown);
  }
}
