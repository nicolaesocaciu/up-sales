
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUploadSection } from "./FileUploadSection";

export const UsersOrdersTabs = () => {
  const [activeTab, setActiveTab] = useState<"users" | "orders">("users");
  
  return (
    <div className="pt-4">
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as "users" | "orders")}>
        <TabsList className="w-full grid grid-cols-2 bg-white border border-gray-200 rounded-md h-9 p-0">
          <TabsTrigger 
            value="users" 
            className="data-[state=active]:bg-[#116FAE] data-[state=active]:text-white rounded-md"
          >
            Users
          </TabsTrigger>
          <TabsTrigger 
            value="orders" 
            className="data-[state=active]:bg-[#116FAE] data-[state=active]:text-white rounded-md"
          >
            Orders
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="mt-4">
          <FileUploadSection type="users" />
        </TabsContent>
        
        <TabsContent value="orders" className="mt-4">
          <FileUploadSection type="orders" />
        </TabsContent>
      </Tabs>
    </div>
  );
};
