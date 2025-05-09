import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
export const IntegrationsSettings = () => {
  const [emailMarketing, setEmailMarketing] = useState(true);
  const [googleAnalytics, setGoogleAnalytics] = useState(false);
  const [stripe, setStripe] = useState(false);
  const [slack, setSlack] = useState(true);
  const [zapier, setZapier] = useState(false);
  const [salesforce, setSalesforce] = useState(false);
  const [stripeKey, setStripeKey] = useState("");
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState("");
  const handleSave = () => {
    toast.success("Integration settings saved successfully");
  };
  return <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Email Marketing</CardTitle>
          <CardDescription>
            Connect with email marketing services to automate campaigns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#E7F2F9] rounded-md flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="#116FAE" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Mailchimp</p>
                <p className="text-sm text-muted-foreground">Connect your Mailchimp account</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Connected
              </Badge>
              <Switch checked={emailMarketing} onCheckedChange={setEmailMarketing} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Analytics & Tracking</CardTitle>
          <CardDescription>
            Connect analytics tools to track performance and user behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#E7F2F9] rounded-md flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 16.5L3 19.5V7C3 6.73478 3.10536 6.48043 3.29289 6.29289C3.48043 6.10536 3.73478 6 4 6H20C20.2652 6 20.5196 6.10536 20.7071 6.29289C20.8946 6.48043 21 6.73478 21 7V15C21 15.2652 20.8946 15.5196 20.7071 15.7071C20.5196 15.8946 20.2652 16 20 16H6.5L6 16.5Z" stroke="#116FAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Google Analytics</p>
                <p className="text-sm text-muted-foreground">Connect your Google Analytics account</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-gray-100 text-gray-700">
                Not Connected
              </Badge>
              <Switch checked={googleAnalytics} onCheckedChange={setGoogleAnalytics} />
            </div>
          </div>

          {googleAnalytics && <div className="mt-4 border-t pt-4">
              <div className="space-y-2">
                <Label htmlFor="ga-id">Google Analytics ID</Label>
                <Input id="ga-id" value={googleAnalyticsId} onChange={e => setGoogleAnalyticsId(e.target.value)} placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX" />
              </div>
            </div>}
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Payment Processing</CardTitle>
          <CardDescription>
            Connect payment processors to handle transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#E7F2F9] rounded-md flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 4H3C1.89 4 1 4.89 1 6V18C1 19.11 1.89 20 3 20H21C22.11 20 23 19.11 23 18V6C23 4.89 22.11 4 21 4ZM21 18H3V13H21V18ZM21 8H3V6H21V8Z" fill="#116FAE" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Stripe</p>
                <p className="text-sm text-muted-foreground">Connect your Stripe account</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-gray-100 text-gray-700">
                Not Connected
              </Badge>
              <Switch checked={stripe} onCheckedChange={setStripe} />
            </div>
          </div>

          {stripe && <div className="mt-4 border-t pt-4">
              <div className="space-y-2">
                <Label htmlFor="stripe-key">Stripe API Key</Label>
                <Input id="stripe-key" value={stripeKey} onChange={e => setStripeKey(e.target.value)} placeholder="sk_test_..." type="password" />
              </div>
            </div>}
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Team Communication</CardTitle>
          <CardDescription>
            Connect communication tools to streamline team collaboration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#E7F2F9] rounded-md flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 11.5C9 12.8807 7.88071 14 6.5 14C5.11929 14 4 12.8807 4 11.5C4 10.1193 5.11929 9 6.5 9C7.88071 9 9 10.1193 9 11.5Z" fill="#116FAE" />
                  <path d="M9 6.5C9 7.88071 7.88071 9 6.5 9C5.11929 9 4 7.88071 4 6.5C4 5.11929 5.11929 4 6.5 4C7.88071 4 9 5.11929 9 6.5Z" fill="#116FAE" />
                  <path d="M9 16.5C9 17.8807 7.88071 19 6.5 19C5.11929 19 4 17.8807 4 16.5C4 15.1193 5.11929 14 6.5 14C7.88071 14 9 15.1193 9 16.5Z" fill="#116FAE" />
                  <path d="M14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5Z" fill="#116FAE" />
                  <path d="M19 11.5C19 12.8807 17.8807 14 16.5 14C15.1193 14 14 12.8807 14 11.5C14 10.1193 15.1193 9 16.5 9C17.8807 9 19 10.1193 19 11.5Z" fill="#116FAE" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Slack</p>
                <p className="text-sm text-muted-foreground">Connect your Slack workspace</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Connected
              </Badge>
              <Switch checked={slack} onCheckedChange={setSlack} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Other Integrations</CardTitle>
          <CardDescription>
            Connect other tools and services to extend functionality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#E7F2F9] rounded-md flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 4H6C4.89 4 4 4.89 4 6V18C4 19.11 4.89 20 6 20H18C19.11 20 20 19.11 20 18V6C20 4.89 19.11 4 18 4ZM6 6H11V11H6V6ZM13 6H18V11H13V6ZM6 13H11V18H6V13ZM13 13H18V18H13V13Z" fill="#116FAE" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Zapier</p>
                <p className="text-sm text-muted-foreground">Connect with Zapier for automation workflows</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-gray-100 text-gray-700">
                Not Connected
              </Badge>
              <Switch checked={zapier} onCheckedChange={setZapier} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#E7F2F9] rounded-md flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3L8 7H16L19 3H5ZM18 8H6L3 17H21L18 8ZM7 18L9 21H15L17 18H7Z" fill="#116FAE" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Salesforce</p>
                <p className="text-sm text-muted-foreground">Connect with Salesforce CRM</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-gray-100 text-gray-700">
                Not Connected
              </Badge>
              <Switch checked={salesforce} onCheckedChange={setSalesforce} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>;
};