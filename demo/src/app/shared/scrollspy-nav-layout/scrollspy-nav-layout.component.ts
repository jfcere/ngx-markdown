import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MarkdownComponent } from 'ngx-markdown';
import { ScrollspyNavComponent } from '../scrollspy-nav/scrollspy-nav.component';
import { ZOOM_ANIMATION } from './scrollspy-nav-layout.animation';

@Component({
  animations: [ZOOM_ANIMATION],
  selector: 'app-scrollspy-nav-layout',
  templateUrl: './scrollspy-nav-layout.component.html',
  styleUrls: ['./scrollspy-nav-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FlexModule,
    MatDividerModule,
    MarkdownComponent,
    NgIf,
    MatButtonModule,
    ExtendedModule,
    ScrollspyNavComponent,
  ],
})
export class ScrollspyNavLayoutComponent {

  @Input()
  headings: Element[] | undefined;

  showScrollUpButton = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showScrollUpButton = Math.ceil(window.pageYOffset) > 64;
  }

  onScrollUp(): void {
    window.scrollTo(0, 0);
    location.hash = '';
  }
}
