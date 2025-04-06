import { Order, OrderStatus } from '@/types/order';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
  availableStatuses: OrderStatus[];
}

const statusLabels: Record<OrderStatus, string> = {
  incoming: 'הזמנה חדשה',
  underway: 'בתהליך',
  completed: 'הושלם',
  cancelled: 'בוטל',
};

const statusColors: Record<OrderStatus, string> = {
  incoming: 'bg-blue-500',
  underway: 'bg-yellow-500',
  completed: 'bg-green-500',
  cancelled: 'bg-red-500',
};

const OrderCard = ({ order, onStatusChange, availableStatuses }: OrderCardProps) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: he });
  };

  return (
    <Card className='mb-4'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='text-lg'>
          הזמנה #{order.id} - {order.customerName}
        </CardTitle>
        <Badge className={statusColors[order.status]}>{statusLabels[order.status]}</Badge>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-sm text-gray-500'>טלפון</p>
              <p>{order.customerPhone}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>אימייל</p>
              <p>{order.customerEmail}</p>
            </div>
          </div>

          {order.shippingAddress && (
            <div>
              <p className='text-sm text-gray-500'>כתובת למשלוח</p>
              <p>
                {order.shippingAddress.street} {order.shippingAddress.number}
                {order.shippingAddress.floor && `, קומה ${order.shippingAddress.floor}`}
                {order.shippingAddress.apartment && `, דירה ${order.shippingAddress.apartment}`}
              </p>
            </div>
          )}

          <div>
            <p className='text-sm text-gray-500'>פריטים</p>
            <div className='space-y-2'>
              {order.items.map(item => (
                <div key={item.id} className='flex items-center gap-4'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-16 h-16 object-cover rounded'
                  />
                  <div>
                    <p>{item.name}</p>
                    <p className='text-sm text-gray-500'>
                      {item.quantity} x {formatPrice(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='flex justify-between items-center'>
            <div>
              <p className='text-sm text-gray-500'>סכום כולל</p>
              <p className='text-lg font-bold'>{formatPrice(order.totalPrice)}</p>
            </div>
            <div className='flex gap-2'>
              {availableStatuses.map(status => (
                <Button
                  key={status}
                  variant='outline'
                  onClick={() => onStatusChange(order.id, status)}
                  disabled={order.status === status}
                >
                  {statusLabels[status]}
                </Button>
              ))}
            </div>
          </div>

          {order.notes && (
            <div>
              <p className='text-sm text-gray-500'>הערות</p>
              <p>{order.notes}</p>
            </div>
          )}

          <div className='text-sm text-gray-500'>
            <p>נוצר: {formatDate(order.createdAt)}</p>
            <p>שונה לאחרונה: {formatDate(order.statusChangedAt)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
