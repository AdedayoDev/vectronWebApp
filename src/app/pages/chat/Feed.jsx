"use client";

import Image from "next/image";
import FeedCard from "@components/chat/FeedCard";
import { FaChevronUp } from "react-icons/fa";
import { useChat } from "ai/react";
import React, { useEffect, useRef } from "react";

export default function Feed() {
  const { messages, input, handleSubmit, handleInputChange } = useChat({
    api: "/api/openai",
  });

  // Scroll behavior of the chat container
  const chatContainer = useRef(null);

  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTo({
        top: chatContainer.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleChangeInput = (event) => {
    handleInputChange(event.target.value);
  };

  const renderResponse = () => (
    <div className="response">
      {messages.map((m, index) => (
        <div
          key={m.id}
          className={`chat-line ${m.role === "user" ? "user-chat" : "ai-chat"}`}
        >
          <Image
            className="avatar"
            alt="avatar"
            src={m.role === "user" ? "/user-avatar.jpg" : "/lcb-avatar.jpg"}
            width={40}
            height={40}
          />
          <div>
            <p className="message">{m.content}</p>
            {index < messages.length - 1 && <div className="horizontal-line" />}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section>
      <div className="feed">
        <FeedCard />
        <div ref={chatContainer} className="chat-response">
          {renderResponse()}
        </div>
        <div className="input-feed">
          <div className="feed-left">
            <Image
              src="/assets/images/bot-small.png"
              alt="chat icon"
              width={30}
              height={30}
            />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="input"
            >
              <input
                type="text"
                placeholder="Ask me anything"
                onChange={handleChangeInput}
                value={input} // Bind `input` state
                aria-label="Chat input field"
              />
              <button type="submit" aria-label="Send message">
                <FaChevronUp />
              </button>
            </form>
          </div>
          <div className="feed-right">
            <Image
              src="/assets/icons/plus-circle.png"
              alt="plus icon"
              width={20}
              height={20}
            />
            <Image
              src="/assets/icons/voice.png"
              alt="voice icon"
              width={30}
              height={30}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
