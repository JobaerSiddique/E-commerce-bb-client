import { tagTypes } from './../tag-types';
import { baseApi } from "./baseApi";

export const CartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    AddToCart: build.mutation({
      query: (data) => {
        // You can log the data here before returning the query object
        console.log('Cart data being sent:', data);
        
        return {
          url: "/cart",
          method: "POST",
          data: data,  // Changed from 'body' to 'data' for axios
          headers: {
            'Content-Type': 'application/json'
          }
        };
      },
      invalidatesTags: [tagTypes.cart]
    }),
  })
});

export const { useAddToCartMutation } = CartApi;