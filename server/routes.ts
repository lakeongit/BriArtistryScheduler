import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { appointments, services, testimonials, beautyTips } from "@db/schema";
import { eq, and, or, desc } from "drizzle-orm";
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

  // Beauty Tips
  app.get("/api/beauty-tips", async (req, res) => {
    const { category, skinType, hairType, seasonality } = req.query;

    let conditions = [];
    if (category && category !== 'all') {
      conditions.push(eq(beautyTips.category, category as string));
    }
    if (skinType && skinType !== 'all') {
      conditions.push(eq(beautyTips.skinType, skinType as string));
    }
    if (hairType && hairType !== 'all') {
      conditions.push(eq(beautyTips.hairType, hairType as string));
    }
    if (seasonality && seasonality !== 'all') {
      conditions.push(eq(beautyTips.seasonality, seasonality as string));
    }

    const query = db.select().from(beautyTips)
      .orderBy(desc(beautyTips.createdAt));

    if (conditions.length > 0) {
      query.where(and(...conditions));
    }

    const tips = await query;
    res.json(tips);
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