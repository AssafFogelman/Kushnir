import { useState } from 'react';
import { OrderStatus } from '@/types/order';
import BaseOrderScreen from './BaseOrderScreen';
import { mockOrders } from '@/mocks/orders';
import { useLanguage } from '@/hooks/useLanguage';

const CarpenterCompletedOrders = () => {
  const { t } = useLanguage();
  const [orders, setOrders] = useState(mockOrders.filter(order => order.status === 'COMPLETED'));

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(currentOrders =>
      currentOrders.map(order =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              statusChangedAt: new Date(),
            }
          : order
      )
    );
  };

  return (
    <BaseOrderScreen
      orders={orders}
      title={t('carpenterOrders.completed')}
      availableStatuses={['UNDERWAY']}
      onStatusChange={handleStatusChange}
    />
  );
};

export default CarpenterCompletedOrders;
