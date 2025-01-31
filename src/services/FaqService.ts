import client from "@/libs/prismaClient";
class FAQService {
  async getFAQs() {
    const faqs = await client.fAQ.create({
      data: {
        question: "What is the capital of France?",
        answer: "Paris",
      },
    });
    return faqs;
  }
}

export default new FAQService();
