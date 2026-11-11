import { Router } from "express";
import { getEventById, getEvents } from "../controllers/event-controller.js";

// app.js'te "/events" öneki verildi; buradaki yollar onun devamı
const router = Router();

router.get("/", getEvents);
router.get("/:id", getEventById);

export default router;
