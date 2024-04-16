export class BuhImportRow {
    constructor(
        public inputDate: Date,
        public contrAgent: string,
        public paymentDestination: string,
        public initiatorOfPayment: string,
        public sum: number,
    ) { }
}