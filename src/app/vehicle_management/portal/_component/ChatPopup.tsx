"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import Image from "next/image";

interface ChatPopupProps {
  onClose: () => void;
}

interface Message {
  text: string;
  isUser: boolean;
}

const CustomChatPopup: React.FC<ChatPopupProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messageEndRef = useRef<HTMLDivElement>(null);  // For auto-scroll

  // Scroll to bottom on new message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a message
  const sendMessage = () => {
    if (inputValue.trim() !== "") {
      const userMessage: Message = { text: inputValue, isUser: true };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");

      // Simulate a bot response with delay
      setTimeout(() => {
        const botResponse: Message = { text: "This is an automated response from AI.", isUser: false };
        setMessages((prev) => [...prev, botResponse]);
      }, 500);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 bg-white shadow-lg rounded-2xl w-7/12 mx-auto p-4 z-50 animate-slide-up">
      {/* Header with close and expand options */}
      <div className="flex justify-between items-center mb-2 border-b pb-2">
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6">
            <Image
              src="/assets/icons/chat-add2.png"
              alt="chat icon"
              fill
              className="object-cover"
            />
          </div>
          
        </div>
        <div className="flex gap-2">
          <Link href="/chat">
            <button className="text-blue-500 hover:text-blue-700 text-sm">
              Expand
            </button>
          </Link>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="h-64 overflow-y-auto mb-2 bg-[#EBF3FF] rounded-md p-2">
        {messages.length === 0 ? (
          <div className="text-gray-400 text-center">Start a conversation...</div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-2 ${msg.isUser ? "justify-end" : "justify-start"}`}
            >
              {/* AI Message with Logo */}
              {!msg.isUser && (
                <div className="flex items-center gap-2">
                  <div className="relative w-6 h-6 flex-shrink-0">
                    <Image
                      src="/assets/icons/Media.jpeg (1).png"  
                      alt="AI Logo"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="bg-white text-gray-800 shadow-sm p-2 rounded-md w-full ">
                    {msg.text}
                  </div>
                </div>
              )}

              {/* User Message */}
              {msg.isUser && (
                <div className="bg-purple-100 text-[#333]  rounded-ss-xl shadow-sm p-2 rounded-md max-w-[70%] text-right">
                  {msg.text}
                </div>
              )}
            </div>
          ))
        )}
        <div ref={messageEndRef} /> 
      </div>

      {/* Message input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border rounded-full p-2 w-full text-sm focus:outline-none focus:border-purple-500"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}  
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-700 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CustomChatPopup;
