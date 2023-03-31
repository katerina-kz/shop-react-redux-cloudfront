import { useAvailableProducts } from "~/queries/products";
import { useProductsCart } from "~/queries/cart";

export const useCombinedProductCart = () => {
  const data = useAvailableProducts();
  const { data: result } = useProductsCart();

  console.log(data);
  const cartItems = result?.data?.data.items;

  return cartItems?.reduce((result, item) => {
    const product = data?.find((p) => p.id === item?.product_id);
    if (product) {
      result.push({
        count: item.count,
        product,
      });
    }
    return result;
  }, []);
};
