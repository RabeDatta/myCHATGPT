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
router.post("/summary", summary);
router.post("/paragraph", paragraph);
router.post("/chatbot", chatbot);
router.post("/js-converter", jsconverter);
router.post("/scifi-image", scifiImage);

export default router;
