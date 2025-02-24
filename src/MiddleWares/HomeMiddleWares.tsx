import React from "react";
import { ProductListParams,FetchProductsParam } from "../TypesCheck/HomeProps";
import axios from 'axios'
import { set } from "mongoose";

interface ICatProps{
    setGetCategory: React.Dispatch<React.SetStateAction<ProductListParams[]>>;
}
interface IPropByCatProps{
    catID: string;
    setGetProductsByCatID : React.Dispatch<React.SetStateAction<ProductListParams[]>>;
}
interface ITrendingProductProps{
    setTrendingProducts: React.Dispatch<React.SetStateAction<ProductListParams[]>>;
}
export const fetchTrendingProducts = async({setTrendingProducts}:ITrendingProductProps)=>{
    try{
        const response : FetchProductsParam = await axios.get (`http://10.106.3.131:9000/product/getTrendingProducts`);
        console.log("API Response:",response.data);

        if (Array.isArray(response.data)){
            const fixedData = response.data.map(item => ({
                ...item,
                images: item.images.map((img:string)=>
                    img.replace("http://localhost","http://10.106.3.131")
                )
            }));
            setTrendingProducts(fixedData);
        }else{
            console.warn("fetchCategories: du lieu api khong phai la mang",response.data);
            setTrendingProducts([]);
        }
    } catch (error){
        console.log("axios get error",error);
        setTrendingProducts([]);
    }
}
export const fetchProductsByCatID = async ({catID,setGetProductsByCatID}:IPropByCatProps) => {
    try {
        const response: FetchProductsParam = await axios.get (`http://10.106.3.131:9000/product/getProductsByCatID/${catID}`);
        console.log("API Response:",response.data);

        if (Array.isArray(response.data)){
            const fixedData = response.data.map(item=>({
                ...item,
                images: item.images.map((img:string)=>

                    img.replace("http://localhost","http://10.106.3.131")
                )
            }));

            setGetProductsByCatID(fixedData);
        } else {
            console.warn("fetchProductsByCatID: du lieu api  ko phai la mang",response.data);
            setGetProductsByCatID([]);
        }
    } catch (error){
        console.log("axios get error",error)
        setGetProductsByCatID([]);
    }
}
export const fetchCategories = async ({setGetCategory}:ICatProps) => {
    try {
    const response = await axios.get ("http://10.106.3.131:9000/category/getAllCategories");
    console.log("API Response:",response.data);
    if (Array.isArray(response.data)){
        const fixedData = response.data.map(item=>({
            ...item,
            images: item.images.map((img:string)=>
                img.replace("http://localhost","http://10.106.3.131")
            )
        }));
        setGetCategory(fixedData);

    } else {
        console.warn("fetchCategories: du lieu api  ko phai la mang",response.data);
        setGetCategory([]);
    }
    } catch (error){
        console.log("axios get error",error)
        setGetCategory([]);
    }
};