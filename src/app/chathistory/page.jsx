"use client";
import { useState } from "react";
import Aside from "@components/chatComp/side-chat";
import "./chathistory.css";
import "@app/chat/chat.css";
import Navbar from "@components/navbar/chatNav";
import Image from "next/image";
import { Search } from "lucide-react";
import chatData from "@components/chathistoryComp/chatData";

export default function ChatHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [handleEdit, setHandleEdit] = useState(false);
  const [handleDelete, setHandleDelete] = useState(false);

  const filteredChats = chatData.filter((chat) =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function deleteText() {
    setHandleDelete((prev) => !prev);
    setHandleEdit(false);
  }
  return (
    <>
      <Navbar />
      <div className="chat-history-container">
        <div className="chat-history-bg">
          <Image
            src="/assets/images/bg-img.png"
            alt="Background image"
            width={200}
            height={200}
            className="chathistory-bg"
          />
          <div className="chat-history-data">
            <div className="search-container">
              <button>
                <Search size={20} color="gray" />
              </button>
              <input
                type="text"
                placeholder="Search conversation"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="conversation-container">
              {filteredChats.map((chat) => (
                <div className="conversation" key={chat.id}>
                  <div className="conversation-text">
                    <h3>{chat.title}</h3>
                    <p>{chat.date}</p>
                  </div>
                  <div className="conversation-icon">
                    <Image
                      src="/assets/icons/dots.png"
                      alt="Options icon"
                      width={3}
                      height={15}
                      className="conversation-icon"
                      onClick={() => setHandleEdit(!handleEdit)}
                    />
                    {handleEdit && (
                      <div className="edit-options">
                        <div className="edit-text editz">
                          <p>Edit</p>
                          <Image
                            src="/assets/icons/rename.png"
                            alt="Options icon"
                            width={15}
                            height={15}
                            className="edit-icon"
                          />
                        </div>
                        <div className="export-text editz">
                          <p>Export</p>
                          <Image
                            src="/assets/icons/export.png"
                            alt="Options icon"
                            width={15}
                            height={15}
                            className="export-icon"
                          />
                        </div>
                        <div className="delete-chat editz" onClick={deleteText}>
                          <p>Delete</p>
                          <Image
                            src="/assets/icons/delete.png"
                            alt="Options icon"
                            width={15}
                            height={15}
                            className="delete-icon"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {handleDelete && (
              <div className="delete-text">
                <h4>Delete chat?</h4>
                <p>Are you sure you want to delete this chat?</p>
                <div className="delete-btn-option">
                  <button className="delete-btn">Delete</button>
                  <button className="cancel-btn">Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="chat-history-aside">
          <Aside />
        </div>
      </div>
    </>
  );
}

