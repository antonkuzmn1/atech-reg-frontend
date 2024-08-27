import { DatePipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { Dictionaries } from '../../common/dictionaries';
import { ModalComponent } from '../../common/modal.component';
import { SessionService } from '../../common/session.service';
import { Variables } from '../../common/variables';
import { BuhService } from '../buh.service';
import { BuhDropdownList } from '../classes/buh-dropdown-list';
import { BuhEntityIdNameBool } from '../classes/buh-entity-id-name-bool';
import { BuhAllService } from './buh-all.service';
import { BuhAllFilter } from './classes/buh-all-filter';
import { BuhAllFilterDate } from './classes/buh-all-filter-date';
import { BuhAllNew } from './classes/buh-all-new';
import { BuhAllTable } from './classes/buh-all-table';

@Component({
  selector: 'app-buh-all',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    NgClass,
    NgxMaskDirective,
    JsonPipe,
    DatePipe,
    ModalComponent,
  ],
  templateUrl: './buh-all.component.html',
  styleUrl: '../../../assets/styles/components/buh-all.sass',
})
export class BuhAllComponent implements OnInit {
  constructor(
    private service: BuhAllService,
    public filter: BuhAllFilter,
    private route: ActivatedRoute,
    private vars: Variables,
    private router: Router,
    private session: SessionService,
    public buhService: BuhService,
    public modal: ModalComponent,
    public formNew: BuhAllNew,
  ) { }

  ngOnInit(): void {
    this.dateViaUrl().then(() => this.tableUpdate());
    this.getDropdowns();
    this.getContractors();
    this.getInitiators();
    this.syncFilterDate();
  }

  /* ACCESS
   * for allow any other group's id put into array it
   * example: this.session.allow([2, 3, 4, 5])
   *
   * tip: first id already putted in SessionConfig as default
   */
  allow(): boolean { return this.session.allow([2]) }

