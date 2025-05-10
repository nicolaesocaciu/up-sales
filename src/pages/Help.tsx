
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageCircle, Video, Search, FileText, HelpCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const HelpCenter = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Help Center</h1>
          <p className="text-muted-foreground mt-2 text-[#494A4A]">Find resources and support for your sales CRM</p>
        </div>

        <Tabs defaultValue="guides">
          <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start h-auto p-0 space-x-6">
            <TabsTrigger 
              value="guides" 
              className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
            >
              Getting Started
            </TabsTrigger>
            <TabsTrigger 
              value="videos" 
              className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
            >
              Video Tutorials
            </TabsTrigger>
            <TabsTrigger 
              value="faq" 
              className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
            >
              FAQ
            </TabsTrigger>
            <TabsTrigger 
              value="support" 
              className="px-0 py-3 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#116fae] data-[state=active]:border-b-2 data-[state=active]:border-[#116fae] rounded-none"
            >
              Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guides" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white shadow-none border-0">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">CRM Basics</CardTitle>
                    <BookOpen className="h-5 w-5 text-[#116fae]" />
                  </div>
                  <CardDescription>Learn the fundamentals of your CRM system</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#116fae]" />
                      <span className="text-sm">Dashboard overview</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#116fae]" />
                      <span className="text-sm">Managing customer records</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#116fae]" />
                      <span className="text-sm">Creating and tracking orders</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#116fae]" />
                      <span className="text-sm">Product catalog management</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4 border-[#8A8A8A] hover:border-[#1482CC] hover:bg-[#D2EAFA]">
                    Read Guide
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-none border-0">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Sales Pipeline</CardTitle>
                    <BookOpen className="h-5 w-5 text-[#116fae]" />
                  </div>
                  <CardDescription>Master your sales process from lead to close</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#116fae]" />
                      <span className="text-sm">Creating sales opportunities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#116fae]" />
                      <span className="text-sm">Lead qualification process</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#116fae]" />
                      <span className="text-sm">Managing the sales pipeline</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#116fae]" />
                      <span className="text-sm">Closing deals efficiently</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4 border-[#8A8A8A] hover:border-[#1482CC] hover:bg-[#D2EAFA]">
                    Read Guide
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-none border-0">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Marketing Tools</CardTitle>
                    <BookOpen className="h-5 w-5 text-[#116fae]" />
                  </div>
                  <CardDescription>Leverage marketing features to attract customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#116fae]" />
                      <span className="text-sm">Creating marketing campaigns</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#116fae]" />
                      <span className="text-sm">Email marketing automation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#116fae]" />
                      <span className="text-sm">Discount code management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#116fae]" />
                      <span className="text-sm">Tracking campaign performance</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4 border-[#8A8A8A] hover:border-[#1482CC] hover:bg-[#D2EAFA]">
                    Read Guide
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white shadow-none border-0">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Getting Started</CardTitle>
                    <Video className="h-5 w-5 text-[#116fae]" />
                  </div>
                  <CardDescription>CRM overview tutorials</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-slate-100 p-4 rounded-md">
                      <div className="aspect-video bg-slate-200 rounded-md relative mb-2 flex items-center justify-center">
                        <div className="absolute w-12 h-12 bg-[#116fae] rounded-full flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5V19L19 12L8 5Z" fill="white" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="font-medium">CRM Dashboard Tutorial</h3>
                      <p className="text-xs text-muted-foreground">5:42 mins</p>
                    </div>
                    
                    <div className="bg-slate-100 p-4 rounded-md">
                      <div className="aspect-video bg-slate-200 rounded-md relative mb-2 flex items-center justify-center">
                        <div className="absolute w-12 h-12 bg-[#116fae] rounded-full flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5V19L19 12L8 5Z" fill="white" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="font-medium">Customer Management</h3>
                      <p className="text-xs text-muted-foreground">7:15 mins</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-none border-0">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Sales Process</CardTitle>
                    <Video className="h-5 w-5 text-[#116fae]" />
                  </div>
                  <CardDescription>Master your sales workflow</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-slate-100 p-4 rounded-md">
                      <div className="aspect-video bg-slate-200 rounded-md relative mb-2 flex items-center justify-center">
                        <div className="absolute w-12 h-12 bg-[#116fae] rounded-full flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5V19L19 12L8 5Z" fill="white" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="font-medium">Creating New Orders</h3>
                      <p className="text-xs text-muted-foreground">6:30 mins</p>
                    </div>
                    
                    <div className="bg-slate-100 p-4 rounded-md">
                      <div className="aspect-video bg-slate-200 rounded-md relative mb-2 flex items-center justify-center">
                        <div className="absolute w-12 h-12 bg-[#116fae] rounded-full flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5V19L19 12L8 5Z" fill="white" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="font-medium">Lead Conversion</h3>
                      <p className="text-xs text-muted-foreground">8:45 mins</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-none border-0">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Advanced Features</CardTitle>
                    <Video className="h-5 w-5 text-[#116fae]" />
                  </div>
                  <CardDescription>Unlock the full potential of your CRM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-slate-100 p-4 rounded-md">
                      <div className="aspect-video bg-slate-200 rounded-md relative mb-2 flex items-center justify-center">
                        <div className="absolute w-12 h-12 bg-[#116fae] rounded-full flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5V19L19 12L8 5Z" fill="white" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="font-medium">Sales Forecasting</h3>
                      <p className="text-xs text-muted-foreground">9:20 mins</p>
                    </div>
                    
                    <div className="bg-slate-100 p-4 rounded-md">
                      <div className="aspect-video bg-slate-200 rounded-md relative mb-2 flex items-center justify-center">
                        <div className="absolute w-12 h-12 bg-[#116fae] rounded-full flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5V19L19 12L8 5Z" fill="white" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="font-medium">Custom Reports</h3>
                      <p className="text-xs text-muted-foreground">11:05 mins</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="mt-6 space-y-6">
            <Card className="bg-white shadow-none border-0">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions about using your sales CRM</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-[#116fae]" />
                    How do I add a new customer to the CRM?
                  </h3>
                  <p className="text-sm mt-2 pl-7">
                    Navigate to the Customers section in the sidebar, then click the "Add Customer" button. Fill out the required information and click "Save" to create a new customer record.
                  </p>
                  <Separator className="my-4" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-[#116fae]" />
                    Can I customize the sales pipeline stages?
                  </h3>
                  <p className="text-sm mt-2 pl-7">
                    Yes, you can customize your sales pipeline stages by going to Settings {'>'}  Sales Pipeline. There, you can add, edit, or remove stages to match your sales process.
                  </p>
                  <Separator className="my-4" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-[#116fae]" />
                    How do I create a new discount code?
                  </h3>
                  <p className="text-sm mt-2 pl-7">
                    Navigate to the Discounts section from the sidebar, click "Add Discount," and fill in the discount details including code, value, and validity period. You can also set usage limitations and conditions.
                  </p>
                  <Separator className="my-4" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-[#116fae]" />
                    How can I track my sales team's performance?
                  </h3>
                  <p className="text-sm mt-2 pl-7">
                    The Dashboard displays key performance indicators for your sales team. For more detailed analytics, go to Reports {'>'}  Sales Performance where you can filter by team member, date range, and product categories.
                  </p>
                  <Separator className="my-4" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-[#116fae]" />
                    How do I export my customer data?
                  </h3>
                  <p className="text-sm mt-2 pl-7">
                    Go to Customers, select the customers you want to export (or select all), click the "Export" button, and choose your preferred file format (CSV, Excel, or PDF).
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white shadow-none border-0">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Search Knowledge Base</CardTitle>
                    <Search className="h-5 w-5 text-[#116fae]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">Find answers to your questions in our extensive knowledge base.</p>
                  <Button variant="outline" className="w-full text-[#252626]" style={{ borderRadius: "8px" }}>
                    Browse Articles
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-none border-0">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Contact Support</CardTitle>
                    <MessageCircle className="h-5 w-5 text-[#116fae]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">Get in touch with our dedicated support team for personalized help.</p>
                  <Button variant="outline" className="w-full text-[#252626]" style={{ borderRadius: "8px" }}>
                    Open Ticket
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-none border-0">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Documentation</CardTitle>
                    <FileText className="h-5 w-5 text-[#116fae]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">Access detailed documentation about all CRM features and functions.</p>
                  <Button variant="outline" className="w-full text-[#252626]" style={{ borderRadius: "8px" }}>
                    View Documentation
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white shadow-none border-0">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-md">
                    <h3 className="font-medium">Support Hours</h3>
                    <p className="text-sm text-muted-foreground mt-1">Monday - Friday: 9am - 6pm EST</p>
                    <p className="text-sm text-muted-foreground">Saturday: 10am - 2pm EST</p>
                    <p className="text-sm text-muted-foreground">Sunday: Closed</p>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-md">
                    <h3 className="font-medium">Response Time</h3>
                    <p className="text-sm text-muted-foreground mt-1">Regular tickets: Within 24 hours</p>
                    <p className="text-sm text-muted-foreground">Priority tickets: Within 4 hours</p>
                    <p className="text-sm text-muted-foreground">Emergency: Within 1 hour</p>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Additional Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="border-[#8A8A8A] hover:border-[#1482CC] hover:bg-[#D2EAFA]">
                      <FileText className="h-4 w-4 mr-2" /> User Guides
                    </Button>
                    <Button variant="outline" className="border-[#8A8A8A] hover:border-[#1482CC] hover:bg-[#D2EAFA]">
                      <Video className="h-4 w-4 mr-2" /> Webinars
                    </Button>
                    <Button variant="outline" className="border-[#8A8A8A] hover:border-[#1482CC] hover:bg-[#D2EAFA]">
                      <BookOpen className="h-4 w-4 mr-2" /> Blog
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default HelpCenter;
