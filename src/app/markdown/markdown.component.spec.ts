import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

import { MarkdownComponent } from './markdown.component';
import { MarkdownService } from './markdown.service';

class MockMarkdownService extends MarkdownService {
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
        { provide: MarkdownService, useClass: MockMarkdownService },
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

  describe('ngAfterViewInit', () => {

    it('should call handleData method when data is provided', () => {

      spyOn(component, 'handleData');

      component.data = '# Markdown';
      component.ngAfterViewInit();

      expect(component.handleData).toHaveBeenCalled();
    });

    it('should call handleSrc method when src is provided', () => {

      spyOn(component, 'handleSrc');

      component.src = './src-example/file.md';
      component.ngAfterViewInit();

      expect(component.handleSrc).toHaveBeenCalled();
    });

    it('should call render method when src is not provided', () => {

      spyOn(component, 'render');

      const mockElement = { nativeElement: { innerHTML: 'inner-html' } };

      component.element = mockElement;
      component.src = undefined;
      component.ngAfterViewInit();

      expect(component.render).toHaveBeenCalledWith(mockElement.nativeElement.innerHTML);
    });
  });

  describe('ngOnChanges', () => {

    it('should call handleData method when data is changed', () => {

      spyOn(component, 'handleData');

      const mockSimpleChanges = { data: null };

      component.ngOnChanges(mockSimpleChanges);

      expect(component.handleData).toHaveBeenCalled();
    });

    it('should not call handleData method when data is unchanged', () => {

      spyOn(component, 'handleData');

      const mockSimpleChanges = {};

      component.ngOnChanges(mockSimpleChanges);

      expect(component.handleData).not.toHaveBeenCalled();
    });

    it('should call handleSrc method when src is changed', () => {

      spyOn(component, 'handleSrc');

      const mockSimpleChanges = { src: null };

      component.ngOnChanges(mockSimpleChanges);

      expect(component.handleSrc).toHaveBeenCalled();
    });

    it('should not call handleSrc method when src is unchanged', () => {

      spyOn(component, 'handleSrc');

      const mockSimpleChanges = {};

      component.ngOnChanges(mockSimpleChanges);

      expect(component.handleSrc).not.toHaveBeenCalled();
    });
  });

  describe('handleData', () => {

    it('should call render method with data parameter', () => {

      spyOn(component, 'render');

      const mockData = '# Markdown';

      component.data = mockData;
      component.handleData();

      expect(component.render).toHaveBeenCalledWith(mockData);
    });
  });

  describe('handleSrc', () => {

    it('should call getSource from MarkdownService', () => {

      const mockGetSource = { subscribe: () => null };

      spyOn(markdownService, 'getSource').and.returnValue(mockGetSource);

      const mockSrc = './src-example/file.md';

      component.src = mockSrc;
      component.handleSrc();

      expect(markdownService.getSource).toHaveBeenCalledWith(mockSrc);
    });

    it('should call render with getSource return value', async(() => {

      const mockRaw =  'raw-text';

      spyOn(markdownService, 'getSource').and.returnValue(Observable.of(mockRaw));
      spyOn(component, 'render');

      component.handleSrc();

      expect(component.render).toHaveBeenCalledWith(mockRaw);
    }));
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

