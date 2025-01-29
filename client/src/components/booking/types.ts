import { z } from "zod";

export const appointmentFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  serviceId: z.string().min(1, "Please select a service"),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().min(1, "Please select a time"),
  location: z.string().min(1, "Location is required"),
  completionTime: z.string().min(1, "Completion time is required"),
  numMakeupServices: z.number().min(1, "Number of people is required"),
  needsHairStyling: z.boolean(),
  numHairServices: z.number().optional(),
  wantsSkincare: z.boolean(),
  notes: z.string().optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

export type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
};
