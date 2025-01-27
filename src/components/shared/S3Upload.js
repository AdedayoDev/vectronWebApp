// import { useS3Upload } from '../../lib/hooks/useS3Upload';

// export const S3Upload = ({ 
//   onUploadComplete,
//   path = '',
//   accept = "image/*",
//   className = "" 
// }) => {
//   const { upload, isUploading, error, progress } = useS3Upload();

//   const handleFileChange = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const key = await upload(file, path);
//     if (key && onUploadComplete) {
//       onUploadComplete(key);
//     }
//   };

//   return (
//     // <div className={className}>
//     //   <input
//     //     type="file"
//     //     onChange={handleFileChange}
//     //     accept={accept}
//     //     disabled={isUploading}
//     //     className="hidden"
//     //     id="s3-upload"
//     //   />
//     //   <label 
//     //     htmlFor="s3-upload"
//     //     className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//     //   >
//     //     {isUploading ? `Uploading... ${progress}%` : 'Select File'}
//     //   </label>
//     //   {error && <p className="text-red-500 mt-2">{error}</p>}
//     // </div>
//        <div className="flex relative text-gray-500 cursor-pointer items-center shadow-md w-[240px] mb-3 justify-center rounded-full p-3 gap-2 bg-white">
//                 <p className="text-gray-400">Upload a new image</p>
//                 <CloudUpload size={15} color="gray" />
//                 <input
//                   type="file"
//                   onChange={handleFileChange}
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                   accept={accept}
//                   disabled={isUploading}
//                   id="s3-upload"
//                 />
//               <label 
//                 htmlFor="s3-upload"
//                 className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 {isUploading ? `Uploading... ${progress}%` : 'Select File'}
//               </label>
//               {error && <p className="text-red-500 mt-2">{error}</p>}
//         </div>
//   );
// };