export class BuhImportParserParams {
    constructor(
        public start: string = '10',
        public stop: string = '796',
        public inputDate: string = 'A',
        public contrAgent: string = 'D',
        public paymentDestination: string = 'F',
        public initiatorOfPayment: string = 'G',
        public sum: string = 'H',
    ) { }
}