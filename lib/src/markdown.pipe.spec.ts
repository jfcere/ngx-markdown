import { ElementRef, NgZone } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { MarkdownModule } from './markdown.module';
import { MarkdownPipe, MarkdownPipeOptions } from './markdown.pipe';
import { MarkdownService } from './markdown.service';

describe('MarkdownPipe', () => {
  let domSanitizer: DomSanitizer;
  const elementRef = new ElementRef(document.createElement('div'));
  let markdownService: MarkdownService;
  let pipe: MarkdownPipe;
  let zone: NgZone;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MarkdownModule.forRoot(),
      ],
    });

    domSanitizer = TestBed.inject(DomSanitizer);
    markdownService = TestBed.inject(MarkdownService);
    zone = TestBed.inject(NgZone);
    pipe = new MarkdownPipe(domSanitizer, elementRef, markdownService, zone);
  });

  it('should return empty string when value is null/undefined', () => {

    const markdowns: any[] = [undefined, null];

    markdowns.forEach(markdown => {
      const result = pipe.transform(markdown);
      expect(result).toBe('');
    });
  });

  it('should log error and return value when parameter is not a string', () => {

    const markdowns: any[] = [0, {}, [], /regex/];

    spyOn(console, 'error');

    markdowns.forEach(markdown => {
      const result = pipe.transform(markdown);

      expect(result).toBe(markdown);
      expect(console.error).toHaveBeenCalledWith(`MarkdownPipe has been invoked with an invalid value type [${typeof markdown}]`);
    });
  });

  it('should render element through MarkdownService when zone is stable', fakeAsync(() => {

    const markdown = '# Markdown';
    const mockPipeOptions: MarkdownPipeOptions = { mermaid: true, mermaidOptions: { darkMode: true } };

    spyOn(markdownService, 'render');

    pipe.transform(markdown, mockPipeOptions);

    expect(markdownService.render).not.toHaveBeenCalled();

    zone.onStable.emit(null);

    expect(markdownService.render).toHaveBeenCalledWith(elementRef.nativeElement, mockPipeOptions);
  }));

  it('should return compiled markdown', () => {

    const markdown = '# Markdown';
    const mockCompiled = 'compiled-x';
    const mockBypassSecurity = 'bypass-x';
    const mockPipeOptions: MarkdownPipeOptions = { inline: true, emoji: true };

    spyOn(markdownService, 'parse').and.returnValue(mockCompiled);
    spyOn(domSanitizer, 'bypassSecurityTrustHtml').and.returnValue(mockBypassSecurity);

    const result = pipe.transform(markdown, mockPipeOptions);

    expect(markdownService.parse).toHaveBeenCalledWith(markdown, mockPipeOptions);
    expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(mockCompiled);
    expect(result).toBe(mockBypassSecurity);
  });
});
