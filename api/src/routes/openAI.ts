import express from "express";
import {
  summary,
  paragraph,
  chatbot,
  jsconverter,
  scifiImage,
} from "../controllers/openAI";
import { verifyCookieToken } from "../middleware/auth";

const router = express.Router();

//route
router.post("/summary", verifyCookieToken, summary);
router.post("/paragraph", verifyCookieToken, paragraph);
router.post("/chatbot", verifyCookieToken, chatbot);
router.post("/js-converter", verifyCookieToken, jsconverter);
router.post("/scifi-image", verifyCookieToken, scifiImage);

export default router;
