/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { ElementRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { MarkdownPipe, MarkdownPipeOptions } from './markdown.pipe';
import { MarkdownService } from './markdown.service';
import { provideMarkdown } from './provide-markdown';

describe('MarkdownPipe', () => {
  let domSanitizer: DomSanitizer;
  let elementRef: ElementRef;
  let markdownService: MarkdownService;
  let pipe: MarkdownPipe;
  let viewContainerRef: ViewContainerRef;

  const elementRefSpy = jasmine.createSpyObj<ElementRef>([], { nativeElement: document.createElement('div') });
  const viewContainerRefSpy = jasmine.createSpyObj<ViewContainerRef>(['createComponent']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMarkdown(),
        MarkdownPipe,
        { provide: ElementRef, useValue: elementRefSpy },
        { provide: ViewContainerRef, useValue: viewContainerRefSpy },
      ],
    });

    pipe = TestBed.inject(MarkdownPipe);

    elementRef = TestBed.inject(ElementRef);
    domSanitizer = TestBed.inject(DomSanitizer);
    markdownService = TestBed.inject(MarkdownService);
    viewContainerRef = TestBed.inject(ViewContainerRef);
  });

  it('should return empty string when value is null/undefined', async () => {

    const markdowns: any[] = [undefined, null];

    for (const markdown of markdowns) {
      const result = await pipe.transform(markdown);
      expect(result).toBe('');
    }
  });

  it('should log error and return value when parameter is not a string', async () => {

    const markdowns: any[] = [0, {}, [], /regex/];

    spyOn(console, 'error');

    for (const markdown of markdowns) {
      const result = await pipe.transform(markdown);

      expect(result).toBe(markdown);
      expect(console.error).toHaveBeenCalledWith(`MarkdownPipe has been invoked with an invalid value type [${typeof markdown}]`);
    }
  });

  it('should render element through MarkdownService after next render', async () => {

    const markdown = '# Markdown';
    const mockPipeOptions: MarkdownPipeOptions = { mermaid: true, mermaidOptions: { darkMode: true } };

    spyOn(markdownService, 'render');

    await pipe.transform(markdown, mockPipeOptions);

    expect(markdownService.render).not.toHaveBeenCalled();

    TestBed.tick();

    expect(markdownService.render).toHaveBeenCalledWith(elementRef.nativeElement, mockPipeOptions, viewContainerRef);
  });

  it('should return parsed markdown', async () => {

    const markdown = '# Markdown';
    const mockParsed = 'compiled-x';
    const mockBypassSecurity = 'bypass-x';
    const mockPipeOptions: MarkdownPipeOptions = { inline: true, emoji: true, disableSanitizer: true };

    spyOn(markdownService, 'parse').and.resolveTo(mockParsed);
    spyOn(domSanitizer, 'bypassSecurityTrustHtml').and.returnValue(mockBypassSecurity);

    const result = await pipe.transform(markdown, mockPipeOptions);

    expect(markdownService.parse).toHaveBeenCalledWith(markdown, mockPipeOptions);
    expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(mockParsed);
    expect(result).toBe(mockBypassSecurity);
  });
});
