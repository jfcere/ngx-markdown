import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';

import { AnchorService } from '@shared/anchor/anchor.service';
import { ROUTE_ANIMATION } from './app.animation';

@Component({
  animations: [ROUTE_ANIMATION],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  private readonly stickyClassName = 'mat-tab-nav-bar--sticky';

  routes: Route[];
  theme = 'light';

  @ViewChild('tabHeader', { read: ElementRef, static: true })
  tabHeader: ElementRef | undefined;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    this.anchorService.interceptClick(event);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.tabHeader == null) {
      return;
    }
    const tabHeader = this.tabHeader.nativeElement as HTMLElement;
    const tabHeaderOffset = Math.ceil(tabHeader.offsetTop);
    const windowOffset = Math.ceil(window.pageYOffset);
    const hasStickyClass = tabHeader.classList.contains(this.stickyClassName);
    if (!hasStickyClass && windowOffset >= tabHeaderOffset) {
      tabHeader.classList.add(this.stickyClassName);
    }
    if (hasStickyClass && windowOffset < tabHeaderOffset) {
      tabHeader.classList.remove(this.stickyClassName);
    }
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private anchorService: AnchorService,
    private router: Router,
  ) {
    this.routes = this.router.config.filter(route => route.data && route.data.label);
  }

  ngOnInit(): void {
    this.setTheme(localStorage.getItem('theme') || 'light');
  }

  handleFragment(): void {
    this.anchorService.scrollToAnchor();
  }

  setTheme(theme: string): void {
    this.theme = theme;
    const bodyClassList = this.document.querySelector('body')!.classList;
    const removeClassList = /\w*-theme\b/.exec(bodyClassList.value);
    if (removeClassList) {
      bodyClassList.remove(...removeClassList);
    }
    bodyClassList.add(`${this.theme}-theme`);
    localStorage.setItem('theme', this.theme);
  }

  getRouteAnimation(outlet: RouterOutlet): string {
    return outlet
      && outlet.activatedRouteData
      && outlet.activatedRouteData.label as string;
  }

  toggleTheme(): void {
    this.setTheme(this.theme === 'light' ? 'dark' : 'light');
  }
}
