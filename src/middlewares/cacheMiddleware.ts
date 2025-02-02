import { Response, Request, NextFunction } from "express";
import redisClient from "@/libs/redisClient";
import { promisify } from "util";

export const faqCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { lang } = req.query;
  try {
    if (lang) {
      const data = await redisClient.get(`faq-${id}:${lang}`);
      console.log(data);
      if (data) {
        res.status(200).json(JSON.parse(data));
        return;
      }
    } else {
      const data = await redisClient.get(`faq-${id}:default`);
      if (data) {
        res.status(200).json(JSON.parse(data));
        return;
      }
    }
    console.log("no cache found");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
  next();
  return;
};
