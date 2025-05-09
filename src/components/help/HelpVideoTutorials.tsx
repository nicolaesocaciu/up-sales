
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const HelpVideoTutorials = () => {
  const tutorials = [
    {
      title: "Dashboard Overview",
      description: "A complete walkthrough of your CRM dashboard and its features.",
      thumbnail: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=1470&auto=format&fit=crop",
      duration: "5:24"
    },
    {
      title: "Managing Customer Data",
      description: "How to add, edit, and organize your customer information.",
      thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop",
      duration: "8:15"
    },
    {
      title: "Creating Sales Opportunities",
      description: "Learn how to track and manage sales opportunities.",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop",
      duration: "7:42"
    },
    {
      title: "Building Custom Reports",
      description: "Generate insights with custom reporting tools.",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
      duration: "10:38"
    },
    {
      title: "Email Automation Setup",
      description: "Set up automated email sequences for your contacts.",
      thumbnail: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1470&auto=format&fit=crop",
      duration: "12:05"
    },
    {
      title: "Mobile CRM Usage",
      description: "Access your CRM on the go with our mobile features.",
      thumbnail: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1470&auto=format&fit=crop",
      duration: "6:18"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tutorials.map((tutorial, index) => (
          <Card key={index} className="bg-white overflow-hidden">
            <div className="relative">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={tutorial.thumbnail}
                  alt={tutorial.title}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                {tutorial.duration}
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{tutorial.title}</CardTitle>
              <CardDescription>{tutorial.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <button className="flex items-center text-[#116fae] font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Watch tutorial
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Full Video Library</CardTitle>
          <CardDescription>
            Browse our complete collection of tutorial videos covering all aspects of the CRM.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <select className="rounded-md border border-input px-3 py-2 bg-background">
              <option value="all">All Categories</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="reporting">Reporting</option>
              <option value="admin">Administration</option>
            </select>
            <input
              type="text"
              placeholder="Search tutorials..."
              className="rounded-md border border-input px-3 py-2 bg-background flex-1"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
