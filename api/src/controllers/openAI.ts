import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import db from "../config/db";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const summary = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Summarize this \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });

    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err: any) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

const paragraph = async (req: Request, res: Response) => {
  try {
  } catch (err) {}
};

const chatbot = async (req: Request, res: Response) => {};
const jsconverter = async (req: Request, res: Response) => {};
const scifiImage = async (req: Request, res: Response) => {};

export { summary, paragraph, chatbot, jsconverter, scifiImage };
