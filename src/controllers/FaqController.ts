import { Request, Response, Router } from "express";
import FaqService from "@/services/FaqService";

class FAQController {
  private faqService: FaqService;
  public router: Router;

  constructor() {
    this.faqService = new FaqService();
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.get("/:id", this.getFAQ);
    this.router.put("/:id", this.updateFAQ);
    this.router.delete("/:id", this.deleteFAQ);

    this.router.post("/", this.createFAQ);
    this.router.get("/", this.getFAQs);
  }
  public updateFAQ = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.body);
      const { id } = req.params;
      const { question, answer } = req.body;
      await this.faqService.updateFAQ(id, {
        question,
        answer: JSON.parse(answer),
      });
      res.status(200).json(req.body);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  public deleteFAQ = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.faqService.deleteFAQ(id);
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
      const data = await this.faqService.getFAQ(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  private createFAQ = async (req: Request, res: Response): Promise<void> => {
    try {
      const { question, answer } = req.body;
      await this.faqService.createFAQ({
        question,
        answer: JSON.parse(answer),
      });
      res.status(200).json(req.body);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
}
export default FAQController;
