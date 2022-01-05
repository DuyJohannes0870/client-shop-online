export interface Item {
    id: string;
    // type: string;
    name: string;
    amount: Number;
    price: Number;
    image: string;
    status: Number;
    type:string;
}

export interface Cart {
    idDoc: string;
    name: string;
    amount: number;
    price: number;
    image: string;
    type: string;
    id: string
}
