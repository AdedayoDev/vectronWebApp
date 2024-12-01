// pages/api/chat.js
export default async function handler(req, res) {
  
  const { messages } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to communicate with OpenAI" });
  }
}



// import { OpenAI } from 'openai';
// import { OpenAIStream, StreamingTextResponse } from 'ai';
// import { NextResponse } from 'next/server';

// export const runtime = 'edge';

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

// export async function POST(req) {
//   try {
//     if (!process.env.OPENAI_API_KEY) {
//       console.error('Missing OpenAI API Key');
//       return NextResponse.json({ error: 'Missing OpenAI API Key.' }, { status: 400 });
//     }

//     const { messages } = await req.json();


//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       stream: true,
//       messages,
//     });

//     const stream = OpenAIStream(response);
//     return new StreamingTextResponse(stream);

//   } catch (error) {
//     console.error('Error in /api/chat:', error);
//     if (error.response) {
//       console.error('API Response Error:', error.response.data);
//       return NextResponse( error.message || 'OpenAI API error.' , {status: 500});
//     }
//   }
// }
