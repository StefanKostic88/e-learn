import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { windowProvider } from './providers/windowProvider';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), windowProvider],
};
