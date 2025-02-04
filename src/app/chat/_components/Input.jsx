"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function Input({ onClick, onSubmit }) {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isFileAnimating, setIsFileAnimating] = useState(false);
  const [isSendAnimating, setIsSendAnimating] = useState(false);
  const [isTyping, setTyping] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() && !selectedFile) return;

    setIsSendAnimating(true);
    setTimeout(() => setIsSendAnimating(false), 300);

    const formData = new FormData();
    if (message.trim()) formData.append("message", message);
    if (selectedFile) formData.append("file", selectedFile);

    onSubmit(message);
    setMessage("");
    setSelectedFile(null);

    setIsTyping(true);
    setTimeout(() => {
      setMessage((prevMessages) => [
        ...prevMessages,
        { text: "This is a bot response.", sender: "bot" },
      ]);
    }, 1500);
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      setMessage(
        (prev) => prev + (prev ? "\n" : "") + `Attached: ${file.name}`
      );
      setIsFileAnimating(true);
      setTimeout(() => setIsFileAnimating(false), 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  const handleVoiceClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    
    <form onSubmit={handleSubmit}>
      
      <div className="flex flex-col w-[250px] xs:w-[275px] sm:w-[305px] md:w-[540px] xl:w-[900px] bg-white p-5 md:p-7 lg:p-10 mx-auto mb-5 ">
        <div className="flex flex-col bg-white shadow-md rounded-2xl p-5 md:p-8 space-y-2 outline outline-gray-200">
          <div className="h-10 md:h-8">
            <textarea
              placeholder="Ask me Anything"
              rows="3"
              cols="40"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-white text-base md:text-sm  placeholder:text-[#333] placeholder:text-base focus:outline-none resize-none "
              style={{
                minHeight: "40px",
                maxHeight: "100px",
                overflowY: "auto",
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <motion.div
              animate={{ rotate: isFileAnimating ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.txt,.csv"
              />
              <button
                type="button"
                onClick={handleFileClick}
                className="p-2 text-gray-500 hover:scale-110 transition-transform rounded-full"
              >
                <Image
                  src="/assets/icons/attach.png"
                  alt="Attach"
                  width={24}
                  height={24}
                />
              </button>
            </motion.div>

            <div className="flex items-center justify-center space-x-3 ">
              <motion.button
                type="button"
                onClick={handleVoiceClick}
                whileHover={{ scale: 1.2 }}
                className="p-2 text-gray-500 hover:scale-110 transition-transform rounded-full"
              >
                <Image
                  src="/assets/icons/voiceRecord.png"
                  alt="Voice Record"
                  width={34}
                  height={34}
                />
              </motion.button>

              <motion.button
                type="submit"
                animate={{ scale: isSendAnimating ? 1.2 : 1 }}
                transition={{ duration: 0.2 }}
                className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                disabled={!message.trim()}
              >
                <Image
                  src="/assets/icons/send.png"
                  alt="Send"
                  width={30}
                  height={30}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Input;
