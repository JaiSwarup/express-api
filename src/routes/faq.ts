import { RequestHandler, Router } from "express";
import FaqController from "@/controllers/FaqController";

const router = Router();

router
  .get("/", FaqController.getFAQs as RequestHandler)
  .get("/:id", FaqController.getFAQ as RequestHandler);

export default router;
