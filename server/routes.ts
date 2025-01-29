import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { appointments, services, testimonials, stylists, portfolioItems } from "@db/schema";
import { eq } from "drizzle-orm";
import OpenAI from "openai";
import { z } from "zod";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const chatMessageSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

export function registerRoutes(app: Express): Server {
  // Services
  app.get("/api/services", async (_req, res) => {
    const allServices = await db.select().from(services);
    res.json(allServices);
  });

  // Appointments
  app.post("/api/appointments", async (req, res) => {
    const appointment = await db.insert(appointments).values(req.body).returning();
    res.json(appointment[0]);
  });

  app.get("/api/appointments", async (req, res) => {
    const { date } = req.query;
    const results = await db.select()
      .from(appointments)
      .where(date ? eq(appointments.dateTime, new Date(date as string)) : undefined);
    res.json(results);
  });

  // Testimonials
  app.get("/api/testimonials", async (_req, res) => {
    const allTestimonials = await db.select().from(testimonials);
    res.json(allTestimonials);
  });

  // Stylists
  app.get("/api/stylists", async (_req, res) => {
    const allStylists = await db.select().from(stylists);
    res.json(allStylists);
  });

  app.get("/api/stylists/:id", async (req, res) => {
    const stylist = await db.select()
      .from(stylists)
      .where(eq(stylists.id, parseInt(req.params.id)));

    if (stylist.length === 0) {
      return res.status(404).json({ message: "Stylist not found" });
    }

    const portfolio = await db.select()
      .from(portfolioItems)
      .where(eq(portfolioItems.stylistId, parseInt(req.params.id)));

    res.json({
      ...stylist[0],
      portfolio
    });
  });

  // Portfolio Items
  app.get("/api/portfolio", async (req, res) => {
    const { category } = req.query;
    const query = db.select({
      portfolioItem: portfolioItems,
      stylist: {
        name: stylists.name,
        title: stylists.title
      }
    })
    .from(portfolioItems)
    .leftJoin(stylists, eq(portfolioItems.stylistId, stylists.id));

    if (category) {
      query.where(eq(portfolioItems.category, category as string));
    }

    const results = await query;
    res.json(results);
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