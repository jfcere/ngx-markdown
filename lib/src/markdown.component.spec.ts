import { HttpClientModule } from '@angular/common/http';
import { ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { MarkdownComponent } from './markdown.component';
import { MarkdownService } from './markdown.service';
import { MarkedOptions } from './marked-options';

describe('MarkdownComponent', () => {
  let fixture: ComponentFixture<MarkdownComponent>;
  let component: MarkdownComponent;
  let markdownService: MarkdownService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [MarkdownComponent],
      providers: [
        { provide: MarkedOptions, useValue: {} },
        MarkdownService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    markdownService = TestBed.get(MarkdownService);
    fixture = TestBed.createComponent(MarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('data', () => {

    it('should call render with provided data when set', () => {

      const mockData = '# Markdown';

      spyOn(component, 'render');

      component.data = mockData;

      component.ngOnChanges();

      expect(component.render).toHaveBeenCalledWith(mockData);
    });

    it('should return value correctly when get', () => {

      const mockData = '# Markdown';

      component.data = mockData;

      expect(component.data).toBe(mockData);
    });
  });

  describe('src', () => {

    it('should call render with retreived content when set', async(() => {

      const mockSrc = './src-example/file.md';
      const mockContent = 'source-content';

      spyOn(component, 'render');
      spyOn(markdownService, 'getSource').and.returnValue(of(mockContent));

      component.src = mockSrc;

      component.ngOnChanges();

      expect(markdownService.getSource).toHaveBeenCalledWith(mockSrc);
      expect(component.render).toHaveBeenCalledWith(mockContent);
    }));

    it('should return value correctly when get', () => {

      const mockSrc = './src-example/file.md';

      spyOn(markdownService, 'getSource').and.returnValue(of());

      component.src = mockSrc;

      expect(component.src).toBe(mockSrc);
    });

    it('should emit load when get', () => {

      const mockSrc = './src-example/file.md';
      const mockSrcReturn = 'src-return-value';

      spyOn(markdownService, 'getSource').and.returnValue(of(mockSrcReturn));
      spyOn(component.load, 'emit');

      component.src = mockSrc;

      component.ngOnChanges();

      expect(component.load.emit).toHaveBeenCalledWith(mockSrcReturn);
    });

    it('should emit error when and error occurs', () => {

      const mockSrc = './src-example/file.md';
      const mockError = 'error-x';

      spyOn(markdownService, 'getSource').and.returnValue(throwError(mockError));
      spyOn(component.error, 'emit');

      component.src = mockSrc;

      component.ngOnChanges();

      expect(component.error.emit).toHaveBeenCalledWith(mockError);
    });
  });

  describe('ngAfterViewInit', () => {

    it('should call render method and decodeHtml when neither data or src input property is provided', () => {

      const mockHtmlElement = document.createElement('div');
      mockHtmlElement.innerHTML = 'inner-html';

      spyOn(markdownService, 'getSource').and.returnValue(of());

      component.element = new ElementRef(mockHtmlElement);
      component.data = undefined;
      component.src = undefined;

      spyOn(component, 'render');

      component.ngAfterViewInit();

      expect(component.render).toHaveBeenCalledWith(mockHtmlElement.innerHTML, true);
    });

    it('should not call render method when src is provided', () => {

      const mockHtmlElement = document.createElement('div');
      mockHtmlElement.innerHTML = 'inner-html';

      spyOn(markdownService, 'getSource').and.returnValue(of());

      component.element = new ElementRef(mockHtmlElement);
      component.src = './src-example/file.md';

      spyOn(component, 'render');

      component.ngAfterViewInit();

      expect(component.render).not.toHaveBeenCalled();
    });

    it('should not call render method when data is provided', () => {

      const mockHtmlElement = document.createElement('div');
      mockHtmlElement.innerHTML = 'inner-html';

      component.element = new ElementRef(mockHtmlElement);
      component.data = '# Markdown';

      spyOn(component, 'render');

      component.ngAfterViewInit();

      expect(component.render).not.toHaveBeenCalled();
    });
  });

  describe('render', () => {

    it('should set innerHTML with compiled/decoded html markdown when decodeHtml is true', () => {

      const raw = '### Raw';
      const decoded = '<h3>Compiled</h3>';

      spyOn(markdownService, 'compile').and.callFake((markdown: string, decodeHtml: boolean) => {
        return decodeHtml ? decoded : null;
      });

      component.render(raw, true);

      expect(markdownService.compile).toHaveBeenCalledWith(raw, true);
      expect(component.element.nativeElement.innerHTML).toBe(decoded);
    });

    it('should set innerHTML with compiled/undecoded html markdown when decodeHtml is omitted/false/null/undefined', () => {

      const raw = '### Raw';
      const undecoded = '<h3>Compiled-Undecoded</h3>';

      spyOn(markdownService, 'compile').and.callFake((markdown: string, decodeHtml: boolean) => {
        return decodeHtml ? null : undecoded;
      });

      component.render(raw);

      expect(markdownService.compile).toHaveBeenCalledWith(raw, false);
      expect(component.element.nativeElement.innerHTML).toBe(undecoded);

      component.render(raw, false);

      expect(markdownService.compile).toHaveBeenCalledWith(raw, false);
      expect(component.element.nativeElement.innerHTML).toBe(undecoded);

      component.render(raw, null);

      expect(markdownService.compile).toHaveBeenCalledWith(raw, false);
      expect(component.element.nativeElement.innerHTML).toBe(undecoded);

      component.render(raw, undefined);

      expect(markdownService.compile).toHaveBeenCalledWith(raw, false);
      expect(component.element.nativeElement.innerHTML).toBe(undecoded);
    });

    it('should set innerHTML with compiled/decoded html markdown', () => {

      const raw = '### Raw';
      const compiled = '<h3>Compiled</h3>';

      spyOn(markdownService, 'compile').and.returnValue(compiled);

      component.render(raw);

      expect(markdownService.compile).toHaveBeenCalledWith(raw, false);
      expect(component.element.nativeElement.innerHTML).toBe(compiled);
    });

    it('should apply highlight', () => {

      spyOn(markdownService, 'highlight');

      component.render('### Raw');

      expect(markdownService.highlight).toHaveBeenCalledWith(component.element.nativeElement);
    });

    it('should handle lineNumbers plugin correctly', () => {

      const markdown = '```javascript\nconst random = \'Math.random();\n```';
      const getHTMLPreElement = () => (fixture.nativeElement as HTMLElement).querySelector('pre');

      component.lineNumbers = true;
      component.render(markdown);

      expect(getHTMLPreElement().classList).toContain('line-numbers');
      expect(getHTMLPreElement().attributes.getNamedItem('data-start')).toBeNull();

      component.start = 5;
      component.render(markdown);

      expect(getHTMLPreElement().attributes.getNamedItem('data-start').value).toBe('5');
    });

    it('should handle lineHighlight plugin correctly', () => {

      const markdown = '```javascript\nconst random = \'Math.random();\n```';
      const getHTMLPreElement = () => (fixture.nativeElement as HTMLElement).querySelector('pre');

      component.lineHighlight = true;
      component.line = '6, 10-16';
      component.render(markdown);

      expect(getHTMLPreElement().classList).toContain('line-highlight');
      expect(getHTMLPreElement().attributes.getNamedItem('data-line').value).toBe('6, 10-16');
      expect(getHTMLPreElement().attributes.getNamedItem('data-line-offset')).toBeNull();

      component.lineOffset = 5;
      component.render(markdown);

      expect(getHTMLPreElement().attributes.getNamedItem('data-line-offset').value).toBe('5');
    });
  });
});
