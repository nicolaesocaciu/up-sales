import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
export const NotificationSettings = () => {
  const [newLeads, setNewLeads] = useState(true);
  const [leadUpdates, setLeadUpdates] = useState(true);
  const [taskAssignments, setTaskAssignments] = useState(true);
  const [mentions, setMentions] = useState(true);
  const [opportunityStatus, setOpportunityStatus] = useState(true);
  const [salesTargets, setSalesTargets] = useState(false);
  const [customerFeedback, setCustomerFeedback] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [notificationMethod, setNotificationMethod] = useState("email-app");
  const [emailFrequency, setEmailFrequency] = useState("realtime");
  const handleSave = () => {
    toast.success("Notification settings saved successfully");
  };
  return <div className="space-y-6">
      <Card className="bg-white shadow-none border-0">
        <CardHeader>
          <CardTitle className="text-[20px]">Notification Preferences</CardTitle>
          <CardDescription className="text-[#494A4A]">
            Choose how and when you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup value={notificationMethod} onValueChange={setNotificationMethod}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="r1" />
              <Label htmlFor="r1">Email only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="app" id="r2" />
              <Label htmlFor="r2">In-app only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email-app" id="r3" />
              <Label htmlFor="r3">Email and in-app</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="r4" />
              <Label htmlFor="r4">None</Label>
            </div>
          </RadioGroup>

          {notificationMethod.includes("email") && <div className="space-y-2">
              <Label htmlFor="email-frequency">Email Frequency</Label>
              <Select value={emailFrequency} onValueChange={setEmailFrequency}>
                <SelectTrigger id="email-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="hourly">Hourly digest</SelectItem>
                  <SelectItem value="daily">Daily digest</SelectItem>
                  <SelectItem value="weekly">Weekly digest</SelectItem>
                </SelectContent>
              </Select>
            </div>}
        </CardContent>
      </Card>

      <Card className="bg-white shadow-none border-0">
        <CardHeader>
          <CardTitle className="text-[20px]">Sales Activities</CardTitle>
          <CardDescription className="text-[#494A4A]">
            Notifications about sales and customer activities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="new-leads">New Leads</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when new leads are added to the system
              </p>
            </div>
            <Switch id="new-leads" checked={newLeads} onCheckedChange={setNewLeads} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="lead-updates">Lead Status Updates</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when lead status changes
              </p>
            </div>
            <Switch id="lead-updates" checked={leadUpdates} onCheckedChange={setLeadUpdates} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="opportunity-status">Opportunity Status Changes</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when opportunity status changes
              </p>
            </div>
            <Switch id="opportunity-status" checked={opportunityStatus} onCheckedChange={setOpportunityStatus} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sales-targets">Sales Targets</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about sales target achievements
              </p>
            </div>
            <Switch id="sales-targets" checked={salesTargets} onCheckedChange={setSalesTargets} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="customer-feedback">Customer Feedback</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when customers provide feedback
              </p>
            </div>
            <Switch id="customer-feedback" checked={customerFeedback} onCheckedChange={setCustomerFeedback} />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-none border-0">
        <CardHeader>
          <CardTitle className="text-[20px]">Team Collaboration</CardTitle>
          <CardDescription className="text-[#494A4A]">
            Notifications about team activities and mentions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="task-assignments">Task Assignments</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when you are assigned a task
              </p>
            </div>
            <Switch id="task-assignments" checked={taskAssignments} onCheckedChange={setTaskAssignments} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="mentions">Mentions</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when you are mentioned in comments
              </p>
            </div>
            <Switch id="mentions" checked={mentions} onCheckedChange={setMentions} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="daily-digest">Daily Activity Digest</Label>
              <p className="text-sm text-muted-foreground">
                Receive a daily summary of all team activities
              </p>
            </div>
            <Switch id="daily-digest" checked={dailyDigest} onCheckedChange={setDailyDigest} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>;
};