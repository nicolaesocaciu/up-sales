
// This is just a placeholder component for demonstration
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const SalesforceForm = () => {
  const form = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    console.log("Connecting to Salesforce:", data);
    setTimeout(() => setIsSubmitting(false), 1500);
  };
  
  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="instanceUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salesforce Instance URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourinstance.salesforce.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="clientSecret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Secret</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Connecting..." : "Connect to Salesforce"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
