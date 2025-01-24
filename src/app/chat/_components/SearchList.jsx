"use client";

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MoreVertical, Share, Pencil, Trash } from 'lucide-react';

function SearchList({ conversation }) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

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

  const handleMenuClick = (e) => {
    e.stopPropagation(); // Prevent the click from triggering the parent div
    setShowMenu(!showMenu);
  };

  const handleRename = (e) => {
    e.stopPropagation();
    // Add rename logic here
    setShowMenu(false);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    // Add share logic here
    setShowMenu(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    // Add delete logic here
    setShowMenu(false);
  };

  return (
    <div
      onClick={handleClick}
      className="flex w-full mx-auto p-2 lg:p-4 items-center justify-between space-x-1 border border-purple-400 text-blue-800 rounded-xl hover:cursor-pointer hover:bg-purple-50 transition-colors relative"
    >
      <div className="flex flex-col text-left justify-center space-y-1">
        <p className="text-base xl:text-lg">{conversation.title}</p>
        <p className="text-xs">{formatDate(conversation.last_message_at)}</p>
      </div>

      <div className="relative">
        <button
          onClick={handleMenuClick}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <MoreVertical size={20} />
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border">
            <div className="py-1">
              <button
                onClick={handleRename}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <Pencil size={16} className="mr-2" />
                Rename
              </button>
              <button
                onClick={handleShare}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <Share size={16} className="mr-2" />
                Share
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
              >
                <Trash size={16} className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchList;