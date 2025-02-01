import { Request, Response } from "express";
import FaqService from "@/services/FaqService";

class FAQController {
  async getFAQs(req: Request, res: Response) {
    const { q } = req.query;
    if (q && typeof q === "string") {
      const faqs = await FaqService.searchFAQs(q);
      res.json(faqs);
    }
    const faqs = await FaqService.getFAQs();
    res.json(faqs);
  }
  async getFAQ(req: Request, res: Response) {
    const { id } = req.params;
    const { lang } = req.query;
    const faq = await FaqService.getFAQ(id);
    res.json({ faq, lang });
  }
}
export default new FAQController();
