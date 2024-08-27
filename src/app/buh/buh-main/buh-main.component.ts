import { DatePipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { Dictionaries } from '../../common/dictionaries';
import { SessionService } from '../../common/session.service';
import { Variables } from '../../common/variables';
import { BuhService } from '../buh.service';
import { BuhDropdownList } from '../classes/buh-dropdown-list';
import { BuhEntityIdNameBool } from '../classes/buh-entity-id-name-bool';
import { BuhMainService } from './buh-main.service';
import { BuhMainFilter } from './classes/buh-main-filter';
import { BuhMainTable } from './classes/buh-main-table';

@Component({
  selector: 'app-buh-main',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    NgClass,
    NgxMaskDirective,
    JsonPipe,
    DatePipe,
  ],
  templateUrl: 'buh-main.component.html',
  styleUrl: '../../../assets/styles/components/buh-main.sass',
})
export class BuhMainComponent implements OnInit {
  constructor(
    private service: BuhMainService,
    public filter: BuhMainFilter,
    private route: ActivatedRoute,
    private vars: Variables,
    private router: Router,
    private session: SessionService,
    private buhService: BuhService
  ) {}

  year: number = 0;
  month: number = 0;

  assetLoading: string = Dictionaries.path.status.loading.img;
  assetNotFound: string = Dictionaries.path.status.notFound.img;
  loadingPage: string = this.assetLoading;

  textLoading: string = Dictionaries.path.status.loading.text;
  textNotFound: string = Dictionaries.path.status.notFound.text;
  loadingPlate: string = this.textLoading;

  table: BuhMainTable[] = [];
  editedRows: BuhMainTable[] = [];
  dd: BuhDropdownList = new BuhDropdownList();

  contractors: BuhEntityIdNameBool[] = [];
  initiators: BuhEntityIdNameBool[] = [];
  abouts: BuhEntityIdNameBool[] = [];
  marks: BuhEntityIdNameBool[] = [];
  statuses: BuhEntityIdNameBool[] = [];

  contractorsFilter: string = '';
  initiatorsFilter: string = '';
  contractorsFiltered: BuhEntityIdNameBool[] = [];
  initiatorsFiltered: BuhEntityIdNameBool[] = [];

