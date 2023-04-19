import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import db from "../config/db";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const summary = async (req: Request, res: Response) => {
  try {
    console.log("HELLLO.............................");
    const timestamp = new Date().toISOString();

    const { value: paragraph } = req.body;
    console.log("paragraph", paragraph);

    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Summarize this \n${paragraph}`,
      // prompt: `${paragraph}.\n\nTl;dr`,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 1,
    });

    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json({
          message: {
            role: "assistant",
            content: data.choices[0].text,
            timestamp,
          },
        });
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
