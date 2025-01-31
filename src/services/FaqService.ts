class FAQService {
  async getFAQs() {
    // return await FAQModel.find();
    return [
      {
        question: "What is the capital of France?",
        answer: "Paris",
      },
      {
        question: "What is the capital of Spain?",
        answer: "Madrid",
      },
    ];
  }
}

export default new FAQService();
