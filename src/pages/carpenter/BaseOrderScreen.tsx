import { useState } from "react";
import { Order, OrderStatus } from "@/types/order";
import OrderCard from "@/components/OrderCard";

interface BaseOrderScreenProps {
  orders: Order[];
  title: string;
  availableStatuses: OrderStatus[];
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

const BaseOrderScreen = ({
  orders,
  title,
  availableStatuses,
  onStatusChange,
}: BaseOrderScreenProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.includes(searchQuery)
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <input
          type="text"
          placeholder="חיפוש לפי שם לקוח או מספר הזמנה"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg w-64"
        />
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500">לא נמצאו הזמנות</p>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusChange={onStatusChange}
              availableStatuses={availableStatuses}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BaseOrderScreen;
