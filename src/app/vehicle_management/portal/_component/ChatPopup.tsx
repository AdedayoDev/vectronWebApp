"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import Image from "next/image";

interface ChatPopupProps {
  onClose: () => void;
  parentWidth?: string;
}

interface Message {
  text: string;
  isUser: boolean;
}

const placeholderMessages: Message[] = [
  { text: "Hi there! How can I assist you today?", isUser: false },
  { text: "Can you tell me about your services?", isUser: true },
  { text: "Sure! We offer a range of AI solutions.", isUser: false },
];

const CustomChatPopup: React.FC<ChatPopupProps> = ({ onClose, parentWidth }) => {
  const [messages, setMessages] = useState<Message[]>(placeholderMessages); 
  const [inputValue, setInputValue] = useState("");
  const messageEndRef = useRef<HTMLDivElement>(null);  

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

  // Remove placeholders when user starts typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (messages === placeholderMessages) {
      setMessages([]); 
    }
    setInputValue(e.target.value);
  };

  return (
    <div className="fixed bottom-20 right-4 bg-white shadow-lg rounded-2xl w-7/12 mx-auto p-4 z-50 animate-slide-up" style={{ width: parentWidth || "100%"}}>
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
          <Link 
            href={{
              pathname: "/chat/chatdetail",
              query: { messages: JSON.stringify(messages) }  
            }}
          >
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
                  <div className="bg-white text-gray-800 shadow-sm p-2 rounded-md w-full">
                    {msg.text}
                  </div>
                </div>
              )}
              {msg.isUser && (
                <div  className={`${
                  msg.isUser ? "bg-purple-100 text-right" : "bg-white"
                } text-[#333] rounded-md shadow-sm p-2 max-w-[70%]`}>
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
          onChange={handleInputChange}
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
