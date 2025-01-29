import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const testimonialSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  content: z.string().min(10, "Testimonial must be at least 10 characters"),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export default function TestimonialForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      customerName: "",
      content: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: TestimonialFormValues) => {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Failed to submit testimonial");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Thank you for your testimonial!",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit testimonial. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: TestimonialFormValues) => {
    mutation.mutate(values);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Experience</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your experience with us..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Tell us about your experience with our services
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Submitting..." : "Submit Testimonial"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
