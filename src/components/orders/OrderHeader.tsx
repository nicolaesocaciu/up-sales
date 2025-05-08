
interface OrderHeaderProps {
  orderId: string;
  orderDate: string;
}

export const OrderHeader = ({ orderId, orderDate }: OrderHeaderProps) => {
  // Ensure the # is displayed with the order ID
  const displayId = orderId.startsWith('#') ? orderId : `#${orderId}`;
  
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-1">Order {displayId}</h2>
      <p className="text-[#494A4A]">{orderDate}</p>
    </div>
  );
};
