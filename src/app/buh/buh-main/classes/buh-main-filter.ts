import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BuhMainFilter {
  public inputDate: { from: Date; to: Date } = {
    from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
  };
  public copyDate: { from: Date; to: Date; null: boolean } = {
    from: new Date(2000, 0, 0),
    to: new Date(2100, 0, 0),
    null: true,
  };
  public origDate: { from: Date; to: Date; null: boolean } = {
    from: new Date(2000, 0, 0),
    to: new Date(2100, 0, 0),
    null: true,
  };

  public sum: { from: number; to: number } = {
    from: 0,
    to: 99999999999,
  };
  public sumClosing: { from: number; to: number } = {
    from: 0,
    to: 99999999999,
  };

  public contractor: number[] = [];
  public initiator: number[] = [];
  public about: number[] = [];
  public mark: number[] = [];
  public status: number[] = [];
  public destination: string = '';
  public title: string = '';
}
