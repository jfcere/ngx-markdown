import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  Input,
  NgZone,
} from '@angular/core';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MarkdownComponent } from 'ngx-markdown';
import { ScrollspyNavComponent } from '@shared/scrollspy-nav';
import { ZOOM_ANIMATION } from './scrollspy-nav-layout.animation';

@Component({
  animations: [ZOOM_ANIMATION],
  selector: 'app-scrollspy-nav-layout',
  templateUrl: './scrollspy-nav-layout.component.html',
  styleUrls: ['./scrollspy-nav-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ExtendedModule,
    FlexModule,
    MarkdownComponent,
    MatButtonModule,
    MatDividerModule,
    ScrollspyNavComponent,
  ],
})
export class ScrollspyNavLayoutComponent {
  @Input()
  headings: Element[] | undefined;

  showScrollUpButton = false;

  constructor() {
    const ngZone = inject(NgZone);
    const destroyRef = inject(DestroyRef);
    const ref = inject(ChangeDetectorRef);

    ngZone.runOutsideAngular(() => {
      const onScroll = () => {
        const showScrollUpButton = Math.ceil(window.pageYOffset) > 64;
        if (this.showScrollUpButton === showScrollUpButton) return;
        this.showScrollUpButton = showScrollUpButton;
        ref.detectChanges();
      };
      window.addEventListener('scroll', onScroll);
      destroyRef.onDestroy(() =>
        window.removeEventListener('scroll', onScroll),
      );
    });
  }

  onScrollUp(): void {
    window.scrollTo(0, 0);
    location.hash = '';
  }
}
