export interface ProductListParams{
    _id:string;
    images: [string];
    name:string;
    price:number;
    oldPrice?:number;
    inStock?:number;
    color?:string;
    size?:string;
    description?:string;
    quantity:number
}
export interface FetchProductsPara{
    data:{
        Producst: ProductListParams[]
        results: ProductListParams[]
    }
}