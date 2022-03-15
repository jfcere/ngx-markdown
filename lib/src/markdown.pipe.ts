import { ElementRef, NgZone, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { first } from 'rxjs/operators';

import { MarkdownService } from './markdown.service';

@Pipe({
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {

  constructor(
    private domSanitizer: DomSanitizer,
    private elementRef: ElementRef<HTMLElement>,
    private markdownService: MarkdownService,
    private zone: NgZone,
  ) { }

  transform(value: string): SafeHtml {
    if (value == null) {
      return '';
    }

    if (typeof value !== 'string') {
      console.error(`MarkdownPipe has been invoked with an invalid value type [${typeof value}]`);
      return value;
    }

    const markdown = this.markdownService.compile(value);

    // Normally this isn't in the zone, but it can cause major performance regressions for apps
    // using `zone-patch-rxjs` because it'll call `Prism.highlightAllUnder` within the Angular zone.
    this.zone.runOutsideAngular(() => {
      this.zone.onStable
        .pipe(first())
        .subscribe(() =>
          this.markdownService.highlight(this.elementRef.nativeElement)
        );
    });

    return this.domSanitizer.bypassSecurityTrustHtml(markdown);
  }
}
