import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, SecurityContext } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { ClipboardOptions, MARKDOWN_EXTENSIONS, MarkedOptions } from 'ngx-markdown';
import { provideMarkdown } from 'ngx-markdown';
import { AppRoutingModule } from '@app/app-routing.module';
import { markedOptionsFactory } from '@app/marked-options-factory';
import { AnchorService } from '@shared/anchor/anchor.service';
import { ClipboardButtonComponent } from '@shared/clipboard-button';

export const appConfig: ApplicationConfig = {
  providers: [
    provideMarkdown({
      loader: HttpClient,
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
    importProvidersFrom(AppRoutingModule),
    {
      provide: MARKDOWN_EXTENSIONS,
      useValue: [gfmHeadingId()],
    },
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
