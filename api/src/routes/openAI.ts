import express from "express";
import {
  summary,
  wiki,
  sqlQueryGenerator,
  jsconverter,
  scifiImage,
} from "../controllers/openAI";
const router = express.Router();
import { createRateLimitMiddleware } from "../middleware/createRateLimit";
import { verifyCookieToken } from "../middleware/verifyAuth";

const scifiImageRateLimit = createRateLimitMiddleware(4, 2); // 6 requests per 2 minute
const sqlQueryRateLimit = createRateLimitMiddleware(8, 1); // 8 requests per 1 minute
const summaryRateLimit = createRateLimitMiddleware(6, 1); // 6 requests per 1 minute

//route
router.post("/summary", verifyCookieToken, summaryRateLimit, summary);
router.post("/wiki", verifyCookieToken, summaryRateLimit, wiki);
router.post(
  "/sql-query",
  verifyCookieToken,
  sqlQueryRateLimit,
  sqlQueryGenerator
);
router.post("/js-converter", verifyCookieToken, sqlQueryRateLimit, jsconverter);
router.post("/scifi-image", verifyCookieToken, scifiImageRateLimit, scifiImage);

export default router;
