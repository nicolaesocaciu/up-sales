
// This is just a placeholder component for demonstration
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const ShopifyForm = () => {
  const form = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    console.log("Connecting to Shopify:", data);
    setTimeout(() => setIsSubmitting(false), 1500);
  };
  
  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="shopUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shopify Store URL</FormLabel>
                <FormControl>
                  <Input placeholder="yourstore.myshopify.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Key</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Connecting..." : "Connect to Shopify"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
