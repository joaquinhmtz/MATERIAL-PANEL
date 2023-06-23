export interface Supplie {
    _id: string;
    name: string;
    tempName: string;
    description: string;
    unit_price: number;
    public_price: number;
}

export interface SupplieOutput {
    _id: string;
    name: string;
    fullname: string;
    description: string;
    stock : number;
    expiredDate : Date;
    lotId : string;
    lotName : string;
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

export class SupplieOutputClass {
    constructor(
        public _id: string,
        public name: string,
        public fullname: string,
        public description: string,
        public stock : number,
        public quantity : number,
        public expiredDate : Date,
        public lotId : string,
        public lotName : string
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