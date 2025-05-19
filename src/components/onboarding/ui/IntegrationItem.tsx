import { Button } from "@/components/ui/button";
type IntegrationItemProps = {
  name: string;
  description: string;
  connected: boolean;
  onToggle: () => void;
};
export const IntegrationItem = ({
  name,
  description,
  connected,
  onToggle
}: IntegrationItemProps) => {
  return <div className="flex items-center justify-between py-3">
      <div className="flex items-center">
        <div className="bg-blue-100 w-12 h-12 rounded mr-4"></div>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
      </div>
      
      <Button variant="outline" size="sm" onClick={onToggle} className="h-9">
        Connect
      </Button>
    </div>;
};