import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  duration: integer("duration").notNull(),
  price: integer("price").notNull(),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").references(() => services.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  dateTime: timestamp("date_time").notNull(),
  status: text("status").notNull().default("pending"),
  notes: text("notes"),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  date: timestamp("date").notNull().defaultNow(),
});

// Schema types
export const insertServiceSchema = createInsertSchema(services);
export const selectServiceSchema = createSelectSchema(services);
export const insertAppointmentSchema = createInsertSchema(appointments);
export const selectAppointmentSchema = createSelectSchema(appointments);
export const insertTestimonialSchema = createInsertSchema(testimonials);
export const selectTestimonialSchema = createSelectSchema(testimonials);

// Type exports
export type InsertService = typeof services.$inferInsert;
export type SelectService = typeof services.$inferSelect;
export type InsertAppointment = typeof appointments.$inferInsert;
export type SelectAppointment = typeof appointments.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;
export type SelectTestimonial = typeof testimonials.$inferSelect;