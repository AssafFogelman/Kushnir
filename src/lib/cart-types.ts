export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  shippingFee?: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}
