export type Product = {
    itemId: number;
    itemName: string;
    itemPrice: number;
    itemImage?: string;
    itemDescription?: string;
};

export type Products = Product[];
