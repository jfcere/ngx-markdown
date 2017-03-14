import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { MarkdownDemoModule } from './app/markdown-demo/markdown-demo.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(MarkdownDemoModule);
