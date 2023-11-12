import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, SecurityContext } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { CLIPBOARD_OPTIONS, MARKED_OPTIONS, provideMarkdown } from 'ngx-markdown';
import { appRoutes } from '@app/app-routes';
import { markedOptionsFactory } from '@app/marked-options-factory';
import { AnchorService } from '@shared/anchor/anchor.service';
import { ClipboardButtonComponent } from '@shared/clipboard-button';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(appRoutes),
    provideMarkdown({
      loader: HttpClient,
      markedOptions: {
        provide: MARKED_OPTIONS,
        useFactory: markedOptionsFactory,
        deps: [AnchorService],
      },
      markedExtensions: [gfmHeadingId()],
      clipboardOptions: {
        provide: CLIPBOARD_OPTIONS,
        useValue: { buttonComponent: ClipboardButtonComponent },
      },
      sanitize: SecurityContext.NONE,
    }),
  ],
};
