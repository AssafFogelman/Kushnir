import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Order } from '@/types/order';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

const IncomingOrders = () => {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);

  const handleAccept = (orderId: string) => {
    setOrders(
      orders.map(order => (order.id === orderId ? { ...order, status: 'UNDERWAY' } : order))
    );
  };

  const handleReject = (orderId: string) => {
    setOrders(
      orders.map(order => (order.id === orderId ? { ...order, status: 'CANCELLED' } : order))
    );
  };

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>{t('carpenterOrders.incomingOrders')}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('carpenterOrders.customerName')}</TableHead>
            <TableHead>{t('carpenterOrders.productName')}</TableHead>
            <TableHead>{t('carpenterOrders.orderDate')}</TableHead>
            <TableHead>{t('carpenterOrders.estimatedCompletion')}</TableHead>
            <TableHead>{t('carpenterOrders.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.productName}</TableCell>
              <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>{order.estimatedCompletionDate.toLocaleDateString()}</TableCell>
              <TableCell>
                <div className='flex gap-2'>
                  <Button variant='outline' size='icon' onClick={() => handleAccept(order.id)}>
                    <Check className='h-4 w-4' />
                  </Button>
                  <Button variant='outline' size='icon' onClick={() => handleReject(order.id)}>
                    <X className='h-4 w-4' />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IncomingOrders;
