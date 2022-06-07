import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { first } from 'rxjs/operators';

import { KatexOptions } from './katex-options';
import { MarkdownComponent } from './markdown.component';
import { MarkdownModule } from './markdown.module';
import { MarkdownService, ParseOptions } from './markdown.service';
import { MermaidAPI } from './mermaid-options';

describe('MarkdownComponent', () => {
  let fixture: ComponentFixture<MarkdownComponent>;
  let component: MarkdownComponent;
  let markdownService: MarkdownService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MarkdownModule.forRoot(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    markdownService = TestBed.inject(MarkdownService);
    fixture = TestBed.createComponent(MarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('data', () => {

    it('should call render with provided data when set', () => {

      const spyRender = spyOn(component, 'render');

      const useCases = [
        '',
        '# Markdown',
        '<p>Html</p>',
      ];

      useCases.forEach(data => {
        component.data = data;
        component.ngOnChanges();
        expect(component.render).toHaveBeenCalledWith(data);
        spyRender.calls.reset();
      });
    });

    it('should return value correctly when get', () => {

      const mockData = '# Markdown';

      component.data = mockData;

      expect(component.data).toBe(mockData);
    });
  });

  describe('src', () => {

    it('should call render with retreived content when set', () => {

      const mockSrc = './src-example/file.md';
      const mockContent = 'source-content';

      spyOn(component, 'render');
      spyOn(markdownService, 'getSource').and.returnValue(of(mockContent));

      component.src = mockSrc;

      component.ngOnChanges();

      expect(markdownService.getSource).toHaveBeenCalledWith(mockSrc);
      expect(component.render).toHaveBeenCalledWith(mockContent);
    });

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

    it('should parse markdown through MarkdownService', () => {

      const raw = '### Raw';
      const katexOptions: KatexOptions = { displayMode: true };

      spyOn(markdownService, 'parse');

      component.emoji = false;
      component.katex = true;
      component.katexOptions = katexOptions;
      component.mermaid = false;
      component.render(raw, true);

      expect(markdownService.parse).toHaveBeenCalledWith(raw, {
        decodeHtml: true,
        emoji: false,
        katex: true,
        katexOptions: katexOptions,
        mermaid: false,
      });
    });

    it('should set innerHTML with parsed markdown', () => {

      const raw = '### Raw';
      const parsed = '<h3>Compiled</h3>';

      spyOn(markdownService, 'parse').and.returnValue(parsed);

      component.render(raw, true);

      expect(component.element.nativeElement.innerHTML).toBe(parsed);
    });

    it('should handle commandline plugin correctly', () => {

      const markdown = '```powershell\nGet-Date\n\nSunday, November 7, 2021 8:19:21 PM\n\n```';
      const getHTMLPreElement = () => (fixture.nativeElement as HTMLElement).querySelector('pre');

      component.commandLine = true;
      component.render(markdown);

      expect(getHTMLPreElement()?.classList).toContain('command-line');
      expect(getHTMLPreElement()?.attributes.getNamedItem('data-start')).toBeNull();

      component.filterOutput = '(out)';
      component.render(markdown);

      expect(getHTMLPreElement()?.attributes.getNamedItem('data-filter-output')?.value).toBe('(out)');

      component.host = 'localhost';
      component.render(markdown);

      expect(getHTMLPreElement()?.attributes.getNamedItem('data-host')?.value).toBe('localhost');

      component.prompt = 'PS C:\\Users\\Chris>';
      component.render(markdown);

      expect(getHTMLPreElement()?.attributes.getNamedItem('data-prompt')?.value).toBe('PS C:\\Users\\Chris>');

      component.output = '2-4';
      component.render(markdown);

      expect(getHTMLPreElement()?.attributes.getNamedItem('data-output')?.value).toBe('2-4');

      component.user = 'root';
      component.render(markdown);

      expect(getHTMLPreElement()?.attributes.getNamedItem('data-user')?.value).toBe('root');
    });

    it('should handle lineNumbers plugin correctly', () => {

      const markdown = '```javascript\nconst random = \'Math.random();\n```';
      const getHTMLPreElement = () => (fixture.nativeElement as HTMLElement).querySelector('pre');

      component.lineNumbers = true;
      component.render(markdown);

      expect(getHTMLPreElement()?.classList).toContain('line-numbers');
      expect(getHTMLPreElement()?.attributes.getNamedItem('data-start')).toBeNull();

      component.start = 5;
      component.render(markdown);

      expect(getHTMLPreElement()?.attributes.getNamedItem('data-start')?.value).toBe('5');
    });

    it('should handle lineHighlight plugin correctly', () => {

      const markdown = '```javascript\nconst random = \'Math.random();\n```';
      const getHTMLPreElement = () => (fixture.nativeElement as HTMLElement).querySelector('pre');

      component.lineHighlight = true;
      component.line = '6, 10-16';
      component.render(markdown);

      expect(getHTMLPreElement()?.attributes.getNamedItem('data-line')?.value).toBe('6, 10-16');
      expect(getHTMLPreElement()?.attributes.getNamedItem('data-line-offset')).toBeNull();

      component.lineOffset = 5;
      component.render(markdown);

      expect(getHTMLPreElement()?.attributes.getNamedItem('data-line-offset')?.value).toBe('5');
    });

    it('should apply emoji plugin correctly', () => {

      const raw = 'I :heart: ngx-markdown';
      const emojified = 'I ❤️ ngx-markdown';

      spyOn(markdownService, 'parse').and.callFake((markdown: string, { emoji }: ParseOptions) => {
        return emoji ? emojified : '';
      });

      component.emoji = true;
      component.render(raw);

      expect(markdownService.parse).toHaveBeenCalledWith(raw, {
        decodeHtml: false,
        emoji: true,
        katex: false,
        katexOptions: undefined,
        mermaid: false,
      });
      expect(component.element.nativeElement.innerHTML).toBe(emojified);
    });

    it('should render html element through MarkdownService', () => {
      const raw = '### Raw';
      const parsed = '<h3>Compiled</h3>';
      const mermaidOptions: MermaidAPI.Config = { darkMode: true };

      spyOn(markdownService, 'parse').and.returnValue(parsed);
      spyOn(markdownService, 'render');

      component.mermaid = true;
      component.mermaidOptions = mermaidOptions;
      component.render(raw);

      expect(markdownService.parse).toHaveBeenCalledWith(raw, {
        decodeHtml: false,
        emoji: false,
        katex: false,
        katexOptions: undefined,
        mermaid: true,
      });

      expect(markdownService.render).toHaveBeenCalledWith(component.element.nativeElement, {
        mermaid: true,
        mermaidOptions: mermaidOptions,
      });
    });

    it('should emit `ready` when parsing and rendering is done', () => {

      const markdown = '# Markdown';
      const parsed = '<h1 id="markdown">Markdown</h1>';

      spyOn(markdownService, 'parse').and.returnValue(parsed);
      spyOn(markdownService, 'render');

      component.ready
        .pipe(first())
        .subscribe(() => {
          expect(markdownService.parse).toHaveBeenCalled();
          expect(component.element.nativeElement.innerHTML).toBe(parsed);
          expect(markdownService.render).toHaveBeenCalled();
        });

      component.render(markdown);
    });
  });
});
