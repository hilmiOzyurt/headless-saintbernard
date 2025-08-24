import { ProductNode } from "./menu";

export interface CartContextType {
  cart: ProductNode[];
  addToCart: (product: ProductNode) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
}