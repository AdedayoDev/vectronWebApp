"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { HiMiniArrowLongUp } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { RiAttachment2, RiVoiceprintLine } from "react-icons/ri";

function Input({ onClick, onSubmit }) {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const [isFileAnimating, setIsFileAnimating] = useState(false);
  const [isSendAnimating, setIsSendAnimating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() && !selectedFile) return;

    setIsSendAnimating(true);
    setIsLoading(true);
    setTimeout(() => setIsSendAnimating(false), 300);

    const formData = new FormData();
    if (message.trim()) formData.append("message", message);
    if (selectedFile) formData.append("file", selectedFile);

    // Pass the formData or message to the onSubmit handler
    onSubmit(selectedFile ? formData : message);

    // Reset states after submission
    setMessage("");
    setSelectedFile(null);
    setIsLoading(false);
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsFileAnimating(true);
      setTimeout(() => setIsFileAnimating(false), 500);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

  // Auto-resize textarea
  const adjustTextareaHeight = (e) => {
    const textarea = e.target;
    textarea.style.height = "48px";
    const scrollHeight = textarea.scrollHeight;
    textarea.style.height = scrollHeight > 48 ? `${scrollHeight}px` : "48px";
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col w-full h-full max-w-3xl bg-white mb-8 py-4 md:py-6 lg:py-8 mx-auto">
        <div className="w-full flex flex-col bg-white shadow-md rounded-2xl px-3 py-3 space-y-2 border border-gray-200">
          {selectedFile && (
            <div className="flex items-center px-3 py-2 bg-blue-50 rounded-lg mb-2">
              <span className="text-sm text-blue-700 truncate flex-1">
                {selectedFile.name}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-blue-700 hover:text-blue-900"
                onClick={removeFile}
                aria-label="Remove file"
              >
                <IoClose className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="w-full h-full flex">
            <textarea
              ref={textareaRef}
              placeholder="Ask me about your vehicle..."
              autoComplete="off"
              autoFocus
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                adjustTextareaHeight(e);
              }}
              onKeyPress={handleKeyPress}
              className="flex w-full rounded-md bg-background px-3 py-2 text-base placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-white min-h-[48px] placeholder:text-gray-300 focus:outline-none overflow-auto max-h-[45vh] lg:max-h-[40vh] sm:max-h-[25vh] outline-none font-sans resize-none placeholder:select-none scrollbar-thin scrollbar-track-transparent"
              aria-label="Chat message input"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
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
                  aria-label="Attach file"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleFileClick}
                  className="text-gray-500 hover:text-blue-500 transition-colors"
                  aria-label="Attach file"
                  disabled={isLoading}
                >
                  <RiAttachment2 className="w-5 h-5" />
                </Button>
              </motion.div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleVoiceClick}
                className="text-gray-500 hover:text-blue-500 transition-colors"
                aria-label="Voice input"
                disabled={isLoading}
              >
                <RiVoiceprintLine className="w-5 h-5" />
              </Button>
            </div>

            <motion.button
              type="submit"
              animate={{ scale: isSendAnimating ? 1.2 : 1 }}
              transition={{ duration: 0.2 }}
              className={`p-2 ${message.trim() || selectedFile
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
                } text-white rounded-full transition-colors`}
              disabled={!message.trim() && !selectedFile || isLoading}
              aria-label="Send message"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <HiMiniArrowLongUp className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Input;
