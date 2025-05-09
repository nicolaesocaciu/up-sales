
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HelpGeneralGuides } from "@/components/help/HelpGeneralGuides";
import { HelpFAQ } from "@/components/help/HelpFAQ";
import { HelpSupport } from "@/components/help/HelpSupport";
import { HelpVideoTutorials } from "@/components/help/HelpVideoTutorials";

export default function Help() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Help Center</h1>
          <p className="text-muted-foreground mt-2">Find resources, tutorials and support to help you use your CRM effectively.</p>
        </div>

        <Tabs defaultValue="guides" className="w-full">
          <TabsList className="bg-[#F2F2F2] p-1 w-full flex justify-start space-x-2 mb-6">
            <TabsTrigger value="guides" className="rounded-md px-4 py-2 data-[state=active]:bg-white">
              Getting Started
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="rounded-md px-4 py-2 data-[state=active]:bg-white">
              Video Tutorials
            </TabsTrigger>
            <TabsTrigger value="faq" className="rounded-md px-4 py-2 data-[state=active]:bg-white">
              FAQs
            </TabsTrigger>
            <TabsTrigger value="support" className="rounded-md px-4 py-2 data-[state=active]:bg-white">
              Contact Support
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="guides" className="mt-2 space-y-4">
            <HelpGeneralGuides />
          </TabsContent>
          
          <TabsContent value="tutorials" className="mt-2 space-y-4">
            <HelpVideoTutorials />
          </TabsContent>
          
          <TabsContent value="faq" className="mt-2 space-y-4">
            <HelpFAQ />
          </TabsContent>
          
          <TabsContent value="support" className="mt-2 space-y-4">
            <HelpSupport />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
