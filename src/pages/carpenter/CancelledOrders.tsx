import { useState } from 'react';
import { OrderStatus } from '@/types/order';
import BaseOrderScreen from './BaseOrderScreen';
import { mockOrders } from '@/mocks/orders';

const CarpenterCancelledOrders = () => {
  const [orders, setOrders] = useState(mockOrders.filter(order => order.status === 'cancelled'));

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(currentOrders =>
      currentOrders.map(order =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              statusChangedAt: new Date().toISOString(),
            }
          : order
      )
    );
  };

  return (
    <BaseOrderScreen
      orders={orders}
      title='הזמנות שבוטלו'
      availableStatuses={['underway']}
      onStatusChange={handleStatusChange}
    />
  );
};

export default CarpenterCancelledOrders;
