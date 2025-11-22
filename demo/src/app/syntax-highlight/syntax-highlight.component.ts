import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit } from '@angular/core';
import { LanguagePipe, MarkdownComponent, MarkdownPipe } from 'ngx-markdown';
import { ScrollspyNavLayoutComponent } from '@shared/scrollspy-nav-layout';

@Component({
  selector: 'app-syntax-highlight',
  templateUrl: './syntax-highlight.component.html',
  styleUrls: ['./syntax-highlight.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    LanguagePipe,
    MarkdownComponent,
    MarkdownPipe,
    ScrollspyNavLayoutComponent,
  ],
})
export default class SyntaxHighlightComponent implements OnInit {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  headings: Element[] | undefined;

  myValue = 'print(\'hello-world\')';

  ngOnInit(): void {
    this.setHeadings();
  }

  private setHeadings(): void {
    const headings: Element[] = [];
    this.elementRef.nativeElement
      .querySelectorAll('h2')
      .forEach(x => headings.push(x));
    this.headings = headings;
  }
}
