import { NgFor, NgIf } from '@angular/common';
import {Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { Dictionaries } from '../../common/dictionaries';
import { BuhImportService } from './buh-import.service';
import { BuhImportParserParams } from './classes/buh-import-parser-params';
import { BuhImportResult } from './classes/buh-import-result';
import { BuhImportRow } from './classes/buh-import-row';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-buh-import',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
  ],
  templateUrl: 'buh-import.component.html',
  styleUrl: '../../../assets/styles/components/buh-import.sass'
})
export class BuhImportComponent {
  constructor(
    private service: BuhImportService,
    private toastr: ToastrService,
  ) { }
  file!: File;
  jsonData: BuhImportRow[] = [];
  firstAndLastRows: { index: number, row: any }[] = [];
  pp = new BuhImportParserParams();
  insertedRows: number = 0;

  onFileChange(event: any) {
    this.file = event.target.files[0];
    this.convertToJSON();
  }

  convertToJSON() {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (e.target !== null) {
          const data = new Uint8Array(e.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          this.jsonData = [];
          for (let i = parseInt(this.pp.start); i !== parseInt(this.pp.stop) + 1; i++) {
            const getValueOfCell = function (letter: string): string | number {
              try {
                const value = sheet[letter + i].v;
                if (value === undefined) return '';
                else return sheet[letter + i].v;
              } catch (e) { throw new Error('o kurwa') }
            };
            const cellToDate = function (inputDate: string): Date {
              try {
                const dateString: string | number = getValueOfCell(inputDate);
                if (typeof dateString !== 'string'
                  || dateString === '') throw new Error('o kurwa');
                const DMY: string[] = dateString.split('.');
                const day: string = DMY[0];
                const mon: string = DMY[1];
                const yer: string = DMY[2];
                const formattedDateString: string = `${yer}-${mon}-${day}`;
                return new Date(formattedDateString);
              } catch (e) { throw new Error('o kurwa') }
            };
            try {
              const inputDate: Date = cellToDate(this.pp.inputDate);
              const contrAgent: string | number = getValueOfCell(this.pp.contrAgent);
              const paymentDestination: string | number = getValueOfCell(this.pp.paymentDestination);
              const initiatorOfPayment: string | number = getValueOfCell(this.pp.initiatorOfPayment);
              const sum: string | number = getValueOfCell(this.pp.sum);
              if (!(inputDate instanceof Date)) throw new Error();
              if (typeof contrAgent !== 'string') throw new Error();
              if (typeof paymentDestination !== 'string') throw new Error();
              if (typeof initiatorOfPayment !== 'string') {
                console.log(initiatorOfPayment);
                throw new Error()
              };
              if (typeof sum !== 'number') throw new Error();

              const row: BuhImportRow = new BuhImportRow(inputDate, contrAgent, paymentDestination, initiatorOfPayment, sum,);
              this.jsonData.push(row);
            } catch (e) { throw new Error('o kurwa') }
          }
          this.firstAndLastRows = [];
          for (let i = 0; i !== 5; i++)
            this.firstAndLastRows.push({
              index: i + parseInt(this.pp.start),
              row: this.jsonData[i],
            });
          for (let i = this.jsonData.length - 5; i !== this.jsonData.length; i++)
            this.firstAndLastRows.push({
              index: i + parseInt(this.pp.start),
              row: this.jsonData[i],
            });
        }
      } catch (e) {
        this.jsonData = [];
        this.firstAndLastRows = [];
      }
    };
    reader.readAsArrayBuffer(this.file);
  }

  dateToString(date: Date) {
      if (!date) {
          return '';
      }
      const day = date.getDate();
      const month = Dictionaries.date.month.full.lower.russian.genetive[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month} ${year} г.`;
  }

  upload(): void {
    if (this.jsonData.find(row => row.paymentDestination === "")) {
        this.toastr.error('Поле "Назначение платежа" не может быть пустым');
        return;
    }
    this.service.upload(this.jsonData).subscribe({
      next: (result: BuhImportResult) => {
        console.log(result);
        this.insertedRows = result.insertedRows;
        this.jsonData = [];
        this.firstAndLastRows = [];
      }
    });
  }
}
