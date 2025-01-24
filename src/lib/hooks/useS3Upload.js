// // hooks/useS3Upload.js
// import { useState } from 'react';
// import { PutObjectCommand } from "@aws-sdk/client-s3";
// import { s3Client } from '../s3Client';

// export const useS3Upload = () => {
//   const [isUploading, setIsUploading] = useState(false);
//   const [error, setError] = useState(null);
//   const [progress, setProgress] = useState(0);

//   const upload = async (file, path = '') => {
//     if (!file) return null;

//     const MAX_SIZE = 2 * 1024 * 1024; // 2MB
//     if (file.size > MAX_SIZE) {
//       setError('File size exceeds 2MB limit');
//       return null;
//     }
//     console.log('Selected file:', file);
//     console.log('AWS Config:', {
//       region: process.env.NEXT_PUBLIC_AWS_REGION,
//       bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
//       hasAccessKey: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
//       hasSecretKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
//     });
//     try {
//       setIsUploading(true);
//       setError(null);
//       setProgress(0);

//       const key = `${path}${Date.now()}-${file.name}`;
//       const arrayBuffer = await file.arrayBuffer();
      
//       const command = new PutObjectCommand({
//         Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
//         Key: key,
//         Body: new Uint8Array(arrayBuffer),
//         ContentType: file.type,
//       });

//       await s3Client.send(command);
//       setProgress(100);
      
//       return key;
//     } catch (err) {
//     console.log(err.message);
//       setError(err.message);
//       return null;
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return { upload, isUploading, error, progress };
// };
// hooks/useS3Upload.js
import { useState } from 'react';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from '../s3Client';

export const useS3Upload = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
  
    const upload = async (file, path = '') => {
      if (!file) return null;
      
      try {
        setIsUploading(true);
        const key = `${path}${Date.now()}-${file.name}`;
        const arrayBuffer = await file.arrayBuffer();
        
        const command = new PutObjectCommand({
          Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
          Key: key,
          Body: arrayBuffer,
          ContentType: file.type,
          ACL: 'public-read'
        });
  
        await s3Client.send(command);
        return `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${key}`;
      } catch (err) {
        console.error('Upload error:', err);
        setError(err.message);
        return null;
      } finally {
        setIsUploading(false);
      }
    };
  
    return { upload, isUploading, error };
  };
