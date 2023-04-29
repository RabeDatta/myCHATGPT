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

const scifiImageRateLimit = createRateLimitMiddleware(4, 2); // 6 requests per 2 minute
const sqlQueryRateLimit = createRateLimitMiddleware(8, 1); // 8 requests per 1 minute
const summaryRateLimit = createRateLimitMiddleware(6, 1); // 6 requests per 1 minute

//route
router.post("/summary", summaryRateLimit, summary);
router.post("/wiki", summaryRateLimit, wiki);
router.post("/sql-query", sqlQueryRateLimit, sqlQueryGenerator);
router.post("/js-converter", sqlQueryRateLimit, jsconverter);
router.post("/scifi-image", scifiImageRateLimit, scifiImage);

export default router;
