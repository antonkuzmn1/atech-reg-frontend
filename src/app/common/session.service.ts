import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendConfig } from './backend.config';

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(private http: HttpClient, private be: BackendConfig) {}

  public groups: number[] = [];

  get(): void {
    this.http
      .get<number[]>(this.be.auto('session'), this.be.cookie)
      .subscribe({
        next: (data: number[]) => (this.groups = data),
      });
  }

  auth(data: { login: string; password: string }): void {
    this.http
      .post<void>(
        this.be.auto('session/auth'),
        JSON.stringify(data),
        this.be.cookie
      )
      .subscribe({
        next: () => this.get(),
      });
  }

  logout(): void {
    this.http
      .get<void>(this.be.auto('session/logout'), this.be.cookie)
      .subscribe({
        next: () => this.get(),
      });
  }

  allow(ids: number[]): boolean {
    ids.push(1);
    return this.groups.some((id) => ids.includes(id));
  }
}
