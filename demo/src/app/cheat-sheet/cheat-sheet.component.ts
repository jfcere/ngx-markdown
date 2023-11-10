import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { HttpRawLoaderService } from '@shared/http-raw-loader';

@Component({
  selector: 'app-cheat-sheet',
  templateUrl: './cheat-sheet.component.html',
  styleUrls: ['./cheat-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheatSheetComponent implements OnInit {

  blockquotes$ = this.rawLoaderService.get('app/cheat-sheet/remote/blockquotes.md');
  codeAndSynthaxHighlighting$ = this.rawLoaderService.get('app/cheat-sheet/remote/code-and-synthax-highlighting.md');
  emphasis$ = this.rawLoaderService.get('app/cheat-sheet/remote/emphasis.md');
  headers$ = this.rawLoaderService.get('app/cheat-sheet/remote/headers.md');
  horizontalRule$ = this.rawLoaderService.get('app/cheat-sheet/remote/horizontal-rule.md');
  images$ = this.rawLoaderService.get('app/cheat-sheet/remote/images.md');
  links$ = this.rawLoaderService.get('app/cheat-sheet/remote/links.md');
  lists$ = this.rawLoaderService.get('app/cheat-sheet/remote/lists.md');
  listsDot$ = this.rawLoaderService.get('app/cheat-sheet/remote/lists-dot.md');
  tables$ = this.rawLoaderService.get('app/cheat-sheet/remote/tables.md');

  headings: Element[] | undefined;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private rawLoaderService: HttpRawLoaderService,
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
