"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { HiMiniArrowLongUp } from "react-icons/hi2";
import { RiAttachment2, RiVoiceprintLine } from "react-icons/ri";
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
      <div className="flex flex-col w-full h-full max-w-3xl bg-white mb-8 py-4 md:py-8 lg:py-12 mx-auto">
        <div className="w-full flex flex-col bg-white shadow-md rounded-2xl px-2 py-2 space-y-2 border border-gray-200">
          <div className="w-full h-full flex">
            <textarea
              placeholder="Ask me About your Vehicle..."
              autoComplete="off"
              autoFocus=""
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`flex w-full rounded-md bg-background px-3 py-2 text-base placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-white h-12 placeholder:text-gray-300 focus:outline-none overflow-auto max-h-[45vh] lg:max-h-[40vh] sm:max-h-[25vh] outline-none font-sans resize-none placeholder:select-none scrollbar-thin scrollbar-track-transparent`}
              style={{ height: "48px !important" }}
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
              <Button
                className="hidden"
                variant="ghost"
                size="icon"
                onClick={handleFileClick}
              >
                <RiAttachment2 className="w-6 h-6" />
              </Button>
            </motion.div>

            <div className="flex items-center justify-center space-x-3 ">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleVoiceClick}

              >
                <RiVoiceprintLine className="w-6 h-6" />
              </Button>

              <motion.button
                type="submit"
                animate={{ scale: isSendAnimating ? 1.2 : 1 }}
                transition={{ duration: 0.2 }}
                className={`p-2 ${message.trim() ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300"} text-white rounded-full ${isSendAnimating ? "animate-pulse" : ""}`}
                disabled={!message.trim()}
              >
                <HiMiniArrowLongUp className="w-6 h-6" />

              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </form >
  );
}

export default Input;
