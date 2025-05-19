
import { useState, useEffect } from "react";
import { ServiceCard } from "../ui/ServiceCard";
import { FileUploadCard } from "../ui/FileUploadCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

type ImportProductsProps = {
  onNext: () => void;
  onBack: () => void;
};

type Service = {
  id: string;
  name: string;
  selected: boolean;
  iconUrl: string;
};

export const ImportProducts = ({
  onNext,
  onBack
}: ImportProductsProps) => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([{
    id: "shopify",
    name: "Shopify",
    selected: false,
    iconUrl: "https://cdn.worldvectorlogo.com/logos/shopify.svg"
  }, {
    id: "wordpress",
    name: "Wordpress",
    selected: false,
    iconUrl: "/lovable-uploads/39174503-5fba-4f20-b309-a672aec16aa3.png"
  }, {
    id: "salesforce",
    name: "Salesforce",
    selected: false,
    iconUrl: "https://cdn.worldvectorlogo.com/logos/salesforce-2.svg"
  }, {
    id: "manual",
    name: "Manual",
    selected: false,
    iconUrl: ""
  }]);
  
  // Form validation states
  const [shopifyStore, setShopifyStore] = useState("");
  const [wordpressUrl, setWordpressUrl] = useState("");
  const [wordpressKey, setWordpressKey] = useState("");
  const [salesforceDomain, setSalesforceDomain] = useState("");
  const [salesforceOption, setSalesforceOption] = useState("products");
  const [shopifyOption, setShopifyOption] = useState("all");
  const [isConnecting, setIsConnecting] = useState(false);
  
  // File upload state
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("File name.csv");
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1);
  const [uploadActive, setUploadActive] = useState(false);
  
  // Selected service
  const selectedService = services.find(service => service.selected);

  const toggleService = (id: string) => {
    setServices(services.map(service => ({
      ...service,
      selected: service.id === id ? !service.selected : false
    })));
    
    // Reset states when switching services
    setFileUploaded(false);
    setProgress(0);
    setTimeLeft(1);
    setUploadActive(false);
    setIsConnecting(false);
  };
  
  const handleFileUpload = () => {
    setFileUploaded(true);
    setProgress(0);
    setTimeLeft(1);
    setUploadActive(true);
  };
  
  const handleCancelUpload = () => {
    setFileUploaded(false);
    setUploadActive(false);
    setProgress(0);
  };
  
  const isFormValid = () => {
    if (!selectedService) return false;
    
    switch (selectedService.id) {
      case "shopify":
        return shopifyStore.trim() !== "";
      case "wordpress":
        return wordpressUrl.trim() !== "" && wordpressKey.trim() !== "";
      case "salesforce":
        return salesforceDomain.trim() !== "";
      default:
        return true;
    }
  };
  
  const handleConnect = () => {
    if (!isFormValid()) return;
    
    setIsConnecting(true);
    
    // Simulate API connection
    setTimeout(() => {
      setIsConnecting(false);
      toast({
        title: "Connection successful",
        description: "3872 products have been successfully imported.",
      });
    }, 2000);
  };

  return (
    <div className="flex-1">
      <h1 className="mb-4 text-4xl font-normal">Import products</h1>
      <p className="text-gray-600 mt-4 text-base mb-[64px]">
        Choose your preferred platform to import products. Connect to your existing store
        or upload a CSV file to set up your product catalog efficiently and accurately.
      </p>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {services.map(service => (
          <ServiceCard 
            key={service.id} 
            title={service.name} 
            selected={service.selected} 
            onClick={() => toggleService(service.id)}
            iconUrl={service.iconUrl} 
          />
        ))}
      </div>

      {selectedService && selectedService.id === "shopify" && (
        <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Connect to Shopify</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="shopify-store">Shopify Store URL</Label>
              <Input 
                id="shopify-store" 
                placeholder="your-store.myshopify.com" 
                className="mt-1" 
                value={shopifyStore}
                onChange={(e) => setShopifyStore(e.target.value)}
              />
            </div>
            <div>
              <Label>What to import</Label>
              <RadioGroup 
                value={shopifyOption} 
                onValueChange={setShopifyOption}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all">All products</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="selected" id="selected" />
                  <Label htmlFor="selected">Selected collections</Label>
                </div>
              </RadioGroup>
            </div>
            <Button 
              onClick={handleConnect}
              disabled={!isFormValid() || isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect & Import"}
            </Button>
          </div>
        </div>
      )}

      {selectedService && selectedService.id === "wordpress" && (
        <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Connect to WordPress</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="wordpress-url">WordPress Site URL</Label>
              <Input 
                id="wordpress-url" 
                placeholder="https://your-site.com" 
                className="mt-1" 
                value={wordpressUrl}
                onChange={(e) => setWordpressUrl(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="wordpress-key">API Key</Label>
              <Input 
                id="wordpress-key" 
                type="password" 
                placeholder="Enter your WooCommerce API key" 
                className="mt-1" 
                value={wordpressKey}
                onChange={(e) => setWordpressKey(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleConnect}
              disabled={!isFormValid() || isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect & Import"}
            </Button>
          </div>
        </div>
      )}

      {selectedService && selectedService.id === "salesforce" && (
        <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Connect to Salesforce</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="salesforce-domain">Salesforce Domain</Label>
              <Input 
                id="salesforce-domain" 
                placeholder="your-domain.my.salesforce.com" 
                className="mt-1" 
                value={salesforceDomain}
                onChange={(e) => setSalesforceDomain(e.target.value)}
              />
            </div>
            <div>
              <Label>Import Options</Label>
              <RadioGroup 
                value={salesforceOption} 
                onValueChange={setSalesforceOption}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="products" id="products" />
                  <Label htmlFor="products">Products only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="products-pricing" id="products-pricing" />
                  <Label htmlFor="products-pricing">Products with pricing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full">Full product data</Label>
                </div>
              </RadioGroup>
            </div>
            <Button 
              onClick={handleConnect}
              disabled={!isFormValid() || isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect & Import"}
            </Button>
          </div>
        </div>
      )}

      {selectedService && selectedService.id === "manual" && (
        <div className="mt-8">
          {fileUploaded ? (
            <FileUploadCard 
              fileName={fileName} 
              progress={progress} 
              timeLeft={timeLeft} 
              onCancel={handleCancelUpload}
              uploadActive={uploadActive}
            />
          ) : (
            <div className="bg-blue-50 p-6 rounded-lg max-w-lg">
              <div 
                className="text-center p-8 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer" 
                onClick={handleFileUpload}
              >
                <div className="mb-4">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto text-[#116FAE]">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-[#116FAE] font-medium">Click to upload a CSV file</p>
                <p className="text-[#116FAE] text-sm mt-1">or drag and drop</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
