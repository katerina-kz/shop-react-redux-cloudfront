import axios from "axios";
import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import API_PATHS from "~/constants/apiPaths";
import { CartItem } from "~/models/CartItem";

const mockedQueryID = "3873f8b8-63e4-405b-b338-cd734b74a59c";

export function useProductsCart() {
  return useQuery("cart-product", async () => {
    try {
      const cart = await axios
        .get(`${API_PATHS.cart}/api/profile/cart/${mockedQueryID}`, {
          headers: {
            Authorization: `Basic ${localStorage.getItem(
              "authorization_token"
            )}`,
          },
        })
        .then((res) => res.data.data);
      return cart;
    } catch (error) {
      console.log(error);
    }
  });
}

export function useCartData() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<CartItem[]>("cart-product");
}

export function useInvalidateCart() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries("cart-product", { exact: true }),
    []
  );
}

export function useUpsertCart() {
  return useMutation((values: CartItem) => {
    return axios.put<CartItem[]>(
      `${API_PATHS.cart}/api/profile/cart/${mockedQueryID}`,
      values,
      {
        headers: {
          Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
        },
      }
    );
  });
}

export function useDeleteCartItem() {
  return useMutation(async (productId: string) => {
    try {
      return await axios
        .delete(`${API_PATHS.cart}/api/profile/cart/${productId}`)
        .then((res) => res.data);
    } catch (error) {
      console.log(error);
    }
  });
}
