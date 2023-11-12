import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { LanguagePipe, MarkdownComponent, MarkdownPipe } from 'ngx-markdown';
import { ScrollspyNavLayoutComponent } from '@shared/scrollspy-nav-layout';

@Component({
  selector: 'app-syntax-highlight',
  templateUrl: './syntax-highlight.component.html',
  styleUrls: ['./syntax-highlight.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    LanguagePipe,
    MarkdownComponent,
    MarkdownPipe,
    ScrollspyNavLayoutComponent,
  ],
})
export default class SyntaxHighlightComponent implements OnInit {

  headings: Element[] | undefined;

  myValue = 'print(\'hello-world\')';

  constructor(
    private elementRef: ElementRef<HTMLElement>,
  ) { }

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
