import { useState, useEffect } from 'react';
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from '../s3Client';

export const useS3Object = (key) => {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUrl = async () => {
      if (!key) return;

      try {
        setIsLoading(true);
        setError(null);

        const command = new GetObjectCommand({
          Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
          Key: key,
        });

        const signedUrl = await getSignedUrl(s3Client, command, { 
          expiresIn: 3600 // URL expires in 1 hour
        });

        setUrl(signedUrl);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getUrl();
  }, [key]);

  return { url, error, isLoading };
};