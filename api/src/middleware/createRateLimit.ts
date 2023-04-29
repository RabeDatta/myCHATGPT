const rateLimit = require("express-rate-limit");
import { Request, Response } from "express";

export const createRateLimitMiddleware = (
  maxRequests: number,
  windowInMinutes: number
) => {
  return rateLimit({
    windowMs: windowInMinutes * 60 * 1000,
    max: maxRequests,
    message: `You can only request ${maxRequests} images per ${windowInMinutes} minutes. Please wait and try again later.`,
    keyGenerator: (req: Request) => {
      return req.ip; // Use the IP address as the unique identifier for each user
    },
    headers: true,
    handler: (req: Request, res: Response) => {
      res.status(429).json({
        isSuccessful: false,
        message:
          "You have exceeded the rate limit. Please wait and try again later.",
      });
    },
  });
};
