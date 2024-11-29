import { get_prompt, GPT_MODEL_1 } from "../constants.js";
import APIErrorResponse from "../lib/APIErrorResponse.js";
import promiseHandler from "../utils/promiseHandler.js";
import OpenAi from "openai";

const generateConversationStarters = promiseHandler(async (req, res) => {
    res.status(200).json({
        data : "Array of Conversation Starters!"
    })
});

const answerTheQuestion = promiseHandler(async (req, res, next) => {

    const openai = new OpenAi();

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const { topic } = req.body;

    if(!topic){
        throw new APIErrorResponse(400, "Topic is required to generate the response");
    }
        
    const stream = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: "You are a scientific writer who creates well-structured, technically accurate content with proper markdown formatting and LaTeX chemical equations."
            },
            {
                role: "user",
                content: topic
            }
        ],
        stream: true,
    });

    for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
    }

    res.write('data: [DONE]\n\n');
    res.end();
});

const generateRelatedQuestions = promiseHandler(async (req, res) => {
    res.status(200).json({
        data : "Array Of Related Questions based on the previous answer!"
    })
});

export {
    generateConversationStarters,
    answerTheQuestion,
    generateRelatedQuestions
}