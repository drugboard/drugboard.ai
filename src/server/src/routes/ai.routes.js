import express from "express";
import { answerTheQuestion, generateConversationStarters, generateRelatedQuestions } from "../controllers/ai.controller.js";

const aiRouter = express.Router();

aiRouter.get("/generateConversationStarters", generateConversationStarters)
aiRouter.post("/answerTheQuestion", answerTheQuestion);

export default aiRouter;