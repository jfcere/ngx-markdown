import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, SecurityContext } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import {
  CLIPBOARD_OPTIONS,
  MarkdownModule,
  MARKED_OPTIONS,
} from 'ngx-markdown';
import { AppRoutingModule } from '@app/app-routing.module';
import { markedOptionsFactory } from '@app/marked-options-factory';
import { AnchorService } from '@shared/anchor/anchor.service';
import { ClipboardButtonComponent } from '@shared/clipboard-button';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      AppRoutingModule,
      MarkdownModule.forRoot({
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
      })),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
