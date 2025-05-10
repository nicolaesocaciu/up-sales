
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { UserSettings } from "@/components/settings/UserSettings";
import { IntegrationsSettings } from "@/components/settings/IntegrationsSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-muted-foreground mt-2 text-[#494A4A]">Manage your account settings and preferences.</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start h-auto p-0 space-x-6">
            <TabsTrigger 
              value="general" 
              className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
            >
              General
            </TabsTrigger>
            <TabsTrigger 
              value="user" 
              className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
            >
              User Profile
            </TabsTrigger>
            <TabsTrigger 
              value="integrations" 
              className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
            >
              Integrations
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
            >
              Security & Privacy
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="mt-2 space-y-4">
            <GeneralSettings />
          </TabsContent>
          <TabsContent value="user" className="mt-2 space-y-4">
            <UserSettings />
          </TabsContent>
          <TabsContent value="integrations" className="mt-2 space-y-4">
            <IntegrationsSettings />
          </TabsContent>
          <TabsContent value="notifications" className="mt-2 space-y-4">
            <NotificationSettings />
          </TabsContent>
          <TabsContent value="security" className="mt-2 space-y-4">
            <SecuritySettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
