"use client";

import api from '../../../lib/chatapi';
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import ChatBodyNew from "../_components/ChatBodyNew";
import ChatBody from "../_components/ChatBody";
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
import Input from "../_components/Input";
import ChatHead from "../_components/ChatHead";

const formatMessage = (content) => {
  if (!content) return "";
  let formatted = content;
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '$1');
  formatted = formatted.replace(/\*/g, '');
  formatted = formatted.replace(/[^\S\n]+/g, ' ');
  return formatted.trim();
};

export default function Chatdetail() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [conversationId, setConversationId] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const chatContainer = messagesEndRef.current;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setConversationId(id);
      fetchConversation(id);
      setShowWelcome(false);
    }
  }, [searchParams]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchConversation = async (id) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/chat/api/v1/conversations/${id}`);
      
      if (response.status === "success") {
        const formattedMessages = response.data.messages.map(msg => ({
          content: formatMessage(msg.content),
          role: msg.role,
          sequence: msg.sequence,
          uuid: msg.uuid
        }));
        setMessages(formattedMessages);
        setShowWelcome(false);
      }
    } catch (error) {
      console.error('Error fetching conversation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessageSubmit = async (message) => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    setShowWelcome(false);
    
    try {
      // Add user message immediately
      const userMessage = {
        content: message,
        role: 'user',
        sequence: messages.length + 1,
        uuid: crypto.randomUUID()
      };
      setMessages(prev => [...prev, userMessage]);

      // Send message to API
      const response = await api.post('/chat/api/v1/chat', {
        conversation_id: conversationId || 0,
        message: message
      });

      if (response.status === "success") {
        // If this is a new conversation, update URL and state
        if (!conversationId) {
          const newId = response.data.conversation_id;
          setConversationId(newId);
          router.push(`/chat/chatdetail?id=${newId}`, undefined, { shallow: true });
        }

        // Add AI response
        const aiMessage = {
          content: formatMessage(response.data.message),
          role: 'assistant',
          sequence: messages.length + 2,
          uuid: crypto.randomUUID()
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Show error message in chat
      setMessages(prev => [...prev, {
        content: "Sorry, there was an error sending your message.",
        role: 'assistant',
        sequence: messages.length + 2,
        uuid: crypto.randomUUID()
      }]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden">
        <div className="relative w-full h-40 flex-shrink-0">
          <Image
            src="/assets/images/bg-img.png"
            alt="Background image"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col -mt-24 px-4 relative">
          <div className="max-w-[1200px] mx-auto w-full h-[calc(100vh-100px)]">
            <div className="bg-white rounded-2xl shadow-xl h-full flex flex-col">
              <div className="flex-1 overflow-y-auto"  ref={messagesEndRef}>
                <div className="p-6 pb-[200px]">
                  {showWelcome && messages.length === 0 ? (
                    <>
                      <ChatHead />
                      <div className="px-2 my-8 lg:my-12 font-semibold text-sm md:text-lg xl:text-3xl text-center">
                        Good day! How may I assist you today?
                      </div>
                        <ChatBodyNew />
                    </>
                  ) : (
                    messages.map((message) => (
                      <div 
                        key={message.uuid}
                        className={`flex items-start mb-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.role === "assistant" && (
                          <Image
                            src="/assets/icons/ai-icon.png"
                            alt="AI icon"
                            width={40}
                            height={40}
                            className="rounded-full p-1 mr-3"
                          />
                        )}
                        <div className={`flex flex-col max-w-[70%] ${message.role === "user" ? "items-end mr-4 md:mr-8 lg:mr-12" : "items-start ml-4"}`}>
                          {/* <h4 className="font-bold text-sm mb-1">
                            {message.role === "assistant" ? "Vechtron" : "You"}
                          </h4> */}
                          <div className={`rounded-lg p-3 ${message.role === "user" ? "bg-purple-50 rounded-tr-none" : "bg-gray-50 rounded-tl-none"}`}>
                            <p className="text-xs lg:text-sm whitespace-pre-line">
                              {message.content}
                            </p>
                          </div>
                          {message.role === "assistant" && (
                            <div className="flex items-center mt-2 space-x-2">
                              <div className="flex border border-gray-200 p-1 rounded-lg space-x-2">
                                <button className="rounded cursor-pointer p-1">
                                  <Volume2 size={13} color="gray" />
                                </button>
                                <button className="rounded cursor-pointer p-1 border">
                                  <ThumbsUp size={13} color="gray" />
                                </button>
                                <button className="rounded cursor-pointer p-1 border">
                                  <ThumbsDown size={13} color="gray" />
                                </button>
                                <button className="rounded cursor-pointer p-1 border">
                                  <Share size={13} color="gray" />
                                </button>
                                <button className="rounded cursor-pointer p-1 border">
                                  <Copy size={13} color="gray" />
                                </button>
                              </div>
                              <button className="rounded cursor-pointer p-1 border">
                                <Repeat size={13} color="gray" />
                              </button>
                            </div>
                          )}
                        </div>
                        {message.role === "user" && (
                          <Image
                            src="/assets/icons/avatar-2.png"
                            alt="Avatar"
                            width={40}
                            height={40}
                            className="rounded-full ml-3"
                          />
                        )}
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex items-center justify-start space-x-3 mb-2">
                      <Image
                        src="/assets/icons/Media.jpeg (1).png"
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
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-white border-t shadow-lg">
            <div className="max-w-[1200px] mx-auto">
            <Input 
              onClick={() => {}} 
              onSubmit={handleMessageSubmit}
            />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}