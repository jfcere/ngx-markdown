import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { LanguagePipe } from '../../../../lib/src/language.pipe';
import { MarkdownComponent } from '../../../../lib/src/markdown.component';
import { MarkdownPipe } from '../../../../lib/src/markdown.pipe';
import { ScrollspyNavLayoutComponent } from '../shared/scrollspy-nav-layout/scrollspy-nav-layout.component';

@Component({
  selector: 'app-syntax-highlight',
  templateUrl: './syntax-highlight.component.html',
  styleUrls: ['./syntax-highlight.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ScrollspyNavLayoutComponent,
    MarkdownComponent,
    LanguagePipe,
    MarkdownPipe,
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
