import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";
export const SecuritySettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);
  const [twoFactorMethod, setTwoFactorMethod] = useState("app");
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [dataRetention, setDataRetention] = useState("3-years");
  const [apiAccess, setApiAccess] = useState(false);
  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    if (newPassword && !currentPassword) {
      toast.error("Current password is required");
      return;
    }
    toast.success("Security settings saved successfully");
  };
  const handleGenerateApiKey = () => {
    toast.success("API key generated successfully");
  };
  return <div className="space-y-6">
      <Card className="bg-white shadow-none border-0">
        <CardHeader>
          <CardTitle className="text-[20px]">Change Password</CardTitle>
          <CardDescription className="text-[#494A4A]">
            Update your account password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave}>Update Password</Button>
        </CardFooter>
      </Card>

      <Card className="bg-white shadow-none border-0">
        <CardHeader>
          <CardTitle className="text-[20px]">Two-Factor Authentication</CardTitle>
          <CardDescription className="text-[#494A4A]">
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Require a verification code in addition to your password
              </p>
            </div>
            <Switch id="two-factor" checked={twoFactor} onCheckedChange={setTwoFactor} />
          </div>

          {twoFactor && <div className="mt-4 border-t pt-4">
              <div className="space-y-2">
                <Label htmlFor="two-factor-method">Authentication Method</Label>
                <Select value={twoFactorMethod} onValueChange={setTwoFactorMethod}>
                  <SelectTrigger id="two-factor-method">
                    <SelectValue placeholder="Select authentication method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="app">Authenticator App</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>}
        </CardContent>
        <CardFooter className="flex justify-end">
          {twoFactor && <Button onClick={handleSave}>Set Up Two-Factor</Button>}
        </CardFooter>
      </Card>

      <Card className="bg-white shadow-none border-0">
        <CardHeader>
          <CardTitle className="text-[20px]">Session Management</CardTitle>
          <CardDescription className="text-[#494A4A]">
            Manage your active sessions and timeout settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="session-timeout">Session Timeout</Label>
            <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
              <SelectTrigger id="session-timeout">
                <SelectValue placeholder="Select timeout duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-4 border-t">
            <Button variant="outline">Sign Out All Other Sessions</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-none border-0">
        <CardHeader>
          <CardTitle className="text-[20px]">Data Privacy</CardTitle>
          <CardDescription className="text-[#494A4A]">
            Manage your data retention and privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="data-retention">Data Retention Period</Label>
            <Select value={dataRetention} onValueChange={setDataRetention}>
              <SelectTrigger id="data-retention">
                <SelectValue placeholder="Select retention period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-year">1 Year</SelectItem>
                <SelectItem value="3-years">3 Years</SelectItem>
                <SelectItem value="5-years">5 Years</SelectItem>
                <SelectItem value="7-years">7 Years</SelectItem>
                <SelectItem value="indefinite">Indefinite</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-4 border-t">
            <Button variant="outline" className="text-red-600 hover:text-red-700">Request Data Export</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-none border-0">
        <CardHeader>
          <CardTitle className="text-[20px]">API Access</CardTitle>
          <CardDescription className="text-[#494A4A]">
            Manage API keys and access for integrations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="api-access">Enable API Access</Label>
              <p className="text-sm text-muted-foreground">
                Allow external applications to access your data via API
              </p>
            </div>
            <Switch id="api-access" checked={apiAccess} onCheckedChange={setApiAccess} />
          </div>

          {apiAccess && <div className="mt-4 border-t pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input id="api-key" value="••••••••••••••••••••••••••••••" readOnly type="password" className="flex-1" />
                    <Button variant="outline" onClick={handleGenerateApiKey}>Generate New Key</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Generating a new key will invalidate any existing keys
                  </p>
                </div>
              </div>
            </div>}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>;
};