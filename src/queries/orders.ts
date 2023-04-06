import axios, { AxiosError } from "axios";
import React from "react";
import { useQuery, useQueryClient, useMutation, useQueries } from "react-query";
import API_PATHS from "~/constants/apiPaths";
import { OrderStatus } from "~/constants/order";

const mockedQueryID = "3873f8b8-63e4-405b-b338-cd734b74a59c";

export function useOrders() {
  return useQuery("orders", async () => {
    try {
      const orders = await axios
        .get(`${API_PATHS.order}/orders/${mockedQueryID}`)
        .then((res) => res?.data?.data);

      return orders;
    } catch (error) {
      console.log(error);
    }
  });
}

export function useOrder(id: string | undefined) {
  return useQuery("order", async () => {
    try {
      const order = await axios
        .get(`${API_PATHS.order}/orders/order/${id}`)
        .then((res) => res?.data?.data);

      return order;
    } catch (error) {
      console.log(error);
    }
  });
}

export function useInvalidateOrders() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries("orders", { exact: true }),
    []
  );
}

export function useUpdateOrderStatus() {
  return useMutation(
    (values: { id: string; status: OrderStatus; comment: string }) => {
      const { id, ...data } = values;
      return axios.put(`${API_PATHS.order}/orders/order/${id}/status`, data, {
        headers: {
          Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
        },
      });
    }
  );
}

export function useSubmitOrder() {
  return useMutation((values) => {
    console.log(values);
    return axios.post(`${API_PATHS.order}/orders/${mockedQueryID}`, values, {
      headers: {
        Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
      },
    });
  });
}

export function useInvalidateOrder() {
  const queryClient = useQueryClient();
  return React.useCallback(
    (id: string) =>
      queryClient.invalidateQueries(["order", { id }], { exact: true }),
    []
  );
}

export function useDeleteOrder() {
  return useMutation((id: string) =>
    axios.delete(`${API_PATHS.order}/orders/delete/${id}`, {
      headers: {
        Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
      },
    })
  );
}
