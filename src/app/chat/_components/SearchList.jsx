"use client";

import Image from "next/image";
import { useRouter } from 'next/navigation';

function SearchList({ conversation }) {
  const router = useRouter();
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / 1000 / 60);
    
    if (diffInMinutes < 60) {
      return `Last message ${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `Last message ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return 'Last message over a day ago';
    }
  };

  const handleClick = () => {
    router.push(`/chat/chatdetail?id=${conversation.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="flex w-full mx-auto p-2 lg:p-4 items-center justify-between space-x-1 border border-purple-400 text-blue-800 rounded-xl hover:cursor-pointer hover:bg-purple-50 transition-colors"
    >
      <div className="flex flex-col text-left justify-center space-y-1">
        <p className="text-base xl:text-lg">{conversation.title}</p>
        <p className="text-xs">{formatDate(conversation.last_message_at)}</p>
      </div>
    </div>
  );
}

export default SearchList;