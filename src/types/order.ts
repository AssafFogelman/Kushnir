export type OrderStatus = "incoming" | "underway" | "completed" | "cancelled";

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  totalPrice: number;
  status: OrderStatus;
  statusChangedAt: string; // ISO date string
  createdAt: string; // ISO date string
  notes?: string;
  shippingAddress?: {
    street: string;
    number: string;
    floor?: string;
    apartment?: string;
    notes?: string;
  };
}
