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
            text: true,
          },
          where: {
            OR: [
              {
                question: {
                  contains: q,
                  mode: "insensitive",
                },
              },
              {
                text: {
                  contains: q,
                  mode: "insensitive",
                },
              },
            ],
          },
        });
        return faqs;
      },
      async getFAQs() {
        const faqs = await client.fAQ.findMany({
          select: {
            id: true,
            question: true,
            text: true,
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
      async createFAQ(data: {
        question: string;
        answer: string;
        text: string;
      }) {
        const faq = await client.fAQ.create({
          data,
        });
        return faq;
      },
      async updateFAQ(
        id: string,
        data: { question: string; answer: string; text: string }
      ) {
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
      async addTranslation(
        id: string,
        lang: string,
        data: { question: string; text: string }
      ) {
        const translation = await client.translation.create({
          data: {
            lang,
            faqId: id,
            question: data.question,
            text: data.text,
          },
        });
        return translation;
      },
      async getTranslation(id: string, lang: string) {
        const translation = await client.translation.findFirst({
          where: {
            lang,
            faqId: id,
          },
        });
        return translation;
      },
    },
  },
}).fAQ;

export default FaqRepository;
