
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Phone, Mail, BookOpen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const HelpSupport = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Support request submitted successfully. We'll get back to you soon!");
    // Reset form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setCategory("");
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-6 w-6 text-[#116fae]" />
              <CardTitle>Live Chat</CardTitle>
            </div>
            <CardDescription className="mt-2">
              Chat with our support team in real-time during business hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full mt-2">
              Start Chat
            </Button>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Available Mon-Fri, 9am-6pm EST
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-[#116fae]" />
              <CardTitle>Phone Support</CardTitle>
            </div>
            <CardDescription className="mt-2">
              Call our dedicated support line for immediate assistance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full mt-2">
              +1 (888) 555-0123
            </Button>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Priority support for Enterprise customers
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-[#116fae]" />
              <CardTitle>Documentation</CardTitle>
            </div>
            <CardDescription className="mt-2">
              Browse our comprehensive product documentation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full mt-2">
              View Documentation
            </Button>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Detailed guides and reference materials
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Mail className="h-6 w-6 text-[#116fae]" />
            <CardTitle>Contact Support</CardTitle>
          </div>
          <CardDescription>
            Fill out this form to get help from our support team. We'll respond within 24 hours.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter your full name" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter your email address" 
                  required 
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Support Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="account">Account Issues</SelectItem>
                    <SelectItem value="billing">Billing & Subscription</SelectItem>
                    <SelectItem value="technical">Technical Support</SelectItem>
                    <SelectItem value="feature">Feature Requests</SelectItem>
                    <SelectItem value="training">Training & Onboarding</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)} 
                  placeholder="Brief description of your issue" 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Please describe your issue in detail" 
                rows={5} 
                required 
              />
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">
                Submit Support Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Support Hours & SLAs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-lg mb-2">Standard Support</h3>
                <p className="text-muted-foreground mb-2">Available to all customers</p>
                <ul className="space-y-1 text-sm">
                  <li>• Monday-Friday, 9am-6pm EST</li>
                  <li>• Response within 24 business hours</li>
                  <li>• Email and chat support</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Premium Support</h3>
                <p className="text-muted-foreground mb-2">Available to Enterprise customers</p>
                <ul className="space-y-1 text-sm">
                  <li>• 24/7 support availability</li>
                  <li>• Response within 2 hours</li>
                  <li>• Phone, email and chat support</li>
                  <li>• Dedicated account manager</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              Need faster support? <a href="#" className="text-[#116fae] hover:underline">Upgrade your support plan</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
