export class BuhAllFilterDate {
  constructor(
    public from: Date,
    public to: Date,
    public isNull: boolean,
    public string: { from: string; to: string }
  ) {}
}
