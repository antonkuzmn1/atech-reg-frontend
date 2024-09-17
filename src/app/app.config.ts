import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';

import {HttpClientModule} from '@angular/common/http';
import {provideEnvironmentNgxMask} from 'ngx-mask';
import {routes} from './app.routes';
import {BackendConfig} from './common/backend.config';
import {ModalComponent} from './common/modal.component';
import {provideServiceWorker} from '@angular/service-worker';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideToastr} from "ngx-toastr";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        importProvidersFrom(HttpClientModule),
        provideEnvironmentNgxMask(),
        BackendConfig,
        ModalComponent,
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
        }),
        provideAnimations(),
        provideToastr()
    ],
};
