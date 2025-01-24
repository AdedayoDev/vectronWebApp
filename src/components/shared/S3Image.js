import Image from 'next/image';
import { useS3Object } from '../../lib/hooks/useS3Object';

export const S3Image = ({ 
  s3Key, 
  alt = "", 
  width = 200, 
  height = 200,
  className = "" 
}) => {
  const { url, error, isLoading } = useS3Object(s3Key);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading image</div>;
  if (!url) return null;
//   console.log(s3Key);

  return (
    <Image
      src={s3Key}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};