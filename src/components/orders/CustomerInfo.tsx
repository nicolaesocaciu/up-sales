interface CustomerInfoProps {
  name: string;
  email: string;
}
export const CustomerInfo = ({
  name,
  email
}: CustomerInfoProps) => {
  return <div className="py-6 border-t border-[#DADADA] border-dashed">
      <h2 className="font-bold text-lg mb-4">Customer</h2>
      <div className="space-y-1">
        <p className="font-medium">{name}</p>
        <p style={{
        color: "#116fae"
      }}>{email}</p>
      </div>
    </div>;
};