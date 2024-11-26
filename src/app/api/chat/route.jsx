import { OpenAI } from 'openai'; 
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

export async function POST(req) {
  try {
    // Check if the OpenAI API key is set
    if (!process.env.OPENAI_API_KEY) {
      console.error('Missing OpenAI API Key');
      return new NextResponse('Missing OpenAI API Key.', { status: 400 });
    }

    // Parse the request body for messages
    const { messages } = await req.json();

    // Check if messages are properly received
    if (!Array.isArray(messages) || messages.length === 0) {
      console.error('Invalid message format:', messages);
      return new NextResponse('Invalid input: messages should be a non-empty array.', { status: 400 });
    }

    // Call OpenAI API for chat completion with streaming
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages,
    });

    // Log the response for debugging
    console.log('OpenAI API Response:', response);

    // Create a stream from the OpenAI response
    const stream = OpenAIStream(response);

    // Return the streaming response
    return new StreamingTextResponse(stream);

  } catch (error) {
    // Log the full error for debugging
    console.error('Error in /api/chat:', error);

    // Return a 500 status with a generic error message
    return new NextResponse(error.message || 'Something went wrong!', { status: 500 });
  }
}
