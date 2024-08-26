import { Injectable } from '@angular/core';

@Injectable()
export class BackendConfig {
  public auto(path: string = ''): string {
    if (window.location.origin === 'http://localhost:4200')
      return 'http://localhost:8080/' + path;
    else return window.location.origin + '/api/' + path;
  }

  public cookie: { withCredentials: boolean } = { withCredentials: true };
}
