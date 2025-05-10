
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
          <TabsList className="bg-[#F2F2F2] p-1 w-full flex justify-start space-x-2 mb-6">
            <TabsTrigger value="general" className="rounded-md px-4 py-2 data-[state=active]:bg-white">
              General
            </TabsTrigger>
            <TabsTrigger value="user" className="rounded-md px-4 py-2 data-[state=active]:bg-white">
              User Profile
            </TabsTrigger>
            <TabsTrigger value="integrations" className="rounded-md px-4 py-2 data-[state=active]:bg-white">
              Integrations
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-md px-4 py-2 data-[state=active]:bg-white">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-md px-4 py-2 data-[state=active]:bg-white">
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
