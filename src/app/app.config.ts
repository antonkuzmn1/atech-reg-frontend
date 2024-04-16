import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { routes } from './app.routes';
import { BackendConfig } from './common/backend.config';
import { ModalComponent } from './common/modal.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideEnvironmentNgxMask(),
    BackendConfig,
    ModalComponent,
  ],
};
