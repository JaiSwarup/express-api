import client from "@/libs/prismaClient";

const FaqRepository = client.$extends({
  model: {
    fAQ: {
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
      },
      async getFAQs() {
        const faqs = await client.fAQ.findMany({
          select: {
            id: true,
            question: true,
            answer: true,
          },
        });
        return faqs;
      },
      async getFAQ(id: string) {
        const faq = await client.fAQ.findUnique({
          where: {
            id,
          },
        });
        return faq;
      },
      async createFAQ(data: { question: string; answer: string }) {
        const faq = await client.fAQ.create({
          data,
        });
        return faq;
      },
      async updateFAQ(id: string, data: { question: string; answer: string }) {
        const faq = await client.fAQ.update({
          where: {
            id,
          },
          data,
        });
        return faq;
      },
      async deleteFAQ(id: string) {
        const faq = await client.fAQ.delete({
          where: {
            id,
          },
        });
        return faq;
      },
    },
  },
}).fAQ;

export default FaqRepository;
