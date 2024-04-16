import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendConfig } from '../common/backend.config';
import { BuhDropdownList } from './classes/buh-dropdown-list';

@Injectable({ providedIn: 'root' })
export class BuhService {
  constructor(private http: HttpClient, private be: BackendConfig) {}

  getDropdowns(): Observable<BuhDropdownList> {
    return this.http.get<BuhDropdownList>(
      this.be.auto('buh/dropdown'),
      this.be.cookie
    );
  }

  getContractors(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(
      this.be.auto('buh/contractor'),
      this.be.cookie
    );
  }

  getInitiators(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(
      this.be.auto('buh/initiator'),
      this.be.cookie
    );
  }
}
