import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Variables {
  buh = {
    main: {
      year: {
        var: 0,
        getYear: function (): number {
          if (this.var === 0) this.var = new Date().getFullYear();
          return this.var;
        },
        setYear: function (year: number = 0): void {
          this.var = year;
        },
      },
      month: {
        var: 0,
        getMonth: function (): number {
          if (this.var === 0) this.var = new Date().getMonth() + 1;
          return this.var;
        },
        setMonth: function (month: number = 0): void {
          this.var = month;
        },
      },
    },
    all: {
      year: {
        var: 0,
        getYear: function (): number {
          if (this.var === 0) this.var = new Date().getFullYear();
          return this.var;
        },
        setYear: function (year: number = 0): void {
          this.var = year;
        },
      },
      month: {
        var: 0,
        getMonth: function (): number {
          if (this.var === 0) this.var = new Date().getMonth() +1;
          return this.var;
        },
        setMonth: function (month: number = 0): void {
          this.var = month;
        },
      },
    },
  };
}
