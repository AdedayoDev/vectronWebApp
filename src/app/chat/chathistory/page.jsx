"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, MoreVertical } from "lucide-react";
import api from '../../../lib/chatapi';
import { useRouter } from 'next/navigation';

export default function ChatHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeOptions, setActiveOptions] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const router = useRouter();

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleOptionsClick = (id) => {
    setActiveOptions(activeOptions === id ? null : id);
    setShowDeleteModal(false);
  };

  const handleDelete = (conversation) => {
    setSelectedConversation(conversation);
    setShowDeleteModal(true);
    setActiveOptions(null);
  };

  const confirmDelete = async () => {
    // Add your delete API call here
    setShowDeleteModal(false);
    setSelectedConversation(null);
  };

  const filteredConversations = conversations.filter((conversation) =>
    conversation.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="relative w-full h-40 flex-shrink-0">
        <Image
          src="/assets/images/bg-img.png"
          alt="Background image"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col -mt-24 px-4 relative bg-white rounded-2xl shadow-xl p-6">
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search conversation"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-400"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
    
        <div className="flex-1 overflow-y-auto px-6">
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center text-gray-500">Loading conversations...</div>
          ) : (
            filteredConversations.map((conversation) => (
              <div 
                key={conversation.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer border-b"
              >
                <div 
                  className="flex-1"
                  onClick={() => router.push(`/chat/chatdetail?id=${conversation.id}`)}
                >
                  <h3 className="text-lg font-medium text-gray-900">{conversation.title}</h3>
                  <p className="text-sm text-gray-500">{formatDate(conversation.created_at)}</p>

                </div>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionsClick(conversation.id);
                    }}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <MoreVertical size={20} className="text-gray-500" />
                  </button>
                  
                  {activeOptions === conversation.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                      <div className="py-1">
                        <button
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                          onClick={() => {/* Add edit functionality */}}
                        >
                          <span>Edit</span>
                        </button>
                        <button
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                          onClick={() => {/* Add export functionality */}}
                        >
                          <span>Export</span>
                        </button>
                        <button
                          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                          onClick={() => handleDelete(conversation)}
                        >
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        </div>
      </div>


      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h4 className="text-lg font-semibold mb-2">Delete chat?</h4>
            <p className="text-gray-600 mb-4">Are you sure you want to delete this chat?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}