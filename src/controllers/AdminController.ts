import FaqService from "@/services/FaqService";
import { Router, Request, Response } from "express";

export class AdminController {
  private faqService: FaqService;
  public router: Router;

  constructor() {
    this.faqService = new FaqService();
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.use("/new", this.createFAQ);
    this.router.use("/:id/edit", this.updateFAQ);
    this.router.use("/:id/delete", this.deleteFAQ);
    this.router.use("/:id", this.getFAQ);
    this.router.use("/", this.getFAQs);
  }

  public getFAQs = async (req: Request, res: Response): Promise<void> => {
    try {
      const faqs = await this.faqService.getFAQs();
      console.log(faqs);
      res.render("faqs", { faqs });
    } catch (error) {
      res.render("error", { message: error });
    }
  };

  public getFAQ = async (req: Request, res: Response): Promise<void> => {
    console.log("idk");
    try {
      const { id } = req.params;
      const faq = await this.faqService.getFAQ(id);
      res.render("faq-id", { faq });
    } catch (error) {
      res.render("error", { message: error });
    }
  };
  public createFAQ = async (req: Request, res: Response): Promise<void> => {
    res.render("faq-new");
    return;
  };

  public updateFAQ = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const faq = await this.faqService.getFAQ(id);
      if (!faq) {
        res.render("error", { message: "FAQ not found" });
        return;
      }

      res.render("faq-edit", {
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
      });
    } catch (error) {
      res.render("error", { message: error });
    }
  };

  public deleteFAQ = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.faqService.deleteFAQ(id);
      res.redirect("/admin");
    } catch (error) {
      res.render("error", { message: error });
    }
  };
}
