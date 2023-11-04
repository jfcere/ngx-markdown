import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';
import { AppModule } from './app/app.module';
import './prism';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
