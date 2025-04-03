import { useState } from "react";
import { OrderStatus } from "@/types/order";
import BaseOrderScreen from "./BaseOrderScreen";
import { mockOrders } from "@/mocks/orders";

const CarpenterCompletedOrders = () => {
  const [orders, setOrders] = useState(
    mockOrders.filter((order) => order.status === "completed")
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
      title="הזמנות שהושלמו"
      availableStatuses={["underway"]}
      onStatusChange={handleStatusChange}
    />
  );
};

export default CarpenterCompletedOrders;
