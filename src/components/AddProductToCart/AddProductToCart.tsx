import Typography from "@mui/material/Typography";
import { Product } from "~/models/Product";
import CartIcon from "@mui/icons-material/ShoppingCart";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import {
  useDeleteCartItem,
  useInvalidateCart,
  useProductsCart,
  useUpsertCart,
} from "~/queries/cart";

type AddProductToCartProps = {
  product: Product;
};

export default function AddProductToCart({ product }: AddProductToCartProps) {
  const { data = [], isFetching } = useProductsCart();
  const { mutate: upsertCart } = useUpsertCart();
  const { mutate: deleteCartItem } = useDeleteCartItem();
  const invalidateCart = useInvalidateCart();
  const cartItem = data?.items?.find((i: any) => i.product_id === product.id);

  const addProduct = async () => {
    await upsertCart(
      { product, count: cartItem ? cartItem.count + 1 : 1 },
      { onSuccess: invalidateCart }
    );
  };

  const removeProduct = async () => {
    if (cartItem) {
      const itemAmount = cartItem.count - 1;
      if (!itemAmount) {
        return await deleteCartItem(cartItem.product_id, {
          onSuccess: invalidateCart,
        });
      }
      await upsertCart(
        { product, count: cartItem.count - 1 },
        { onSuccess: invalidateCart }
      );
    }
  };

  return cartItem ? (
    <>
      <IconButton disabled={isFetching} onClick={removeProduct} size="large">
        <Remove color={"secondary"} />
      </IconButton>
      <Typography align="center">{cartItem.count}</Typography>
      <IconButton disabled={isFetching} onClick={addProduct} size="large">
        <Add color={"secondary"} />
      </IconButton>
    </>
  ) : (
    <IconButton disabled={isFetching} onClick={addProduct} size="large">
      <CartIcon color={"secondary"} />
    </IconButton>
  );
}
