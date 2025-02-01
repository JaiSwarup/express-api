import { AdminController } from "@/controllers/AdminController";
import FAQController from "@/controllers/FaqController";
import { Router } from "express";

class Server {
  public router: Router;
  public faqController: FAQController;
  public adminController: AdminController;
  constructor() {
    this.router = Router();
    this.faqController = new FAQController();
    this.adminController = new AdminController();
    this.routes();
  }
  private routes() {
    this.router.use("/faqs", this.faqController.router);
    this.router.use("/admin", this.adminController.router);
  }
}

export default Server;
