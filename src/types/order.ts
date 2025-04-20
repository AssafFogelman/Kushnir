export interface Order {
  id: string;
  customerName: string;
  productName: string;
  status: 'INCOMING' | 'UNDERWAY' | 'COMPLETED' | 'CANCELLED';
  estimatedCompletionDate: Date;
  actualCompletionDate?: Date;
  notes?: string;
  shippingAddress?: {
    street: string;
    number: string;
    floor?: string;
    apartment?: string;
    notes?: string;
  };
  customerPhone?: string;
  customerEmail?: string;
  items: [
    {
      id: string;
      name: string;
      quantity: number;
      price: number;
      image: string;
    },
  ];
  totalPrice: number;
  statusChangedAt: Date;
  createdAt: Date;
}

export type OrderStatus = Order['status'];
