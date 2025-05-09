
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, FileText, BarChart4, PieChart, MessageSquare } from "lucide-react";

export const HelpGeneralGuides = () => {
  const guides = [
    {
      title: "Getting Started with Your CRM",
      description: "Learn the basics of navigating and using your CRM system effectively.",
      icon: <BookOpen className="h-6 w-6 text-[#116fae]" />,
    },
    {
      title: "Managing Customer Relationships",
      description: "Best practices for tracking and nurturing customer relationships.",
      icon: <Users className="h-6 w-6 text-[#116fae]" />,
    },
    {
      title: "Sales Pipeline Management",
      description: "How to organize and optimize your sales pipeline for better results.",
      icon: <BarChart4 className="h-6 w-6 text-[#116fae]" />,
    },
    {
      title: "Creating Effective Reports",
      description: "Generate insightful reports to track performance and identify opportunities.",
      icon: <PieChart className="h-6 w-6 text-[#116fae]" />,
    },
    {
      title: "Marketing Campaign Integration",
      description: "Connect your marketing efforts with your sales activities.",
      icon: <FileText className="h-6 w-6 text-[#116fae]" />,
    },
    {
      title: "Customer Communication Tools",
      description: "Leverage communication features to stay connected with customers.",
      icon: <MessageSquare className="h-6 w-6 text-[#116fae]" />,
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide, index) => (
          <Card key={index} className="bg-white">
            <CardHeader className="flex flex-row items-start space-x-4 pb-2">
              <div className="mt-1">{guide.icon}</div>
              <div>
                <CardTitle className="text-xl">{guide.title}</CardTitle>
                <CardDescription className="mt-2">{guide.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="p-0 h-auto text-[#116fae]">
                Read guide →
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>New to Sales CRM?</CardTitle>
          <CardDescription>
            Our comprehensive onboarding guide will help you get started with all essential features.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Follow our step-by-step walkthrough to set up your workspace and start managing your sales pipeline effectively.</p>
          <Button className="mt-2">
            Start Onboarding Guide
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
