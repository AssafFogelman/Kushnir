import { useState } from "react";
import { OrderStatus } from "@/types/order";
import BaseOrderScreen from "./BaseOrderScreen";
import { mockOrders } from "@/mocks/orders";

const CarpenterUnderwayOrders = () => {
  const [orders, setOrders] = useState(
    mockOrders.filter((order) => order.status === "underway")
  );

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
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
      title="הזמנות בתהליך"
      availableStatuses={["completed", "cancelled"]}
      onStatusChange={handleStatusChange}
    />
  );
};

export default CarpenterUnderwayOrders;
