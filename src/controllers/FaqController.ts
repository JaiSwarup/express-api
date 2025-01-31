import { Request, Response } from "express";
import FaqService from "@/services/FaqService";

class FAQController {
  async getFAQs(req: Request, res: Response) {
    const faqs = await FaqService.getFAQs();
    console.log(faqs);
    return faqs;
  }
}
export default new FAQController();
