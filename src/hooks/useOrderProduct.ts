import { useAvailableProducts } from "~/queries/products";

export const useOrderProduct = (order: any) => {
  if (!order) {
    return {
      combinedData: undefined,
      isLoading: false,
    };
  }
  const { data: products = [], isLoading } = useAvailableProducts();
  const cartItems = order.items;

  const combinedData = cartItems?.reduce((cart: any, item: any) => {
    const product = products?.find((p) => p.id === item?.productId);
    if (product) {
      cart.push({
        count: item.count,
        product,
        cartId: order.id,
      });
    }
    return cart;
  }, []);

  return { combinedData, isLoading };
};
