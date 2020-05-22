import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';

import { ZOOM_ANIMATION } from './scrollspy-nav-layout.animation';

@Component({
  animations: [ZOOM_ANIMATION],
  selector: 'app-scrollspy-nav-layout',
  templateUrl: './scrollspy-nav-layout.component.html',
  styleUrls: ['./scrollspy-nav-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollspyNavLayoutComponent {

  @Input()
  headings: Element[];

  showScrollUpButton = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showScrollUpButton = Math.ceil(window.pageYOffset) > 64;
  }

  onScrollUp() {
    window.scrollTo(0, 0);
    location.hash = '';
  }
}
