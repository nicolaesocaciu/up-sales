
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const HelpFAQ = () => {
  const faqs = [
    {
      question: "How do I import my existing customer data?",
      answer: "You can import customer data by navigating to the Customers page and clicking the 'Import' button. We support CSV, Excel, and direct imports from popular CRMs. For large data sets, contact our support team for assisted migration."
    },
    {
      question: "Can I customize the sales pipeline stages?",
      answer: "Yes, you can fully customize your sales pipeline stages. Go to Settings > General > Pipeline Settings and click on 'Edit Pipeline Stages'. From there you can add, remove, or reorder stages to match your sales process."
    },
    {
      question: "How do I set up email templates?",
      answer: "Email templates can be created in the Marketing section. Click on 'Templates' in the sidebar, then 'New Template'. You can use our drag-and-drop editor to design templates, add merge fields for personalization, and save them for future use."
    },
    {
      question: "Is there a limit to the number of users I can add?",
      answer: "The number of users depends on your subscription plan. Basic plans include up to 5 users, Professional plans include up to 15 users, and Enterprise plans offer unlimited users. You can view and manage your user count in your account settings."
    },
    {
      question: "How can I track my sales team's performance?",
      answer: "Sales performance can be tracked through the Reports section. You can generate reports on deals closed, revenue by sales rep, activity metrics, and more. You can also set up automated reports to be delivered to your email on a schedule."
    },
    {
      question: "Can I integrate with my accounting software?",
      answer: "Yes, we offer integrations with popular accounting software including QuickBooks, Xero, and FreshBooks. Go to Settings > Integrations to set up these connections. Custom API integrations are also available on Enterprise plans."
    },
    {
      question: "How do I set up automated workflows?",
      answer: "Automated workflows can be created in the Settings > Automation section. You can set triggers (like 'when a deal moves to stage X') and actions (like 'send notification email to manager'). Our visual workflow builder makes it easy to create complex automations."
    },
    {
      question: "What mobile capabilities are available?",
      answer: "Our mobile app is available for iOS and Android, offering key features like contact management, deal updates, task management, and notes. You can also access the full web version through your mobile browser if you need additional features."
    }
  ];

  const categories = [
    "All FAQs",
    "Account & Billing",
    "Data Management",
    "Sales Tools",
    "Integration",
    "Reporting",
    "Mobile Access"
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Find answers to common questions about using your CRM system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex overflow-x-auto pb-4 mb-4 gap-2">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full rounded-md border border-input px-3 py-2 mb-4"
            />
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Knowledge Base</CardTitle>
            <CardDescription>
              Browse our extensive knowledge base for detailed guides.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Visit Knowledge Base
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Community Forums</CardTitle>
            <CardDescription>
              Connect with other users and share tips and solutions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Join Community
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
