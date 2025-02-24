export interface ProductListParams{
    _id:string;
    images: [string];
    name:string;
    price:number;
    oldPrice?:number;
    inStock?:boolean;
    color?:string;
    size?:string;
    description?:string;
    quantity:number
    isFeatured?: boolean; // ✅ Thêm dòng này
    category?: string; // ✅ Thêm dòng này
}
export interface FetchProductsParam{
    data:{
        Producst: ProductListParams[]
        results: ProductListParams[]
    }
}