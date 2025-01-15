"use client";

import Image from "next/image";
import Link from "next/link";
import ListComp from "./ListComp";
import { useEffect, useState } from 'react';
import api from '../../../lib/chatapi';

function truncateMessage(message, maxLength = 30) {
  if (!message) return "";
  if (message.length <= maxLength) return message;
  return message.substring(0, maxLength) + "...";
}

function Recent() {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecentConversations();
  }, []);

  const fetchRecentConversations = async () => {
    try {
      const response = await api.get('/chat/api/v1/conversations');
      
      if (response?.status === "success" && Array.isArray(response?.data?.conversations)) {
        const recentConversations = response.data.conversations
          .filter(conv => conv && conv.title && conv.id)
          .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
          .slice(0, 15);

        setConversations(recentConversations);
      } else {
        setConversations([]);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setConversations([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col text-[#442066]">
      {isLoading ? (
        <div className="text-sm text-gray-500">Loading conversations...</div>
      ) : (
        <>
          {conversations.length > 0 ? (
            conversations.map((conversation) => (
              <Link 
                key={conversation.id} 
                href={`/chat/chatdetail?id=${conversation.id}`}
              >
                <ListComp src="/assets/icons/quill_chat.png">
                  {truncateMessage(conversation.title)}
                </ListComp>
              </Link>
            ))
          ) : null}
          
          <Link href="/chat/searchchat">
            <div className="flex items-center justify-start space-x-3 hover:cursor-pointer my-2">
              <p className="text-[16px] font-bold my-1 text-purple-400">View All</p>
              <div className="relative w-3 h-2">
                <Image
                  src="/assets/icons/arrow.png"
                  alt="arrow"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Link>
        </>
      )}
    </div>
  );
}

export default Recent;