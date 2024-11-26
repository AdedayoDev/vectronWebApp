import { OpenAI } from 'openai'; 
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';

// Initialize OpenAI with your API key
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

export async function POST(req) {
  try {
    // Verify OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('Missing OpenAI API Key');
      return new NextResponse('Missing OpenAI API Key.', { status: 400 });
    }

    // Parse request body
    const body = await req.json();
    const { messages } = body;

    // Validate messages
    if (!Array.isArray(messages) || messages.length === 0) {
      console.error('Invalid message format:', messages);
      return new NextResponse(
        'Invalid input: messages should be a non-empty array.',
        { status: 400 }
      );
    }

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Updated model name
      stream: true,
      messages,
    });

    // Create a stream for the response
    const stream = OpenAIStream(response);

    // Return a streaming response
    return new StreamingTextResponse(stream);

  } catch (error) {
    console.error('Error in /api/chat:', error);

    // Detailed error handling
    if (error.response) {
      console.error('API Response Error:', error.response.data);
      return new NextResponse(
        `OpenAI Error: ${error.response.data.error.message}`,
        { status: 500 }
      );
    }

    return new NextResponse(error.message || 'Internal Server Error', {
      status: 500,
    });
  }
}
