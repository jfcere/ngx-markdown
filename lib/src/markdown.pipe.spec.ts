import { ElementRef, NgZone, ViewContainerRef } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { MarkdownModule } from './markdown.module';
import { MarkdownPipe, MarkdownPipeOptions } from './markdown.pipe';
import { MarkdownService } from './markdown.service';

describe('MarkdownPipe', () => {
  let domSanitizer: DomSanitizer;
  let elementRef: ElementRef;
  let markdownService: MarkdownService;
  let pipe: MarkdownPipe;
  let viewContainerRef: ViewContainerRef;
  let zone: NgZone;

  const elementRefSpy = jasmine.createSpyObj<ElementRef>([], { nativeElement: document.createElement('div') });
  const viewContainerRefSpy = jasmine.createSpyObj<ViewContainerRef>(['createComponent']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MarkdownModule.forRoot(),
      ],
      providers: [
        { provide: ElementRef, useValue: elementRefSpy },
        { provide: ViewContainerRef, useValue: viewContainerRefSpy },
      ],
    });

    elementRef = TestBed.inject(ElementRef);
    domSanitizer = TestBed.inject(DomSanitizer);
    markdownService = TestBed.inject(MarkdownService);
    viewContainerRef = TestBed.inject(ViewContainerRef);
    zone = TestBed.inject(NgZone);

    pipe = new MarkdownPipe(domSanitizer, elementRef, markdownService, viewContainerRef, zone);
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

    expect(markdownService.render).toHaveBeenCalledWith(elementRef.nativeElement, mockPipeOptions, viewContainerRef);
  }));

  it('should return parsed markdown', () => {

    const markdown = '# Markdown';
    const mockParsed = 'compiled-x';
    const mockBypassSecurity = 'bypass-x';
    const mockPipeOptions: MarkdownPipeOptions = { inline: true, emoji: true };

    spyOn(markdownService, 'parse').and.returnValue(mockParsed);
    spyOn(domSanitizer, 'bypassSecurityTrustHtml').and.returnValue(mockBypassSecurity);

    const result = pipe.transform(markdown, mockPipeOptions);

    expect(markdownService.parse).toHaveBeenCalledWith(markdown, mockPipeOptions);
    expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(mockParsed);
    expect(result).toBe(mockBypassSecurity);
  });
});
