
// This is just a placeholder component for demonstration
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const WordpressForm = () => {
  const form = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    console.log("Connecting to WordPress:", data);
    setTimeout(() => setIsSubmitting(false), 1500);
  };
  
  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="siteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WordPress Site URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://yoursite.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password or API Key</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Connecting..." : "Connect to WordPress"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
