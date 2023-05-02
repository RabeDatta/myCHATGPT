import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
// import db from "../config/db";

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
      max_tokens: 200,
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

const wiki = async (req: Request, res: Response) => {
  try {
    console.log("HELLLO.............................");
    const timestamp = new Date().toISOString();

    const { value: topic } = req.body;
    console.log("Topic", topic);

    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `I want you to act as a Wikipedia page. I will give you the name of a topic, and you will provide a summary of that topic in the format of a Wikipedia page. Your summary should be informative and factual, covering the most important aspects of the topic. Start your summary with an introductory paragraph that gives an overview of the topic. My first topic is ${topic}. Provide the summary in list of sequential order. Make sure it's less then 1300 characters. Each list item should be wrapped in a p tag. Don't include ol or ul tag. If the topic is innapropriate, just day invalid instructions with p tag.`,
      temperature: 0.5,
      max_tokens: 400,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 1,
    });

    /* 
       Provide the summary in multiple paragraphs
       Provide the summary in list of sequential order 
    */

    console.log("output", data.choices[0].text);

    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json({
          message: {
            role: "assistant",
            content: data.choices[0].text,
            listContent: true,
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

const sqlQueryGenerator = async (req: Request, res: Response) => {
  try {
    const { value: query } = req.body;

    const timestamp = new Date().toISOString();

    const { data } = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Create a SQL request to ${query}. Only provide the SQL code. 
          Don't provide SQL explanation. 
          If you do provide SQL Code, start the sentence with the word Code. 
          If you can't provide valid SQL code, just say invalid input.`,
        },
      ],
    });

    if (data) {
      if (data.choices[0].message) {
        const responseMessage = data.choices[0].message;
        console.log("sql responseMessage", responseMessage);

        let hasSQLCode: boolean = false;
        if (responseMessage.content.startsWith("Code" || "code" || "Code ")) {
          hasSQLCode = true;
          responseMessage.content = responseMessage.content.replace(
            /^Code:\s*/i,
            ""
          );
        }

        return res.status(200).json({
          message: {
            ...responseMessage,
            hasSQLCode,
            timestamp,
          },
        });
      }
    }
  } catch (e: any) {
    console.error(e);
    res.status(500).json({
      message: e.message,
    });
  }
};

const jsconverter = async (req: Request, res: Response) => {
  try {
    const { value: text } = req.body;

    const timestamp = new Date().toISOString();

    const { data } = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Convert these instruction into javascript code \n${text}. 
          If you do provide javascript Code, start the sentence with the word Code. 
          If you do explain the code, start the sentence with the word Explanation.
          If you can't provide valid SQL code, just say invalid instruction.`,
        },
      ],
    });

    if (data) {
      if (data.choices[0].message) {
        const responseMessage = data.choices[0].message;
        console.log("responseMessage", responseMessage);

        let jsCode: string | null = null;
        let explanation: string | null = null;

        // if (responseMessage.content.startsWith("Code" || "code" || "Code ")) {
        //   jsCode = responseMessage.content.replace(/^Code:\s*/i, "");
        // }

        const regex = /Code:.*?\n([\s\S]*?)Explanation:/;
        const matchCode = responseMessage.content.match(regex);
        jsCode = matchCode ? matchCode[1].trim() : null;

        const exRegex = /Explanation:\s*(.*)/;
        const matchExplanation = responseMessage.content.match(exRegex);
        explanation = matchExplanation?.[1] || null;

        return res.status(200).json({
          message: {
            ...responseMessage,
            jsCode,
            explanation,
            timestamp,
          },
        });
      }
    }
  } catch (e: any) {
    console.error(e);
    res.status(500).json({
      message: e.message,
    });
  }
};

const scifiImage = async (req: Request, res: Response) => {
  try {
    const { value: text, total } = req.body;

    const { data } = await openai.createImage({
      prompt: `generate a scifi image of ${text}`,
      n: total,
      size: "256x256",
    });
    const timestamp = new Date().toISOString();

    if (data) {
      console.log("image data", data.data);
      const imgUrl = data.data.length > 1 ? data.data : data.data[0].url;
      console.log("dataImage", data);
      if (imgUrl) {
        return res.status(200).json({
          message: {
            role: "assistant",
            content: null,
            data: imgUrl,
            name: text.slice(0, 14),
            timestamp,
          },
        });
      }
    }
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(500).json({
      isSuccesful: false,
      message: error.message,
    });
  }
};

export { summary, wiki, sqlQueryGenerator, jsconverter, scifiImage };
