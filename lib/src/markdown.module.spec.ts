import { CommonModule } from '@angular/common';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MarkdownModule } from './markdown.module';
import { errorSrcWithoutHttpClient, MarkdownService } from './markdown.service';
import { MarkedOptions } from './marked-options';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'host-comp',
  template: `
    <div *ngIf="src; else mdData">
      <markdown [src]="src"></markdown>
    </div>

    <ng-template #mdData>
      <markdown [data]="markdown"></markdown>
    </ng-template>
  `,
  styleUrls: ['./markdown.component.scss'],
})
class HostComponent {
  markdown = '# Super title';
  src: string;
}

describe('MarkdownModule without HttpClient', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MarkdownModule.forRoot(),
      ],
      declarations: [HostComponent],
    }).compileComponents();
  }));

  it('should render the markdown if not passing src attribute', () => {

    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(
      HostComponent,
    );

    fixture.detectChanges();

    const title: string = (fixture.nativeElement as HTMLElement).textContent.trim();

    expect(title).toEqual('Super title');
  });

  it('should throw an error when using src attribute without registering HttpClient', () => {

    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(
      HostComponent,
    );

    fixture.componentInstance.src = '/some/path/to/file.md';

    expect(() => fixture.detectChanges()).toThrowError(
      errorSrcWithoutHttpClient,
    );
  });
});
