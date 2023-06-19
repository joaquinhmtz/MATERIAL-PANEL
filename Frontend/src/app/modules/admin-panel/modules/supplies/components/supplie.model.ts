export interface Supplie {
    _id: string;
    name: string;
    description: string;
    unit_price: number;
    public_price: number;
}

export class SupplieEntrieClass {
    constructor(
        public _id: string, 
        public name: string, 
        public description: string, 
        public quantity: number,
        public expiredDate: Date
    ) {}
}

export class SupplieListClass {
    constructor(
        public index: number,
        public _id: string, 
        public name: string, 
        public description: string, 
        public presentation: object,
        public public_price: number
    ) {}
}