import FaqRepository from "@/repository/FaqRepostiory";
class FAQService {
  async createFAQ(arg0: { question: any; answer: any }) {
    return await FaqRepository.createFAQ(arg0);
  }
  async updateFAQ(id: string, arg1: { question: any; answer: any }) {
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
}

export default FAQService;
