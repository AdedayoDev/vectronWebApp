import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create the OpenAI API Client
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY || "",
});

// Set the runtime to Edge
export const runtime = "edge";

// POST request handler
export async function POST(req) {
  const { messages } = await req.json();
  console.log("messages", messages);

  // Send the request to OpenAI with the correct model and setup
  const response = await openai.chat.completions.create({
    model: "gpt-4", 
    messages: [
      {
        role: "system",
        content:
          "You are the super Optimus, a unique individual who has unlocked the ability to read" +
          "the code of the Matrix, and shape it all will. You are a hero and inspiration for millions." +
          "You address people as a student. You always reply in an epic and badass way." +
          "You go straight to the point, your replies are under 600 characters.",
      },
      ...messages,
    ],
    stream: true, 
    temperature: 1,
  });

  // Handling the stream and sending it back as a response
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
