import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, SecurityContext } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { ClipboardOptions, MARKDOWN_EXTENSIONS, MarkedOptions } from 'ngx-markdown';
import { provideMarkdown } from 'ngx-markdown';
import { markedOptionsFactory } from '@app/marked-options-factory';
import { AnchorService } from '@shared/anchor/anchor.service';
import { ClipboardButtonComponent } from '@shared/clipboard-button';
import { appRoutes } from './app-routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideMarkdown({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
        deps: [AnchorService],
      },
      clipboardOptions: {
        provide: ClipboardOptions,
        useValue: {
          buttonComponent: ClipboardButtonComponent,
        },
      },
      sanitize: SecurityContext.NONE,
    }),
    provideRouter(appRoutes, withInMemoryScrolling({scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled'})),
    {
      provide: MARKDOWN_EXTENSIONS,
      useValue: [gfmHeadingId()],
    },
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
