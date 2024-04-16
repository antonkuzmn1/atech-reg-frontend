import { Injectable } from '@angular/core';
import { BuhAllFilterDate } from './buh-all-filter-date';

@Injectable({ providedIn: 'root' })
export class BuhAllFilter {
  public inputDate: { from: Date; to: Date } = {
    from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  };
  public copyDate: BuhAllFilterDate = {
    from: new Date(2000, 0, 0),
    to: new Date(2100, 0, 0),
    isNull: true,
    string: { from: '', to: '' },
  };
  public origDate: BuhAllFilterDate = {
    from: new Date(2000, 0, 0),
    to: new Date(2100, 0, 0),
    isNull: true,
    string: { from: '', to: '' },
  };
  public mainDate: BuhAllFilterDate = {
    from: new Date(2000, 0, 0),
    to: new Date(2100, 0, 0),
    isNull: true,
    string: { from: '', to: '' },
  };

  public sum: { from: number; to: number } = {
    from: 0,
    to: 99999999999,
  };
  public number: { from: number; to: number } = {
    from: 0,
    to: 99999999999,
  };

  public contractor: number[] = [];
  public initiator: number[] = [];
  public mark: number[] = [];
  public status: number[] = [];
  public destination: string = '';
  public title: string = '';
}
