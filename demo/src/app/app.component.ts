import { DOCUMENT, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Route, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AnchorService } from '@shared/anchor';
import { ROUTE_ANIMATION } from './app.animation';
import { DEFAULT_THEME, LOCAL_STORAGE_THEME_KEY } from './app.constant';
import { isTheme, Theme } from './app.models';

@Component({
  animations: [ROUTE_ANIMATION],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlexModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    NgFor,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
})
export class AppComponent implements OnInit {

  private readonly stickyClassName = 'mat-mdc-tab-nav-bar--sticky';

  routes: Route[];
  theme = DEFAULT_THEME;

  @ViewChild('tabHeader', { read: ElementRef, static: true })
  tabHeader: ElementRef<HTMLElement> | undefined;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    this.anchorService.interceptClick(event);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.tabHeader == null) {
      return;
    }
    const tabHeader = this.tabHeader.nativeElement;
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
    this.routes = this.router.config.filter(route => route.data && route.data['label']);
  }

  ngOnInit(): void {
    this.anchorService.setOffset([0, 64]);

    const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    this.setTheme(
      isTheme(storedTheme)
        ? storedTheme
        : DEFAULT_THEME,
    );
  }

  handleFragment(): void {
    this.anchorService.scrollToAnchor();
  }

  setTheme(theme: Theme): void {
    this.theme = theme;
    const bodyClassList = this.document.querySelector('body')!.classList;
    const removeClassList = /\w*-theme\b/.exec(bodyClassList.value);
    if (removeClassList) {
      bodyClassList.remove(...removeClassList);
    }
    bodyClassList.add(`${this.theme}-theme`);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, this.theme);
  }

  getRouteAnimation(outlet: RouterOutlet): string {
    return outlet
      && outlet.activatedRouteData
      && outlet.activatedRouteData['label'] as string;
  }

  toggleTheme(): void {
    this.setTheme(
      this.theme === Theme.Light
        ? Theme.Dark
        : Theme.Light,
    );
  }
}
