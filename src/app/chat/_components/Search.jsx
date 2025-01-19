"use client";

import Image from "next/image";
import SearchList from "./SearchList";
import { useState, useEffect } from 'react';
import api from '../../../lib/chatapi';

function SearchBar() {
  const [conversations, setConversations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await api.get('/chat/api/v1/conversations');
      
      if (response?.status === "success" && Array.isArray(response?.data?.conversations)) {
        setConversations(response.data.conversations);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredConversations = conversations.filter(conversation =>
    conversation.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex flex-col w-full xl:w-[800px] mx-auto px-5 lg:px-10 items-center justify-center my-5 md:my-10 space-y-3">
      <div className="flex flex-col sticky top-0  w-full mb-5">
        <div className="flex w-full rounded-xl p-1 lg:p-3 space-x-2 border border-purple-400">
          <Image
            src="/assets/icons/search.png"
            alt="search icon"
            width={30}
            height={20}
          />
          <input
            type="text"
            className="outline-none text-xs md:text-base lg:text-lg w-full placeholder:text-blue-800 text-blue-800"
            placeholder="Search your chats"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="place-self-start text-blue-800 text-xs lg:text-sm my-3">
          You have {conversations.length} previous chats with Vechtron
        </div>
      </div>
      <div className="w-full overflow-y-auto max-h-[calc(100vh-200px)] pb-60">
      {isLoading ? (
        <div className="text-center text-blue-800">Loading conversations...</div>
      ) : filteredConversations.length > 0 ? (
        <div className="w-full space-y-3">
          {filteredConversations.map((conversation) => (
            <SearchList 
              key={conversation.id} 
              conversation={conversation}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-blue-800">No conversations found</div>
      )}
      </div>
    </div>
  );
}

export default SearchBar;