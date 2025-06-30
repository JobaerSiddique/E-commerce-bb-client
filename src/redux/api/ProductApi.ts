import { IProduct } from "@/types/Product";
import { baseApi } from "./baseApi";
import { IMeta } from "@/types";
import { tagTypes } from "../tag-types";


export const ProductApi = baseApi.injectEndpoints({
    endpoints:(build)=>({

        getProduct :build.query({
            query: (arg: Record<string, any>) => ({
        url: "/product",
        method: "GET",
        params: arg,
      }),
      
     
        }),
        getSingleProduct :build.query({
            query: (id:string) => ({
        url: `/product/${id}`,
        method: "GET",
        
      }),
      
     
        }),

        
    })
})

export const {useGetProductQuery,useGetSingleProductQuery} = ProductApi;