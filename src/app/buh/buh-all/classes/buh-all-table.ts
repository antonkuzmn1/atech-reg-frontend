export class BuhAllTable {
  constructor(
    public id: number,

    public inputDate: Date,

    public copyDate: Date,
    public copyDate_string: string,
    public copyDate_isChanged: boolean = false,

    public origDate: Date,
    public origDate_string: string,
    public origDate_isChanged: boolean = false,

    public date: Date,
    public date_string: string,
    public date_isChanged: boolean = false,

    public contractor: { id: number; name: string },
    public contractor_isChanged: boolean = false,

    public initiator: { id: number; name: string },
    public initiator_isChanged: boolean = false,

    public mark: { id: number; text: string },
    public mark_isChanged: boolean = false,

    public status: { id: number; text: string },
    public status_isChanged: boolean = false,

    public destination: string,
    public destination_isChanged: boolean = false,

    public title: string,
    public title_isChanged: boolean = false,

    public sum: number,
    public sum_isChanged: boolean = false,

    public number: number,
    public number_isChanged: boolean = false
  ) {}
}
