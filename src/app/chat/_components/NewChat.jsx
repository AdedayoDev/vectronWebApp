"use client";

import Image from "next/image";
import { useRouter } from 'next/navigation';

function NewChatButton() {
  const router = useRouter();

  const handleNewChat = () => {
    // Force a hard navigation to the chat detail page
    window.location.href = '/chat/chatdetail';
  };

  return (
    <div 
      onClick={handleNewChat}
      className="flex items-center justify-center w-44 xl:w-52 px-3 py-2 rounded-full space-x-2 hover:cursor-pointer bg-purple-400 hover:bg-purple-500 transition-colors"
    >
      <div className="relative w-5 h-5">
        <Image
          src="/assets/icons/chat-add2.png"
          alt="chat-add"
          fill
          className="object-cover"
        />
      </div>
      <p className="text-white">New Chat</p>
    </div>
  );
}

export default NewChatButton;