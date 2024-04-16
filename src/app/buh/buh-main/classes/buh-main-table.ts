export class BuhMainTable {
  constructor(
    public id: number,

    public inputDate: Date,

    public contractor: { id: number; name: string },

    public destination: string,

    public initiator: { id: number; name: string },

    public sum: number,

    public sumClosing: number,
    public isChanged_sumClosing: boolean = false,

    public about: { id: number; text: string },
    public isChanged_about: boolean = false,

    public mark: { id: number; text: string },
    public isChanged_mark: boolean = false,

    public status: { id: number; text: string },
    public isChanged_status: boolean = false,

    public copyDate: Date,
    public copyDate_string: string,
    public isChanged_copyDate: boolean = false,

    public origDate: Date,
    public origDate_string: string,
    public isChanged_origDate: boolean = false,

    public title: string,
    public isChanged_title: boolean = false
  ) {}
}