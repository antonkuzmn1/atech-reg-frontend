import { HttpClient } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendConfig } from '../../common/backend.config';
import { BuhImportResult } from './classes/buh-import-result';
import { BuhImportRow } from './classes/buh-import-row';

@Injectable({ providedIn: 'root' })
export class BuhImportService {
  constructor(private http: HttpClient, private be: BackendConfig) {}

  upload(jsonData: BuhImportRow[]): Observable<BuhImportResult> {
    return this.http.post<BuhImportResult>(
      this.be.auto('buh/upload'),
      JSON.stringify(jsonData),
      this.be.cookie
    );
  }
}
