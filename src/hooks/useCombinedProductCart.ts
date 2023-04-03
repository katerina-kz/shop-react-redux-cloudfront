import { useAvailableProducts } from "~/queries/products";
import { useProductsCart } from "~/queries/cart";

export const useCombinedProductCart = () => {
  const { data: products = [] } = useAvailableProducts();
  const { data: carts = [], isLoading } = useProductsCart();
  const cartItems = carts.items;

  const combinedData = cartItems?.reduce((cart: any, item: any) => {
    const product = products?.find((p) => p.id === item?.product_id);
    if (product) {
      cart.push({
        count: item.count,
        product,
      });
    }
    return cart;
  }, []);

  return { combinedData, isLoading };
};
