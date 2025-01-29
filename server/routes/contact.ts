import { Router } from "express";
import { db } from "@/db";
import { contact_info } from "@db/schema";

const router = Router();

router.get("/api/contact", async (req, res) => {
  try {
    const contactInfo = await db.query.contact_info.findFirst();
    if (!contactInfo) {
      return res.status(404).json({ error: "Contact information not found" });
    }
    return res.json(contactInfo);
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/api/contact", async (req, res) => {
  try {
    const { id, ...contactData } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Contact ID is required" });
    }

    await db
      .update(contact_info)
      .set(contactData)
      .where(eq(contact_info.id, id));

    return res.json({ message: "Contact information updated successfully" });
  } catch (error) {
    console.error("Error updating contact info:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;