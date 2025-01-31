import { Request, Response } from "express";
import faqService from "@/services/FaqService";

class FAQController {
  async getFAQs(req: Request, res: Response) {
    const faqs = await faqService.getFAQs();
    res.send(faqs);
  }
}
export default new FAQController();
