import client from "@/libs/prismaClient";
class FAQService {
  async searchFAQs(q: string) {
    const faqs = await client.fAQ.findMany({
      select: {
        id: true,
        question: true,
        answer: true,
      },
      where: {
        question: {
          contains: q,
          mode: "insensitive",
        },
      },
    });
    return faqs;
  }
  async getFAQs() {
    const faqs = await client.fAQ.findMany();
    return faqs;
  }
  async getFAQ(id: string) {
    const faq = await client.fAQ.findUnique({
      where: {
        id,
      },
    });
    return faq;
  }
}

export default new FAQService();
