import axios, { AxiosError } from "axios";
import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import API_PATHS from "~/constants/apiPaths";
import { CartItem } from "~/models/CartItem";

const mockedQueryID = "3873f8b8-63e4-405b-b338-cd734b74a59c";

export function useProductsCart() {
  return useQuery("cart-product", () => {
    return axios.get(`${API_PATHS.cart}/api/profile/cart/${mockedQueryID}`, {
      headers: {
        Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
      },
    });
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
    console.log(values);
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
