import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-syntax-highlight',
  templateUrl: './syntax-highlight.component.html',
  styleUrls: ['./syntax-highlight.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SyntaxHighlightComponent implements OnInit {

  headings: Element[];

  myValue = `print('hello-world')`;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
  ) { }

  ngOnInit() {
    this.setHeadings();
  }

  private setHeadings() {
    const headings = [];
    this.elementRef.nativeElement
      .querySelectorAll('h2')
      .forEach(x => headings.push(x));
    this.headings = headings;
  }
}
