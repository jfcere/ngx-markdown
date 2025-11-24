import { LocationStrategy, ViewportScroller } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';

/**
 * Service to handle links generated through markdown parsing.
 * #### Using `RouterModule`
 * The following `RouterModule` configuration is required to enabled anchors
 * to be scrolled to when URL has a fragment via the Angular router:
 * ```
 * RouterModule.forRoot(routes, {
 *  anchorScrolling: 'enabled',
 *  scrollOffset: [0, 64], // (optional)
 *  scrollPositionRestoration: 'enabled',
 * })
 * ```
 * #### Using `provideRouter`
 * The following `provideRouter` configuration is required to enabled anchors
 * to be scrolled to when URL has a fragment via the Angular router:
 * ```
 * provideRouter(appRoutes, withInMemoryScrolling({
 *   anchorScrolling: 'enabled',
 *   scrollPositionRestoration: 'enabled',
 * }))
 * ```
 * To set the `scrollOffset` when scrolling to an element use the
 * `AnchorService.setOffset()` in your `AppComponent` (optional):
 * ```
 * constructor(private anchorService: AnchorService) {
 *   this.anchorService.setOffset([0, 64]);
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class AnchorService {
  private locationStrategy = inject(LocationStrategy);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);

  /**
   * Intercept clicks on `HTMLAnchorElement` to use `Router.navigate()`
   * when `href` is an internal URL not handled by `routerLink` directive.
   * @param event The event to evaluated for link click.
   */
  interceptClick(event: Event): void {
    const element = event.target;
    if (!(element instanceof HTMLAnchorElement)) {
      return;
    }
    const href = element.getAttribute('href') || '';
    if (this.isExternalUrl(href) || this.isRouterLink(element)) {
      return;
    }
    this.navigate(href);
    event.preventDefault();
  }

  /**
   * Navigate to URL using angular `Router`.
   * @param url Destination path to navigate to.
   * @param replaceUrl If `true`, replaces current state in browser history.
   */
  navigate(url: string, replaceUrl = false): void {
    const urlTree = this.getUrlTree(url);
    this.router.navigated = false;
    void this.router.navigateByUrl(urlTree, { replaceUrl });
  }

  /**
   * Transform a relative URL to its absolute representation according to current router state.
   * @param url Relative URL path.
   * @return Absolute URL based on the current route.
   */
  normalizeExternalUrl(url: string): string {
    if (this.isExternalUrl(url)) {
      return url;
    }
    const urlTree = this.getUrlTree(url);
    const serializedUrl = this.router.serializeUrl(urlTree);
    return this.locationStrategy.prepareExternalUrl(serializedUrl);
  }

  /**
   * Scroll view to the anchor corresponding to current route fragment.
   */
  scrollToAnchor(): void {
    const url = this.router.parseUrl(this.router.url);
    if (url.fragment) {
      this.navigate(this.router.url, true);
    }
  }

  /**
   * Configures the top offset used when scrolling to an anchor.
   * @param offset A position in screen coordinates (a tuple with x and y values)
   * or a function that returns the top offset position.
   */
  setOffset(...params: Parameters<ViewportScroller['setOffset']>): void {
    this.viewportScroller.setOffset(...params);
  }

  private getUrlTree(url: string): UrlTree {
    const urlPath = this.stripFragment(url) || this.stripFragment(this.router.url);
    const urlFragment = this.router.parseUrl(url).fragment || undefined;
    return this.router.createUrlTree([urlPath], { relativeTo: this.route, fragment: urlFragment });
  }

  private isExternalUrl(url: string): boolean {
    return /^(?!http(s?):\/\/).+$/.exec(url) == null;
  }

  private isRouterLink(element: HTMLAnchorElement): boolean {
    return element.getAttributeNames().some(n => n.startsWith('_ngcontent'));
  }

  private stripFragment(url: string): string {
    return /[^#]*/.exec(url)![0];
  }
}
