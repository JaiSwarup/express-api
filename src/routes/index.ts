import faqroutes from "@/routes/faq";
import { Router } from "express";

const router = Router();

router.use("/faqs", faqroutes);

export default router;
