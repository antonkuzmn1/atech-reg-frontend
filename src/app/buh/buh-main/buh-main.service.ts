import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendConfig } from '../../common/backend.config';
import { BuhMainFilter } from './classes/buh-main-filter';
import { BuhMainTable } from './classes/buh-main-table';

@Injectable({ providedIn: 'root' })
export class BuhMainService {
  constructor(
    private http: HttpClient,
    private filter: BuhMainFilter,
    private be: BackendConfig,
  ) {}

  get(): Observable<BuhMainTable[]> {
    return this.http.post<BuhMainTable[]>(
      this.be.auto('buh/table/main'),
      JSON.stringify(this.filter),
      this.be.cookie
    );
  }

  edit(data: BuhMainTable[]): Observable<boolean> {
    return this.http.post<boolean>(
      this.be.auto('buh/table/main/edit'),
      JSON.stringify(data),
      this.be.cookie
    );
  }

}
