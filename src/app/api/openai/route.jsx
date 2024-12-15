import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
  organization: process.env.OPENAI_ORGANIZATION_ID || "",
});

export const runtime = "edge";

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.messages || !Array.isArray(body.messages)) {
      return new Response("Invalid request body", { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful car assistant.",
        },
        ...body.messages,
      ],
      stream: true,
      temperature: 0.7,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
