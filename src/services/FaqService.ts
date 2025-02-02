import FaqRepository from "@/repository/FaqRepostiory";
import { translateFaq } from "@/libs/translate";
class FAQService {
  async addTranslation(id: string, lang: string) {
    const existingTranslation = await FaqRepository.getTranslation(id, lang);
    if (existingTranslation) {
      throw new Error("Translation already exists");
    }
    const faq = await FaqRepository.getFAQ(id);
    if (!faq) {
      throw new Error("FAQ not found");
    }
    const [question, text] = await translateFaq([faq.question, faq.text], lang);

    return await FaqRepository.addTranslation(id, lang, { question, text });
  }
  async createFAQ(arg0: { question: string; answer: string; text: string }) {
    return await FaqRepository.createFAQ(arg0);
  }
  async updateFAQ(
    id: string,
    arg1: { question: string; answer: string; text: string }
  ) {
    return await FaqRepository.updateFAQ(id, arg1);
  }
  async deleteFAQ(id: string) {
    return await FaqRepository.deleteFAQ(id);
  }
  async searchFAQs(q: string) {
    return await FaqRepository.searchFAQs(q);
  }

  async getFAQs() {
    return await FaqRepository.getFAQs();
  }

  async getFAQ(id: string) {
    return await FaqRepository.getFAQ(id);
  }

  async getTranslation(id: string, lang: string) {
    return await FaqRepository.getTranslation(id, lang);
  }
}

export default FAQService;
