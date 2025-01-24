// app/api/upload/route.js
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from 'next/server';

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  }
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const key = `profile-pictures/${Date.now()}-${file.name}`;
    
    await s3Client.send(new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    }));

    const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${key}`;
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}