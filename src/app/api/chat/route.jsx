import { OpenAI } from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

export async function POST(req) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error('Missing OpenAI API Key');
      return NextResponse.json({ error: 'Missing OpenAI API Key.' }, { status: 400 });
    }

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);

  } catch (error) {
    console.error('Error in /api/chat:', error);
    if (error.response) {
      console.error('API Response Error:', error.response.data);
      return NextResponse.json({ error: error.response.data.message || 'OpenAI API error.' }, { status: error.response.status || 500 });
    }
    return NextResponse.json({ error: error.message || 'Something went wrong!' }, { status: 500 });
  }
}
