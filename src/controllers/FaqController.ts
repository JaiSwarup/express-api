import { Request, Response, Router } from "express";
import FaqService from "@/services/FaqService";
import { faqCache } from "@/middlewares/cacheMiddleware";
import redisClient from "@/libs/redisClient";

class FAQController {
  private faqService: FaqService;
  public router: Router;

  constructor() {
    this.faqService = new FaqService();
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.post("/:id/translate", this.addTranslation);

    this.router.get("/:id", faqCache, this.getFAQ);
    this.router.put("/:id", this.updateFAQ);
    this.router.delete("/:id", this.deleteFAQ);

    this.router.post("/", this.createFAQ);
    this.router.get("/", this.getFAQs);
  }
  public updateFAQ = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.body);
      const { id } = req.params;
      const { question, answer, text } = req.body;
      await this.faqService.updateFAQ(id, {
        question,
        answer: JSON.parse(answer),
        text,
      });
      redisClient.del(`faq-${id}`);
      res.status(200).json(req.body);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  public deleteFAQ = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.faqService.deleteFAQ(id);
      redisClient.del(`faq-${id}`);
      res.status(200).json({ message: "FAQ deleted" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  public getFAQs = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.faqService.getFAQs();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  public getFAQ = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { lang } = req.query;
      if (lang) {
        const data = await this.faqService.getTranslation(id, lang as string);
        redisClient.setEx(`faq-${id}:${lang}`, 3600, JSON.stringify(data));
        res.status(200).json(data);
        return;
      }
      const data = await this.faqService.getFAQ(id);
      redisClient.setEx(`faq-${id}:default`, 3600, JSON.stringify(data));
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  private createFAQ = async (req: Request, res: Response): Promise<void> => {
    try {
      const { question, answer, text } = req.body;
      await this.faqService.createFAQ({
        question,
        answer: JSON.parse(answer),
        text,
      });
      res.status(200).json(req.body);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  public addTranslation = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { lang } = req.query;
      await this.faqService.addTranslation(id, lang as string);
      res.status(200).json({ message: "Translation added" });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
}
export default FAQController;
