"use client";

import api from '../../lib/chatapi';
import Image from "next/image";
import {
  CirclePlus,
  Copy,
  Mic,
  Repeat,
  Share,
  ThumbsDown,
  ThumbsUp,
  Volume2,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const formatMessage = (content) => {
  if (!content) return "";
  
  let formatted = content;
  
  // Handle bold text (** **)
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '$1');
  
  // Remove any remaining asterisks
  formatted = formatted.replace(/\*/g, '');
  
  // Replace multiple spaces (but not line breaks)
  formatted = formatted.replace(/[^\S\n]+/g, ' ');
  
  return formatted.trim();
};

export default function Chatdetail() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (conversationId) {
      fetchConversation(conversationId);
    }
  }, [conversationId]);

  const fetchConversation = async (id) => {
    try {
      const response = await api.get(`/chat/api/v1/conversations/${id}`);
      
      if (response.status === "success") {
        const formattedMessages = response.data.messages.map(msg => ({
          content: formatMessage(msg.content), // Apply formatting here
          role: msg.role,
          sequence: msg.sequence,
          uuid: msg.uuid
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    setIsLoading(true);
    
    try {
      const response = await api.post('/chat/api/v1/chat', {
        conversation_id: conversationId || 0,
        message: inputMessage
      });

      if (response.status === "success") {
        // Update conversation ID if this is a new conversation
        if (!conversationId) {
          setConversationId(response.data.conversation_id);
        }

        // Add the formatted message immediately for better UX
        setMessages(prev => [...prev, {
          content: formatMessage(response.data.message), // Apply formatting here
          role: 'assistant',
          sequence: prev.length + 2,
          uuid: crypto.randomUUID()
        }]);

        setInputMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="relative w-full h-40">
          <Image
            src="/assets/images/bg-img.png"
            alt="Background image"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col w-dvw lg:w-full p-3 sm:px-7">
          <div className="relative flex flex-col w-full min-h-96 lg:min-h-[35rem] lg:min-w-[760px] xl:w-[960px] -mt-24 bg-white z-10 p-2 sm:p-7 rounded-2xl shadow-xl">
            <div className="w-full">
              <div className="max-w-xs md:max-w-xl">
                {messages.map((message) => (
                  <div 
                    key={message.uuid}
                    className={`flex items-start mb-2 ${message.role === "assistant" ? "justify-end" : "justify-start"}`}
                  >
                    {!message.role === "assistant" && (
                      <Image
                        src="/assets/icons/avatar-2.png"
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                      />
                    )}
                    <div className={`flex flex-col max-w-[70%] ${message.role === "assistant" ? "items-end" : "items-start"}`}>
                      <h4 className="font-bold text-sm mb-1">
                        {message.role === "assistant" ? "Vechtron" : "You"}
                      </h4>
                      <div className={`rounded-lg p-3 ${message.role === "assistant" ? "bg-purple-50 rounded-tr-none" : "bg-gray-50 rounded-tl-none"}`}>
                        <p className="text-xs lg:text-sm whitespace-pre-line">
                          {message.content}
                        </p>
                      </div>
                      {message.role === "assistant" && (
                        <div className="flex items-center mt-2 space-x-2">
                          <div className="flex border border-gray-200 p-1 rounded-lg space-x-2">
                            <div className="rounded cursor-pointer p-1">
                              <Volume2 size={13} color="gray" />
                            </div>
                            <div className="rounded cursor-pointer p-1 border">
                              <ThumbsUp size={13} color="gray" />
                            </div>
                            <div className="rounded cursor-pointer p-1 border">
                              <ThumbsDown size={13} color="gray" />
                            </div>
                            <div className="rounded cursor-pointer p-1 border">
                              <Share size={13} color="gray" />
                            </div>
                            <div className="rounded cursor-pointer p-1 border">
                              <Copy size={13} color="gray" />
                            </div>
                          </div>
                          <div className="rounded cursor-pointer p-1 border">
                            <Repeat size={13} color="gray" />
                          </div>
                        </div>
                      )}
                    </div>
                    {message.role === "assistant" && (
                      <Image
                        src="/assets/icons/ai-icon.png"
                        alt="AI icon"
                        width={40}
                        height={40}
                        className="rounded-full p-1 ml-3"
                      />
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center justify-start space-x-3 mb-2">
                    <Image
                      src="/assets/icons/ai-icon.png"
                      alt="AI icon"
                      width={40}
                      height={40}
                      className="p-1 ml-1 rounded-full"
                    />
                    <div className="flex items-center space-x-2">
                      <div className="animate-pulse">Thinking...</div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <div className="mt-10 pb-20"></div>
          </div>

          <div className="mx-auto mt-7 w-full">
            <form onSubmit={handleSubmit}>
              <div className="flex border p-3 w-full border-purple-400 space-x-2 rounded-lg">
                <Image
                  src="/assets/icons/ai-icon.jpg"
                  alt="AI icon"
                  width={20}
                  height={10}
                  className="rounded-full"
                />
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="outline-none w-full text-sm"
                  placeholder="Ask me anything"
                  disabled={isLoading}
                />
                <div className="flex space-x-3 justify-end">
                  <CirclePlus
                    size={20}
                    color="gray"
                    className="hover:cursor-pointer"
                  />
                  <Mic 
                    size={20} 
                    color="gray" 
                    className="hover:cursor-pointer" 
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}