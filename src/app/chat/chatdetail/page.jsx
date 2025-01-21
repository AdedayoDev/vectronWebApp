"use client";

import api from '../../../lib/chatapi';
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import ChatBodyNew from "../_components/ChatBodyNew";
import ChatBody from "../_components/ChatBody";
import Loader from "../_components/Loader";
import {
  CirclePlus,
  Copy,
  Mic,
  Repeat,
  Share,
  ThumbsDown,
  ThumbsUp,
  Volume2, 
  Pause, 
  X,
  Check,
  ArrowLeft, 
  ArrowRight
} from "lucide-react";
import Input from "../_components/Input";
import ChatHead from "../_components/ChatHead";

// const formatMessage = (content) => {
//   if (!content) return "";
//   let formatted = content;
//   formatted = formatted.replace(/\*\*(.*?)\*\*/g, '$1');
//   formatted = formatted.replace(/\*/g, '');
//   formatted = formatted.replace(/[^\S\n]+/g, ' ');
//   return formatted.trim();
// };
const formatMessage = (content) => {
  if (!content) return "";
  let formatted = content;

  // Replace markdown headers with styled elements
  formatted = formatted.replace(/### (.*?)(\n|$)/g, '<h3 class="text-lg font-bold my-2 break-words">$1</h3>');
  formatted = formatted.replace(/## (.*?)(\n|$)/g, '<h2 class="text-xl font-bold my-3 break-words">$1</h2>');


  // Handle code blocks with language specification
  formatted = formatted.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre class="bg-gray-100 p-4 rounded-lg my-2 overflow-x-auto"><code class="whitespace-pre-wrap break-words font-mono ${lang ? `language-${lang}` : ''}">${code.trim()}</code></pre>`;
  });

  // Clean up other markdown elements
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
  formatted = formatted.replace(/[^\S\n]+/g, ' ');

  // Handle markdown links first
  formatted = formatted.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank">$1</a>');
   


  return formatted.trim();
};

// Updated textToSpeech utility
const textToSpeech = (() => {
  let speechSynthesis = null;
  let currentUtterance = null;

  const init = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthesis = window.speechSynthesis;
    }
  };

  const getFemaleVoice = () => {
    const voices = speechSynthesis.getVoices();
    // Try to find a female voice - typically contains 'female' in the name
    // or has a female-associated name
    return voices.find(voice => 
      voice.name.toLowerCase().includes('female') ||
      voice.name.includes('Samantha') ||
      voice.name.includes('Victoria') ||
      voice.name.includes('Karen') ||
      voice.name.includes('Moira') ||
      voice.name.includes('Tessa')
    ) || voices[0]; // Fallback to first available voice if no female voice found
  };

  const speak = (text, options = {}) => {
    if (!speechSynthesis) init();
    if (currentUtterance) {
      speechSynthesis.cancel();
    }

    if (!speechSynthesis) {
      console.warn('Text-to-speech is not supported in this browser.');
      return null;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set female voice
    utterance.voice = getFemaleVoice();
    
    utterance.rate = options.rate || 1.0;
    utterance.pitch = options.pitch || 1.2; // Slightly higher pitch for female voice
    utterance.volume = options.volume || 1.0;
    
    utterance.onstart = options.onStart || null;
    utterance.onend = options.onEnd || null;
    utterance.onpause = options.onPause || null;
    utterance.onresume = options.onResume || null;

    currentUtterance = utterance;
    speechSynthesis.speak(utterance);

    return utterance;
  };


  const cancel = () => {
    if (speechSynthesis && currentUtterance) {
      speechSynthesis.cancel();
      currentUtterance = null;
    }
  };

  const pause = () => {
    if (speechSynthesis) {
      speechSynthesis.pause();
    }
  };

  const resume = () => {
    if (speechSynthesis) {
      speechSynthesis.resume();
    }
  };

  return {
    speak,
    cancel,
    pause,
    resume
  };
})();

export default function Chatdetail() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [conversationId, setConversationId] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [messageVersions, setMessageVersions] = useState({}); // Store versions for each message
  const [currentVersionIndex, setCurrentVersionIndex] = useState({}); // Track current version for each message
  const isVersionSwitching = useRef(false);


  // Modify the text-to-speech handler
  const handleTextToSpeech = (messageContent, messageId) => {  // Add messageId parameter
    // Strip HTML tags for plain text
    const plainText = messageContent.replace(/<[^>]*>/g, '');
    
    // Speak the message
    const utterance = textToSpeech.speak(plainText, {
      rate: 1.0,
      pitch: 1.2,
      onStart: () => {
        setIsSpeaking(true);
        setSpeakingMessageId(messageId);  // Set the speaking message ID
      },
      onEnd: () => {
        setIsSpeaking(false);
        setSpeakingMessageId(null);  // Clear the speaking message ID
      },
      onPause: () => {
        setIsSpeaking(false);
      },
      onResume: () => {
        setIsSpeaking(true);
        setSpeakingMessageId(messageId);  // Restore the speaking message ID
      }
    });
  };
  // Add methods to control speech
  const handlePauseSpeech = () => {
    textToSpeech.pause();
  };

  const handleResumeSpeech = () => {
    textToSpeech.resume();
  };

  const handleCancelSpeech = () => {
    textToSpeech.cancel();
    setIsSpeaking(false);
    setSpeakingMessageId(null);  // Clear the speaking message ID
  };
  
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const chatContainer = messagesEndRef.current;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  const handleCopyText = async (content, messageId) => {
    try {
      // Strip HTML tags to get plain text
      const plainText = content.replace(/<[^>]*>/g, '');
      await navigator.clipboard.writeText(plainText);
      
      // Show copied status for this message
      setCopiedMessageId(messageId);
      
      // Reset copied status after 2 seconds
      setTimeout(() => {
        setCopiedMessageId(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  // Also modify the handleRegenerateResponse function to handle HTML content correctly
const handleRegenerateResponse = async (userMessage, messageId) => {
  try {
    setIsLoading(true);
    
    // Call API to get new response
    const response = await api.post('/chat/api/v1/chat', {
      conversation_id: conversationId,
      message: userMessage,
      regenerate: true
    });

    if (response.status === "success") {
      // Format the new response with HTML
      const newResponse = formatMessage(response.data.message);
      
      // Update versions for this message
      setMessageVersions(prev => {
        const existingVersions = prev[messageId] || [messages.find(m => m.uuid === messageId)?.content];
        return {
          ...prev,
          [messageId]: [...existingVersions, newResponse]
        };
      });
      
      // Set current version to latest
      setCurrentVersionIndex(prev => ({
        ...prev,
        [messageId]: (prev[messageId] || 0) + 1
      }));
      
      // Update the message in the messages array
      setMessages(prev => prev.map(msg => {
        if (msg.uuid === messageId) {
          return { ...msg, content: newResponse };
        }
        return msg;
      }));
    }
  } catch (error) {
    console.error('Error regenerating response:', error);
  } finally {
    setIsLoading(false);
  }
};

// Update version navigation functions to handle HTML content
const handlePreviousVersion = (messageId) => {
  isVersionSwitching.current = true; 
  const currentIndex = currentVersionIndex[messageId] || 0;
  if (currentIndex > 0) {
    setCurrentVersionIndex(prev => ({
      ...prev,
      [messageId]: currentIndex - 1
    }));
    
    // Get previous version with HTML formatting
    const previousVersion = messageVersions[messageId][currentIndex - 1];
    setMessages(prev => prev.map(msg => {
      if (msg.uuid === messageId) {
        return { ...msg, content: previousVersion };
      }
      return msg;
    }));
  }
    // Reset flag after a short delay
    setTimeout(() => {
      isVersionSwitching.current = false;
    }, 100);
};

const handleNextVersion = (messageId) => {
  isVersionSwitching.current = true; 
  const currentIndex = currentVersionIndex[messageId] || 0;
  const versions = messageVersions[messageId] || [];
  if (currentIndex < versions.length - 1) {
    setCurrentVersionIndex(prev => ({
      ...prev,
      [messageId]: currentIndex + 1
    }));
    
    // Get next version with HTML formatting
    const nextVersion = versions[currentIndex + 1];
    setMessages(prev => prev.map(msg => {
      if (msg.uuid === messageId) {
        return { ...msg, content: nextVersion };
      }
      return msg;
    }));
  }
    // Reset flag after a short delay
    setTimeout(() => {
      isVersionSwitching.current = false;
    }, 100);
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
    if (!isVersionSwitching.current) {
      scrollToBottom();
    }
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
      <div className="h-screen flex flex-col overflow-hidden ">
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
                            src="/assets/icons/Media.jpeg (1).png"
                            alt="AI icon"
                            width={40}
                            height={40}
                            className="rounded-full p-1 mr-3"
                          />
                        )}
                        <div className={`flex flex-col max-w-[85%] sm:max-w-[70%] ${message.role === "user" ? "items-end mr-4 md:mr-8 lg:mr-12" : "items-start ml-4"}`}>
                          {/* <h4 className="font-bold text-sm mb-1">
                            {message.role === "assistant" ? "Vechtron" : "You"}
                          </h4> */}
                          <div className={`rounded-lg p-3 ${message.role === "user" ? "bg-purple-50 rounded-tr-none" : "bg-gray-50 rounded-tl-none"}`}>
                            {/* <p className="text-xs lg:text-sm whitespace-pre-line">
                              {message.content}
                            </p> */}
                            <p 
                              className="text-xs lg:text-sm whitespace-pre-line"
                              dangerouslySetInnerHTML={{ __html: message.content }}
                            />

                          </div>
                          {message.role === "assistant" && (
                            <div className="flex items-center mt-2 space-x-2">
                              <div className="flex border border-gray-200 p-1 rounded-lg space-x-2">
                                {(!isSpeaking || speakingMessageId !== message.uuid) ? (
                                    <button 
                                      className="rounded cursor-pointer p-1"
                                      onClick={() => handleTextToSpeech(message.content, message.uuid)}
                                    >
                                      <Volume2 size={13} color="gray" />
                                    </button>
                                  ) : (
                                <>
                                  <button 
                                    className="rounded cursor-pointer p-1"
                                    onClick={handlePauseSpeech}
                                  >
                                    <Pause size={13} color="gray" />
                                  </button>
                                  <button 
                                    className="rounded cursor-pointer p-1"
                                    onClick={handleCancelSpeech}
                                  >
                                    <X size={13} color="gray" />
                                  </button>
                                </>
                              )}
                                <button className="rounded cursor-pointer p-1 border">
                                  <ThumbsUp size={13} color="gray" />
                                </button>
                                <button className="rounded cursor-pointer p-1 border">
                                  <ThumbsDown size={13} color="gray" />
                                </button>
                                {/* <button className="rounded cursor-pointer p-1 border">
                                  <Share size={13} color="gray" />
                                </button> */}
                                <button 
                                  className={`rounded cursor-pointer p-1 border transition-colors duration-200 ${
                                    copiedMessageId === message.uuid ? 'bg-green-50 border-green-200' : ''
                                  }`}
                                  onClick={() => handleCopyText(message.content, message.uuid)}
                                  title="Copy message"
                                >
                                  {copiedMessageId === message.uuid ? (
                                    <Check size={13} className="text-green-600" />
                                  ) : (
                                    <Copy size={13} color="gray" />
                                  )}
                                </button>
                                <button 
                                className={`rounded cursor-pointer p-1 border transition-colors duration-200 ${
                                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                onClick={() => {
                                  // Find the user message that triggered this response
                                  const userMessageIndex = messages.findIndex(msg => msg.uuid === message.uuid) - 1;
                                  if (userMessageIndex >= 0) {
                                    handleRegenerateResponse(messages[userMessageIndex].content, message.uuid);
                                  }
                                }}
                                disabled={isLoading}
                                title="Regenerate response"
                              >
                                <Repeat 
                                  size={13} 
                                  color="gray" 
                                  className={isLoading ? 'animate-spin' : ''}
                                />
                              </button>
                              </div>
                                {/* Version navigation - only show if there are multiple versions */}
                                {messageVersions[message.uuid]?.length > 1 && (
                                  <div className="flex items-center justify-end space-x-2 text-xs text-gray-500">
                                    <button
                                      className={`p-1 rounded hover:bg-gray-100 ${
                                        (currentVersionIndex[message.uuid] || 0) === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                      }`}
                                      onClick={() => handlePreviousVersion(message.uuid)}
                                      disabled={(currentVersionIndex[message.uuid] || 0) === 0}
                                    >
                                      <ArrowLeft size={13} />
                                    </button>
                                    <span>
                                      Version {((currentVersionIndex[message.uuid] || 0) + 1)} of {messageVersions[message.uuid].length}
                                    </span>
                                    <button
                                      className={`p-1 rounded hover:bg-gray-100 ${
                                        (currentVersionIndex[message.uuid] || 0) === messageVersions[message.uuid].length - 1 
                                          ? 'opacity-50 cursor-not-allowed' 
                                          : ''
                                      }`}
                                      onClick={() => handleNextVersion(message.uuid)}
                                      disabled={(currentVersionIndex[message.uuid] || 0) === messageVersions[message.uuid].length - 1}
                                    >
                                      <ArrowRight size={13} />
                                    </button>
                                  </div>
                                )}
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
                        <Loader />
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