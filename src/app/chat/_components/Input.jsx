"use client";

import Image from "next/image";
import { useState, useRef } from 'react';
import Link from "next/link";

function Input({ onClick, onSubmit }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    onSubmit(message);
    setMessage('');
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!message.trim() && !selectedFile) return;
    
  //   // Create FormData to handle both text and file
  //   const formData = new FormData();
  //   if (message.trim()) {
  //     formData.append('message', message);
  //   }
  //   if (selectedFile) {
  //     formData.append('file', selectedFile);
  //   }
    
  //   onSubmit(formData);
  //   setMessage('');
  //   setSelectedFile(null);
  // };


  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Optionally add the filename to the message
      setMessage(prev => prev + (prev ? '\n' : '') + `Attached: ${file.name}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  const handleVoiceClick = (e) => {
    e.preventDefault(); // Prevent form submission
    if (onClick) {
      onClick(); // This will trigger the modal open in the parent component
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col w-[250px] xs:w-[275px] sm:w-[305px] md:w-[540px] xl:w-[900px] bg-white p-5 md:p-7 lg:p-10 mx-auto mb-5">
        <div className="flex flex-col bg-[#C8D6FF] rounded-2xl p-5 md:p-8 space-y-2">
          <div className="h-10 md:h-8">
            <textarea
              placeholder="Ask me Anything"
              rows="3"
              cols="40"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-[#C8D6FF] text-sm md:text-sm  placeholder:text-blue-500 focus:outline-none resize-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="relative w-5 h-5 ">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.txt,.csv"
              />
              <Image
                src="/assets/icons/attach.png"
                alt="attachment image"
                fill
                className="object-cover hover:cursor-pointer"
                onClick={handleFileClick}
              />
              {selectedFile && (
                <div className="absolute -top-2 -right-2 w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="relative w-5 h-5">
              <button
                  type="button" // Important: type="button" to prevent form submission
                  onClick={handleVoiceClick}
                  className="w-full h-full p-0 border-0 bg-transparent"
                >
                  <Image
                    src="/assets/icons/voiceRecord.png"
                    alt="voiceRecord image"
                    fill
                    className="object-cover hover:cursor-pointer"
                  />
                </button>
              </div>
              <button
                type="submit"
                className="relative w-5 h-5 disabled:opacity-50"
                disabled={!message.trim()}
              >
                <Image
                  src="/assets/icons/send.png"
                  alt="send image"
                  fill
                  className="object-cover hover:cursor-pointer"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Input;