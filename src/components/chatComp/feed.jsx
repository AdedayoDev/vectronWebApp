"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import Image from 'next/image'

export default function Feed() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/openai",
  });

  const chatContainer = useRef(null);
  const [isSoundWaveIcon, setIsSoundWaveIcon] = useState(true);

  function scroll() {
    const container = chatContainer.current;
    if (container) {
      const { offsetHeight, scrollHeight, scrollTop } = container;
      if (scrollHeight >= scrollTop + offsetHeight) {
        container.scrollTop = scrollHeight + 200;
      }
    }
  }

  useEffect(() => {
    scroll();
  }, [messages]);

  useEffect(() => {
    setIsSoundWaveIcon(input.trim() === "");
  }, [input]);

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  function renderResponse() {
    return (
      <div>
        {messages.map((m, i) => {
          return (
            <div
              key={m.id}
              className={`chat-line ${
                m.role === "user" ? "user-chat" : "ai-chat"
              }`}
            >
              <p>{m.content}</p>
              {i < messages.length - 1 && <div className="horizontal-line" />}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={chatContainer} className="feed-chat">
      <div className="response-container">
      {renderResponse()}
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="chat-form">
          <textarea
            type="text"
            name="input-feed"
            placeholder="Message Vechtron"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={input}
            className="no-scrollbar"
          />
          <button type="submit" className="icon-button">
            {isSoundWaveIcon ? (
              <Image
                src="/assets/icons/speak.png"
                alt="Sound wave icon"
                width={20}
                height={20}
                className="soundwave-icon"
              />
            ) : (
             <Image
                src="/assets/icons/send-icon.png"
                alt="send-icon"
                width={15}
                height={15}
                className="send-icon"
              />
            )}
          </button>
        </form>
        <div className="form-images">
          <Image
            src="/assets/icons/spring.png"
            alt="Spring icon"
            width={10}
            height={20}
            className="image"
          />
        </div>
      </div>
    </div>
  );
}
