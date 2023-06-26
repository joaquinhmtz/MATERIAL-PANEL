export class Output {
    constructor(
        public _id: string, 
        public folio: string, 
        public creation_date: Date,
        public payment: object,
        public totalQuantity: number,
        public totalSupplies: number
    ) {}
}