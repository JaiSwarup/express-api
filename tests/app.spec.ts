import request from "supertest";
import app from "@/app";
import { describe, it, beforeEach, expect, vi } from "vitest";
import connectToDatabase from "@/config/dbConfig";
import { connectToRedis } from "@/config/cacheConfig";

import FAQService from "@/services/FaqService";

describe("FAQ API Endpoints", async () => {
  await connectToDatabase();
  await connectToRedis();
  beforeEach(() => {});

  it("should fetch all FAQs", async () => {
    // FAQService.prototype.getFAQs = vi.fn();
    // .mockResolvedValue([{ id: "1", question: "Q1", answer: "A1" }]);

    const res = await request(app).get("/api/v1/faqs");
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: "cm6mmc8450000vy2k7zc9h3uw",
        question: "Wall-E",
        text: "A robot who has developed sentience, and is the only robot of his kind shown to be still functioning on Earth.\n",
        answer: {
          ops: [
            {
              insert:
                "A robot who has developed sentience, and is the only robot of his kin",
            },
            {
              attributes: {
                bold: true,
              },
              insert: "d shown to be still functioning on Earth.",
            },
            {
              insert: "\n",
            },
          ],
        },
      },
      {
        id: "cm6mmigor0000vy6gmstuhl62",
        question: "Your Faq Question",
        text: "Start Here...\r\n",
        answer: {
          ops: [
            {
              insert: "Start Here...\n",
            },
          ],
        },
      },
    ]);
  });

  it("should fetch a single FAQ", async () => {
    FAQService.prototype.getFAQ = vi.fn().mockResolvedValue({
      id: "1",
      question: "Q1",
      answer: "A1",
    });

    const res = await request(app).get("/api/v1/faqs/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: "1", question: "Q1", answer: "A1" });
  });

  it("should create an FAQ", async () => {
    FAQService.prototype.createFAQ = vi.fn().mockResolvedValue({
      question: "Q1",
      answer: '{"ops":[{"insert":"Start Here...\\n"}]}',
      text: "Start Here...\r\n",
    });

    const res = await request(app).post("/api/v1/faqs").send({
      question: "Q1",
      answer: '{"ops":[{"insert":"Start Here...\\n"}]}',
      text: "Start Here...\r\n",
    });
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      question: "Q1",
      answer: '{"ops":[{"insert":"Start Here...\\n"}]}',
      text: "Start Here...\r\n",
    });
  });

  it("should update an FAQ", async () => {
    FAQService.prototype.updateFAQ = vi.fn().mockResolvedValue({
      question: "Updated Q1",
      answer: '"ops":[{"insert":"Start Here...\\n"}]}',
      text: "Start Here...\r\n",
    });

    const res = await request(app).put("/api/v1/faqs/1").send({
      question: "Updated Q1",
      answer: '{"ops":[{"insert":"Start Here...\\n"}]}',
      text: "Start Here...\r\n",
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      question: "Updated Q1",
      answer: '{"ops":[{"insert":"Start Here...\\n"}]}',
      text: "Start Here...\r\n",
    });
  });

  it("should delete an FAQ", async () => {
    FAQService.prototype.deleteFAQ = vi.fn().mockResolvedValue(true);

    const res = await request(app).delete("/api/v1/faqs/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "FAQ deleted" });
  });
});
