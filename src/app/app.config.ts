import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideTheme } from './design-system';
import { authenticationInterceptor } from './shares/interceptors';
import { CookieService } from 'ngx-cookie-service';
import { provideAuthCheck } from './features/authentication';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideTheme(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authenticationInterceptor])
    ),
    provideAuthCheck(),
    CookieService,
  ],
};
