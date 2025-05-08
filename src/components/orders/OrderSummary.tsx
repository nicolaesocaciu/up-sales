import { Badge } from "../ui/badge";
interface OrderSummaryProps {
  status: string;
  subtotal: number;
  itemCount: number;
  shippingCost: number;
  total: number;
  formatCurrency: (amount: number) => string;
}
export const OrderSummary = ({
  status,
  subtotal,
  itemCount,
  shippingCost,
  total,
  formatCurrency
}: OrderSummaryProps) => {
  return <div className="bg-[#F2F2F2] p-6 rounded-[16px]">
      {/* Order Status */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-lg">
            {status === 'Paid' ? 'Payment completed' : status === 'Processing' ? 'Processing payment' : 'Waiting for payment'}
          </h2>
          <Badge variant="outline" className={`
            ${status === 'Paid' ? 'bg-green-100 text-green-800 border-green-200' : status === 'Processing' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-amber-100 text-amber-800 border-amber-200'} 
            font-medium`}>
            {status}
          </Badge>
        </div>
      </div>

      {/* Order Details */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-[#252626]">Subtotal</span>
          <div className="flex items-center">
            
            <span className="text-[#252626] mr-2">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-[#252626]">Shipping</span>
          <div className="flex justify-end">
            <span className="text-[#252626] mr-2">Standard</span>
            <span className="font-medium">{formatCurrency(shippingCost)}</span>
          </div>
        </div>

        <div className="flex justify-between pt-2">
          <span className="font-bold text-lg">Total</span>
          <span className="font-bold text-lg">{formatCurrency(total)}</span>
        </div>
      </div>

      <p className="text-[#494A4A] text-sm mt-4">
        Duties and import taxes may be charged on delivery.
        <a href="#" className="ml-1" style={{
        color: "#116fae"
      }}>Learn more</a>
      </p>
    </div>;
};