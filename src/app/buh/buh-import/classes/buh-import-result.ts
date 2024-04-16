export class BuhImportResult {
    constructor(
        public status: boolean,
        public insertedRows: number,
        public totalRows: number,
    ) { }
}