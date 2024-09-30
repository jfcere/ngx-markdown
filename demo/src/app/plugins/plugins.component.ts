import { ChangeDetectionStrategy, Component, ElementRef, OnInit, SecurityContext } from '@angular/core';
import { FlexModule } from '@angular/flex-layout/flex';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLIPBOARD_OPTIONS, MarkdownComponent, MermaidAPI, provideMarkdown } from 'ngx-markdown';
import { ClipboardButtonComponent } from '@shared/clipboard-button';
import { ScrollspyNavLayoutComponent } from '@shared/scrollspy-nav-layout';

@Component({
  selector: 'app-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FlexModule,
    FormsModule,
    MarkdownComponent,
    MatFormFieldModule,
    MatInputModule,
    ScrollspyNavLayoutComponent,
  ],
  providers: [
    provideMarkdown({
      clipboardOptions: {
        provide: CLIPBOARD_OPTIONS,
        useValue: {},
      },
      sanitize: SecurityContext.NONE,
    }),
  ],
})
export default class PluginsComponent implements OnInit {

  readonly clipboardButton = ClipboardButtonComponent;

  emojiMarkdown = '# I :heart: ngx-markdown';

  katexMarkdown =
`#### \`katex\` directive example

\`\`\`latex
f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi
\`\`\`

$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi$`;

  mermaidMarkdown =
`\`\`\`mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
\`\`\``;

  mermaidOptions: MermaidAPI.Config = {
    fontFamily: 'inherit',
    theme: MermaidAPI.Theme.Dark,
  };

  headings: Element[] | undefined;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.setHeadings();
  }

  onCopyToClipboard(): void {
    this.snackbar.open('Copied to clipboard via ng-template!', undefined, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  private setHeadings(): void {
    const headings: Element[] = [];
    this.elementRef.nativeElement
      .querySelectorAll('h2')
      .forEach(x => headings.push(x));
    this.headings = headings;
  }
}
