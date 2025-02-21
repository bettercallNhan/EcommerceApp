import React from "react";
import { ProductListParams,FetchProductsPara } from "../TypesCheck/HomeProps";
import axios from 'axios'

interface ICatProps{
    setGetCategory: React.Dispatch<React.SetStateAction<ProductListParams[]>>;
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