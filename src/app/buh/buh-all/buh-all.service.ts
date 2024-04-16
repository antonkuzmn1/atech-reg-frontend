import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendConfig } from '../../common/backend.config';
import { BuhAllFilter } from './classes/buh-all-filter';
import { BuhAllNew } from './classes/buh-all-new';
import { BuhAllTable } from './classes/buh-all-table';

@Injectable({ providedIn: 'root' })
export class BuhAllService {
  constructor(
    private http: HttpClient,
    private filter: BuhAllFilter,
    private be: BackendConfig
  ) { }

  public get(): Observable<BuhAllTable[]> {
    return this.http.post<BuhAllTable[]>(
      this.be.auto('buh/table/all'), JSON.stringify(this.filter), this.be.cookie
    )
  }

  public edit(data: BuhAllTable[]): Observable<boolean> {
    return this.http.post<boolean>(
      this.be.auto('buh/table/all/edit'), JSON.stringify(data), this.be.cookie
    )
  }

  public new(data: BuhAllNew): Observable<boolean> {
    return this.http.post<boolean>(
      this.be.auto('buh/table/all/insert'), JSON.stringify(data), this.be.cookie
    )
  }
}