  isChanged: boolean = false;
  filterIsOpened: boolean[] = [
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  ngOnInit(): void {
    this.dateViaUrl().then(() => this.tableUpdate());
    this.getDropdowns();
    this.getContractors();
    this.getInitiators();
    this.syncFilterDate();
  }
  allow(): boolean {
    return this.session.allow([2]);
  }
  filterInputDateString: string = '';
  filterInputDate(): void {
    const year = +this.filterInputDateString.split('-')[0];
    const month = +this.filterInputDateString.split('-')[1];
    this.router.navigateByUrl(`buh/main/${year}/${month}`);
    this.dateViaUrl().then(() => this.tableUpdate());
  }
  dateViaUrl(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.route.params.subscribe((params) => {
        let updatedYear = false;
        let updatedMonth = false;
        if (params['year'] >= 2000 && params['year'] <= 2100) {
          this.vars.buh.main.year.setYear(+params['year']);
          updatedYear = true;
        }
        if (params['month'] >= 1 && params['month'] <= 12) {
          this.vars.buh.main.month.setMonth(+params['month']);
          updatedMonth = true;
        }
        const year = this.vars.buh.main.year.getYear();
        const month = this.vars.buh.main.month.getMonth();
        const yerMonString = (): string => {
          if (month < 10) return `${year}-0${month}`;
          else return `${year}-${month}`;
        };
        if (!updatedYear || !updatedMonth)
          this.router.navigateByUrl(`buh/main/${year}/${month}`);
        this.filterInputDateString = yerMonString();
        resolve();
      });
    });
  }
  getContractors(): void {
    this.buhService.getContractors().subscribe({
      next: (data: { id: number; name: string }[]) => {
        this.contractors = [];
        data.map((item): void => {
          if (this.ddFilterManager.check('contractor', item.id))
            this.contractors.push({
              id: item.id,
              name: item.name,
              isChecked: true,
            });
          else
            this.contractors.push({
              id: item.id,
              name: item.name,
              isChecked: false,
            });
        });
        this.contractors.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        this.contractorsFiltered = this.contractors
      },
    });
  }
  getInitiators(): void {
    this.buhService.getInitiators().subscribe({
      next: (data: { id: number; name: string }[]) => {
        this.initiators = [];
        data.map((item): void => {
          if (this.ddFilterManager.check('initiator', item.id))
            this.initiators.push({
              id: item.id,
              name: item.name,
              isChecked: true,
            });
          else
            this.initiators.push({
              id: item.id,
              name: item.name,
              isChecked: false,
            });
        });
        this.initiators.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        this.initiatorsFiltered = this.initiators;
      },
    });
  }
  getDropdowns(): void {
    this.buhService.getDropdowns().subscribe({
      next: (data: BuhDropdownList) => {
        this.dd = data;
        this.abouts = [];
        data.about.map((item) => {
          if (this.ddFilterManager.check('about', item.id))
            this.abouts.push({ id: item.id, name: item.text, isChecked: true });
          else
            this.abouts.push({
              id: item.id,
              name: item.text,
              isChecked: false,
            });
        });
        this.marks = [];
        data.mark.map((item) => {
          if (this.ddFilterManager.check('mark', item.id))
            this.marks.push({ id: item.id, name: item.text, isChecked: true });
          else
            this.marks.push({ id: item.id, name: item.text, isChecked: false });
        });
        this.statuses = [];
        data.status.map((item) => {
          if (this.ddFilterManager.check('status', item.id))
            this.statuses.push({
              id: item.id,
              name: item.text,
              isChecked: true,
            });
          else
            this.statuses.push({
              id: item.id,
              name: item.text,
              isChecked: false,
            });
        });
      },
    });
  }
  tableUpdate(): void {
    this.loadingPlate = this.textLoading;
    this.loadingPage = this.assetLoading;
    const year = this.vars.buh.main.year.getYear();
    const month = this.vars.buh.main.month.getMonth();
    this.filter.inputDate.from = new Date(year, month - 1, 1);
    this.filter.inputDate.to = new Date(year, month, 1);
    this.service.get().subscribe({
      next: (data: BuhMainTable[]) => {
        this.table = data.map((row) => {
          if (row.copyDate)
            row.copyDate_string = row.copyDate.toString().split('T')[0];
          if (row.origDate)
            row.origDate_string = row.origDate.toString().split('T')[0];
          return row;
        });
        this.loadingPlate = '';
        if (data.length === 0) {
          this.loadingPage = this.assetNotFound;
          this.loadingPlate = this.textNotFound;
        }
      },
    });
  }
  control(row: BuhMainTable): number {
    switch (row.mark.id) {
      case 0:
        return 3;
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      default:
        return 3;
    }
  }
  submit(): void {
    this.service.edit(this.editedRows).subscribe({
      next: (data: boolean) => {
        if (data) {
          this.editedRows = [];
          this.isChanged = false;
          this.tableUpdate();
        }
      },
    });
  }

  filterCopyDateFrom: string = '';
  filterCopyDateTo: string = '';
  filterOrigDateFrom: string = '';
  filterOrigDateTo: string = '';
  syncFilterDate(name: string = 'all'): void {
    switch (name) {
      case 'all':
        this.filterCopyDateFrom = this.filter.copyDate.from
          .toString()
          .split('T')[0];
        this.filterCopyDateTo = this.filter.copyDate.to
          .toString()
          .split('T')[0];
        this.filterOrigDateFrom = this.filter.origDate.from
          .toString()
          .split('T')[0];
        this.filterOrigDateTo = this.filter.origDate.to
          .toString()
          .split('T')[0];
        break;
      case 'copyDateFrom':
        // if (this.filterCopyDateFrom === '')
        //   this.filterCopyDateFrom = this.filter.copyDate.from
        //     .toString()
        //     .split('T')[0];
        // else
        this.filter.copyDate.from = new Date(this.filterCopyDateFrom);
        break;
      case 'copyDateTo':
        // if (this.filterCopyDateTo === '')
        //   this.filterCopyDateTo = this.filter.copyDate.to
        //     .toString()
        //     .split('T')[0];
        // else
        this.filter.copyDate.to = new Date(this.filterCopyDateTo);
        break;
      case 'origDateFrom':
        // if (this.filterOrigDateFrom === '')
        //   this.filterOrigDateFrom = this.filter.origDate.from
        //     .toString()
        //     .split('T')[0];
        // else
        this.filter.origDate.from = new Date(this.filterOrigDateFrom);
        break;
      case 'origDateTo':
        // if (this.filterOrigDateTo === '')
        //   this.filterOrigDateTo = this.filter.origDate.to
        //     .toString()
        //     .split('T')[0];
        // else
        this.filter.origDate.to = new Date(this.filterOrigDateTo);
        break;
    }
  }
  setFilterDateToDefault(name: string) {
    switch (name) {
      case 'copyDate':
        this.filterCopyDateFrom = '';
        this.filterCopyDateTo = '';
        this.filter.copyDate.from = new Date(2000, 0, 0);
        this.filter.copyDate.to = new Date(2100, 0, 0);
        this.filter.copyDate.null = true;
        break;
      case 'origDate':
        this.filterOrigDateFrom = '';
        this.filterOrigDateTo = '';
        this.filter.origDate.from = new Date(2000, 0, 0);
        this.filter.origDate.to = new Date(2100, 0, 0);
        this.filter.origDate.null = true;
        break;
    }
  }

  onChange(row: BuhMainTable, key: string, value: any = null): void {
    switch (key) {
      case 'sumClosing':
        row.isChanged_sumClosing = true;
        break;

      case 'about':
        row.isChanged_about = true;
        row.about = this.dd.about[value.value];
        break;

      case 'mark':
        row.isChanged_mark = true;
        row.mark = this.dd.mark[value.value];
        break;

      case 'status':
        row.isChanged_status = true;
        row.status = this.dd.status[value.value];
        break;

      case 'copyDate':
        row.copyDate = new Date(row.copyDate_string);
        row.isChanged_copyDate = true;
        break;

      case 'origDate':
        row.origDate = new Date(row.origDate_string);
        row.isChanged_origDate = true;
        break;

      case 'title':
        row.isChanged_title = true;
        break;
    }
    this.isChanged = true;
    const id = row.id;
    this.editedRows = this.editedRows.filter((row) => row.id !== id);
    this.editedRows.push(row);
  }

  selectedRow: BuhMainTable | null = null;
  toggleSelected(row: BuhMainTable) {
    if (this.selectedRow === row) this.selectedRow = null;
    else this.selectedRow = row;
  }

  filterToggle(key: number) {
    this.filterIsOpened.forEach((value, index) => {
      if (index !== key) this.filterIsOpened[index] = false;
    });
    this.filterIsOpened[key] = !this.filterIsOpened[key];
  }

  toggleCheckbox(element: BuhEntityIdNameBool) {
    const checkbox = document.getElementById(
      element.id.toString()
    ) as HTMLInputElement;
    element.isChecked = !element.isChecked;
    checkbox.checked = !checkbox.checked;
  }

  ddFilterManager = {
    confirm: (name: string): void => {
      switch (name) {
        case 'contractor':
          this.filter.contractor = [];
          this.contractors.map((item) => {
            if (item.isChecked) this.filter.contractor.push(item.id);
          });
          break;
        case 'initiator':
          this.filter.initiator = [];
          this.initiators.map((item) => {
            if (item.isChecked) this.filter.initiator.push(item.id);
          });
          break;
        case 'about':
          this.filter.about = [];
          this.abouts.map((item) => {
            if (item.isChecked) this.filter.about.push(item.id);
          });
          break;
        case 'mark':
          this.filter.mark = [];
          this.marks.map((item) => {
            if (item.isChecked) this.filter.mark.push(item.id);
          });
          break;
        case 'status':
          this.filter.status = [];
          this.statuses.map((item) => {
            if (item.isChecked) this.filter.status.push(item.id);
          });
          break;
        default:
          throw new Error('o kurwa!');
      }
      this.tableUpdate();
    },
    reset: (name: string): void => {
      switch (name) {
        case 'contractor':
          this.filter.contractor = [];
          this.contractors.forEach((element) => (element.isChecked = false));
          break;
        case 'initiator':
          this.filter.initiator = [];
          this.initiators.forEach((element) => (element.isChecked = false));
          break;
        case 'about':
          this.filter.about = [];
          this.abouts.forEach((element) => (element.isChecked = false));
          break;
        case 'mark':
          this.filter.mark = [];
          this.marks.forEach((element) => (element.isChecked = false));
          break;
        case 'status':
          this.filter.status = [];
          this.statuses.forEach((element) => (element.isChecked = false));
          break;
        default:
          throw new Error('o kurwa!');
      }
    },
    check: (name: string, id: number): boolean => {
      switch (name) {
        case 'contractor':
          return this.filter.contractor.includes(id);
        case 'initiator':
          return this.filter.initiator.includes(id);
        case 'about':
          return this.filter.about.includes(id);
        case 'mark':
          return this.filter.mark.includes(id);
        case 'status':
          return this.filter.mark.includes(id);
        default:
          throw new Error('o kurwa!');
      }
    },
  };

  formatDate(inputDate: string | Date): string {
    const date: Date = new Date(inputDate);
    const day: string = String(date.getDate()).padStart(2, '0');
    const month: string = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы в JavaScript начинаются с 0
    const year: number = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  filterContractors() {
    this.contractorsFiltered = this.contractors.filter(contractor =>
        contractor.name.toLowerCase().includes(this.contractorsFilter.toLowerCase())
    );
  }

  filterInitiators() {
    this.initiatorsFiltered = this.initiators.filter(initiator =>
        initiator.name.toLowerCase().includes(this.initiatorsFilter.toLowerCase())
    );
  }
}
