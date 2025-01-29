import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { appointments, services, testimonials } from "@db/schema";
import { eq } from "drizzle-orm";
import OpenAI from "openai";
import { z } from "zod";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const appointmentSchema = z.object({
  service: z.string().min(1, "Service selection is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dateTime: z.string().min(1, "Date and time are required"),
});

export function registerRoutes(app: Express): Server {
  // Services
  app.get("/api/services", async (_req, res) => {
    const allServices = await db.select().from(services);
    res.json(allServices);
  });

  // Appointments
  app.post("/api/appointments", async (req, res) => {
    try {
      const validatedData = appointmentSchema.parse(req.body);
      const appointment = await db.insert(appointments).values({
        serviceId: parseInt(validatedData.service),
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        dateTime: new Date(validatedData.dateTime),
        status: "pending",
      }).returning();

      res.json(appointment[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      console.error("Appointment creation error:", error);
      res.status(500).json({ message: "Failed to create appointment" });
    }
  });

  app.get("/api/appointments", async (req, res) => {
    try {
      const { date } = req.query;
      const results = await db.select()
        .from(appointments)
        .where(date ? eq(appointments.dateTime, new Date(date as string)) : undefined);
      res.json(results);
    } catch (error) {
      console.error("Appointment fetch error:", error);
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  });

  // Testimonials
  app.get("/api/testimonials", async (_req, res) => {
    const allTestimonials = await db.select().from(testimonials);
    res.json(allTestimonials);
  });

  // AI Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      if (!openai) {
        return res.status(503).json({ 
          message: "Chatbot service is currently unavailable. Please try again later." 
        });
      }

      const validatedBody = chatMessageSchema.safeParse(req.body);
      if (!validatedBody.success) {
        return res.status(400).json({ 
          message: "Invalid request body",
          errors: validatedBody.error.errors 
        });
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a helpful beauty salon assistant. Provide concise, friendly responses about services, pricing, and availability."
          },
          { role: "user", content: validatedBody.data.message }
        ],
        max_tokens: 150
      });

      res.json({ message: response.choices[0].message.content });
    } catch (error) {
      console.error("Chat API Error:", error);
      res.status(500).json({ 
        message: "Failed to process chat request. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}