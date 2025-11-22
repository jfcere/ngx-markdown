import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { CLIPBOARD_OPTIONS, MARKED_EXTENSIONS, MARKED_OPTIONS, MERMAID_OPTIONS, provideMarkdown, SANITIZE } from 'ngx-markdown';
import { appRoutes } from '@app/app-routes';
import { markedOptionsFactory, sanitizeHtml } from '@app/app.marked-config';
import { AnchorService } from '@shared/anchor/anchor.service';
import { ClipboardButtonComponent } from '@shared/clipboard-button';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideZoneChangeDetection(),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideMarkdown({
      loader: HttpClient,
      clipboardOptions: {
        provide: CLIPBOARD_OPTIONS,
        useValue: { buttonComponent: ClipboardButtonComponent },
      },
      markedOptions: {
        provide: MARKED_OPTIONS,
        useFactory: markedOptionsFactory,
        deps: [AnchorService],
      },
      markedExtensions: [
        {
          provide: MARKED_EXTENSIONS,
          useFactory: gfmHeadingId,
          multi: true,
        },
      ],
      mermaidOptions: {
        provide: MERMAID_OPTIONS,
        useValue: {
          darkMode: true,
          look: 'handDrawn',
        },
      },
      sanitize: {
        provide: SANITIZE,
        useValue: sanitizeHtml,
      },
    }),
  ],
};
