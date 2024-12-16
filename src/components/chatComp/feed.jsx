"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

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
      {renderResponse()}

      <div className="form-container">
        <form onSubmit={handleSubmit} className="chat-form">
          <textarea
            type="text"
            name="input-feed"
            placeholder="Message Vechtron"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={input}
          />
          <button type="submit" className="icon-button">
            {isSoundWaveIcon ? (
              <img
                src="/assets/icons/speak.png"
                alt="Sound wave icon"
                width={20}
                height={20}
              />
            ) : (
              <Send size={20} />
            )}
          </button>
        </form>
        <div className="form-images">
          <img
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