  /* ROUTING TOOLS
   * filterInputDate() can get the year and mon from template's input
   * and put it direct into url
   * example: "buh/all/2024/2"
   * then that will summon dateViaUrl with promise
   * after resolve table will update
   *
   * dateViaUrl() can get the url params and synhronyze it in memory like mirror
   * if url is empty or has incorrect params, default data will be putted into memory
   */
  filterInputDateString: string = '';
  filterInputDate(): void {
    const year = +this.filterInputDateString.split('-')[0];
    const month = +this.filterInputDateString.split('-')[1];
    this.router.navigateByUrl(`buh/all/${year}/${month}`);
    this.dateViaUrl().then(() => this.tableUpdate());
  }
  dateViaUrl(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.route.params.subscribe((params) => {
        let updatedYear = false;
        let updatedMonth = false;
        if (params['year'] >= 2000 && params['year'] <= 2100) {
          this.vars.buh.all.year.setYear(+params['year']);
          updatedYear = true;
        }
        if (params['month'] >= 1 && params['month'] <= 12) {
          this.vars.buh.all.month.setMonth(+params['month']);
          updatedMonth = true;
        }
        const year = this.vars.buh.all.year.getYear();
        const month = this.vars.buh.all.month.getMonth();
        const yerMonString = (): string => {
          if (month < 10) return `${year}-0${month}`;
          else return `${year}-${month}`;
        };
        if (!updatedYear || !updatedMonth)
          this.router.navigateByUrl(`buh/all/${year}/${month}`);
        this.filterInputDateString = yerMonString();
        resolve();
      });
    });
  }

  /* DROPDOWNS
   * this parts can get the dropdown's data
   */
  contractors: BuhEntityIdNameBool[] = [];
  contractorsFilter: string = '';
  contractorsFiltered: BuhEntityIdNameBool[] = [];
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
  filterContractors() {
    this.contractorsFiltered = this.contractors.filter(contractor =>
        contractor.name.toLowerCase().includes(this.contractorsFilter.toLowerCase())
    );
  }
  initiators: BuhEntityIdNameBool[] = [];
  initiatorsFilter: string = '';
  initiatorsFiltered: BuhEntityIdNameBool[] = [];
  getInitiators(): void {
    this.buhService.getInitiators().subscribe({
      next: (data: { id: number; name: string }[]) => {
        this.initiators = [];
        data.map((item): void => {
          if (this.ddFilterManager.check('initiator', item.id))
            this.initiators.push({ id: item.id, name: item.name, isChecked: true, });
          else
            this.initiators.push({ id: item.id, name: item.name, isChecked: false, });
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
  filterInitiators() {
    this.initiatorsFiltered = this.initiators.filter(initiator =>
        initiator.name.toLowerCase().includes(this.initiatorsFilter.toLowerCase())
    );
  }
  dd: BuhDropdownList = new BuhDropdownList();
  marks: BuhEntityIdNameBool[] = [];
  statuses: BuhEntityIdNameBool[] = [];
  getDropdowns(): void {
    this.buhService.getDropdowns().subscribe({
      next: (data: BuhDropdownList) => {
        this.dd = data;
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
            this.statuses.push({ id: item.id, name: item.text, isChecked: true, });
          else
            this.statuses.push({ id: item.id, name: item.text, isChecked: false, });
        });
      },
    });
  }

  /* TABLE MANAGER
   * this is tableManager...
   *
   * tableManager can update the table data:
   * tableUpdate();
   *
   * also can submit the new values to the backend:
   * submin();
   * no need to put the array into function's input, that stored into memory
   *
   * dictionary "loadingElements" stores loadingElements pages
   */
  loadingElements = {
    img: Dictionaries.path.status.loading.img,
    text: Dictionaries.path.status.loading.text,
  };
  table: BuhAllTable[] = [];
  editedRows: BuhAllTable[] = [];
  isChanged: boolean = false;
  tableUpdate(): void {
    this.loadingElements.text = Dictionaries.path.status.loading.text;
    this.loadingElements.img = Dictionaries.path.status.loading.img;
    const year = this.vars.buh.all.year.getYear();
    const month = this.vars.buh.all.month.getMonth();
    this.filter.inputDate.from = new Date(year, month - 1, 1);
    this.filter.inputDate.to = new Date(year, month, 1);
    this.service.get().subscribe({
      next: (data: BuhAllTable[]) => {
        this.table = data.map((row) => {
          if (row.copyDate)
            row.copyDate_string = row.copyDate.toString().split('T')[0];
          if (row.origDate)
            row.origDate_string = row.origDate.toString().split('T')[0];
          return row;
        });

        this.loadingElements.text = '';
        if (data.length === 0) {
          this.loadingElements.img = Dictionaries.path.status.notFound.img;
          this.loadingElements.text = Dictionaries.path.status.notFound.text;
        }
      },

    });
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
  newRow(): void {
    this.formNew.submit().then((value: boolean) => {
      console.log(value);

      if (value) {
        this.modal.close()
        this.tableUpdate()
      }
    })
  }

  /* DATE FILTERS
   * case name all: load all filters from the memory
   * case name else: set filter param into the memory
   * example: (change)="syncFilterDate('copyDate', 'from')"
   *
   * second function will reset the filter (in memory too)
   * example: (click)="setFilterDateToDefault('copyDate')"
   */
  syncFilterDate(name: string = 'all', type: string = ''): void {
    if (name === 'all')
      for (const key in this.filter) {
        const prop = key as keyof BuhAllFilter;
        if (
          Object.prototype.hasOwnProperty.call(this.filter, key) &&
          this.filter[prop] instanceof BuhAllFilterDate
        ) {
          const obj = this.filter[prop] as BuhAllFilterDate;
          obj.string.from = obj.from.toString().split('T')[0];
          obj.string.to = obj.to.toString().split('T')[0];
        }
      }
    else if (
      Object.prototype.hasOwnProperty.call(this.filter, name) &&
      this.filter[name as keyof BuhAllFilter] instanceof BuhAllFilterDate
    ) {
      const obj = this.filter[name as keyof BuhAllFilter] as BuhAllFilterDate;
      if (type === 'from' || type === 'to')
        obj[type] = new Date(obj.string[type]);
    }
  }
  setFilterDateToDefault(name: keyof BuhAllFilter): void {
    if (this.filter[name] instanceof BuhAllFilterDate) {
      const filterDate = this.filter[name] as BuhAllFilterDate;
      filterDate.from = new Date(2000, 0, 0);
      filterDate.to = new Date(2100, 0, 0);
      filterDate.isNull = true;
      filterDate.string.from = '';
      filterDate.string.to = '';
    }
  }

  /* ONCHANGE EVENTER FOR CELLS
   * onchange event into for marking cell as edited
   */
  onChange(row: BuhAllTable, key: string, value: any = null): void {
    switch (key) {
      // case 'copyDate':
      //   row.copyDate = new Date(row.copyDate_string);
      //   row.copyDate_isChanged = true;
      //   break;
      // case 'origDate':
      //   row.origDate = new Date(row.origDate_string);
      //   row.origDate_isChanged = true;
      //   break;
      // case 'date':
      //   row.date = new Date(row.date_string);
      //   row.date_isChanged = true;
      //   break;

      // case 'contractor':
      //   row.contractor_isChanged = true;
      //   row.contractor = this.contractors[value.value];
      //   break;
      case 'initiator':
        const newInitiator = this.initiators.find(val => val.id === parseInt(value.value))
        if (newInitiator) {
          row.initiator.id = newInitiator.id
          row.initiator.name = newInitiator.name
          row.initiator_isChanged = true
        }
        break;
      case 'mark':
        row.mark_isChanged = true;
        row.mark = this.dd.mark[value.value];
        break;
      // case 'status':
      //   row.status_isChanged = true;
      //   row.status = this.dd.status[value.value];
      //   break;

      // case 'destination':
      //   row.destination_isChanged = true;
      //   break;
      case 'title':
        row.title_isChanged = true;
        break;

      // case 'sum':
      //   row.sum_isChanged = true;
      //   break;
      // case 'number':
      //   row.number_isChanged = true;
      //   break;
    }
    this.isChanged = true;
    const id = row.id;
    this.editedRows = this.editedRows.filter((row) => row.id !== id);
    this.editedRows.push(row);
  }

  /* ROW HIGHLIGHTER
   * row highlighting
   */
  selectedRow: BuhAllTable | null = null;
  toggleSelected(row: BuhAllTable) {
    if (this.selectedRow === row) this.selectedRow = null;
    else this.selectedRow = row;
  }

  /* TOGGLE FILTERS
   * toggle filters in header
   */
  filterIsOpened: boolean[] = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  filterToggle(key: number) {
    this.filterIsOpened.forEach((value, index) => {
      if (index !== key) this.filterIsOpened[index] = false;
    });
    this.filterIsOpened[key] = !this.filterIsOpened[key];
  }

  /* TOGGLE CHECKBOXES
   * that is used instead of a lable-tag
   * that's how it should be ¯\_(ツ)_/¯
   */
  toggleCheckbox(element: BuhEntityIdNameBool) {
    const checkbox = document.getElementById(
      element.id.toString()
    ) as HTMLInputElement;
    element.isChecked = !element.isChecked;
    checkbox.checked = !checkbox.checked;
  }

  /* OTHER FILTERS MANAGER
   * the names speak for themselves
   */
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
        case 'mark':
          return this.filter.mark.includes(id);
        case 'status':
          return this.filter.status.includes(id);
        default:
          throw new Error('o kurwa!');
      }
    },
  };
}
