import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';

import { MarkdownComponent } from './markdown.component';
import { MarkdownService } from './markdown.service';
import { MarkedOptions } from './marked-options';

class MockMarkdownService {
  getSource(src: string): Observable<string> {
    return of('');
  }
}

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

      expect(markdownService.getSource).toHaveBeenCalledWith(mockSrc);
      expect(component.render).toHaveBeenCalledWith(mockContent);
    }));

    it('should return value correctly when get', () => {

      const mockSrc = './src-example/file.md';

      spyOn(markdownService, 'getSource').and.returnValue(of());

      component.src = mockSrc;

      expect(component.src).toBe(mockSrc);
    });

    it('should emit error when and error occurs', () => {

      const mockSrc = './src-example/file.md';
      const mockError = 'error-x';

      spyOn(markdownService, 'getSource').and.returnValue(throwError(mockError));
      spyOn(component.error, 'emit');

      component.src = mockSrc;

      expect(component.error.emit).toHaveBeenCalledWith(mockError);
    });
  });

  describe('ngAfterViewInit', () => {

    it('should call render method and decodeHtml when neither data or src input property is provided', () => {

      const mockElement = { nativeElement: { innerHTML: 'inner-html' } };

      spyOn(markdownService, 'getSource').and.returnValue(of());

      component.element = mockElement;
      component.data = undefined;
      component.src = undefined;

      spyOn(component, 'render');

      component.ngAfterViewInit();

      expect(component.render).toHaveBeenCalledWith(mockElement.nativeElement.innerHTML, true);
    });

    it('should not call render method when src is provided', () => {

      const mockElement = { nativeElement: { innerHTML: 'inner-html' } };

      spyOn(markdownService, 'getSource').and.returnValue(of());

      component.element = mockElement;
      component.src = './src-example/file.md';

      spyOn(component, 'render');

      component.ngAfterViewInit();

      expect(component.render).not.toHaveBeenCalled();
    });

    it('should not call render method when data is provided', () => {

      const mockElement = { nativeElement: { innerHTML: 'inner-html' } };

      component.element = mockElement;
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

      expect(markdownService.highlight).toHaveBeenCalled();
    });
  });
});
