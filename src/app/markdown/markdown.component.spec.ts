import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { MarkdownComponent } from './markdown.component';
import { markdownServiceFactory, MARKED_OPTIONS } from './markdown.module';
import { MarkdownService } from './markdown.service';

class MockMarkdownService {
  getSource(src: string): Observable<string> {
    return Observable.of('');
  }
}

describe('MarkdownComponent', () => {
  let fixture: ComponentFixture<MarkdownComponent>;
  let component: MarkdownComponent;
  let nativeElement: any;
  let markdownService: MarkdownService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [MarkdownComponent],
      providers: [
        { provide: MARKED_OPTIONS, useValue: {} },
        {
          provide: MarkdownService,
          useFactory: markdownServiceFactory,
          deps: [Http, MARKED_OPTIONS],
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    markdownService = TestBed.get(MarkdownService);
    fixture = TestBed.createComponent(MarkdownComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
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
      spyOn(markdownService, 'getSource').and.returnValue(Observable.of(mockContent));

      component.src = mockSrc;

      expect(markdownService.getSource).toHaveBeenCalledWith(mockSrc);
      expect(component.render).toHaveBeenCalledWith(mockContent);
    }));

    it('should return value correctly when get', () => {

      const mockSrc = './src-example/file.md';

      spyOn(markdownService, 'getSource').and.returnValue(Observable.of());

      component.src = mockSrc;

      expect(component.src).toBe(mockSrc);
    });
  });

  describe('ngAfterViewInit', () => {

    it('should call render method when neither data or src input property is provided', () => {

      const mockElement = { nativeElement: { innerHTML: 'inner-html' } };

      spyOn(markdownService, 'getSource').and.returnValue(Observable.of());

      component.element = mockElement;
      component.data = undefined;
      component.src = undefined;

      spyOn(component, 'render');

      component.ngAfterViewInit();

      expect(component.render).toHaveBeenCalledWith(mockElement.nativeElement.innerHTML);
    });

    it('should not call render method when src is provided', () => {

      const mockElement = { nativeElement: { innerHTML: 'inner-html' } };

      spyOn(markdownService, 'getSource').and.returnValue(Observable.of());

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

    it('should set innerHTML with compiled markdown', () => {

      const raw = '### Raw';
      const compiled = '<h3>Compiled</h3>';

      spyOn(markdownService, 'compile').and.returnValue(compiled);

      component.render(raw);

      expect(markdownService.compile).toHaveBeenCalledWith(raw);
      expect(component.element.nativeElement.innerHTML).toBe(compiled);
    });

    it('should apply highlight', () => {

      spyOn(markdownService, 'highlight');

      component.render('### Raw');

      expect(markdownService.highlight).toHaveBeenCalled();
    });
  });
});
