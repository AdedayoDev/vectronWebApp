"use client";

import { useChat } from "ai/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "@components/ui/button";
import { ChevronRight } from "lucide-react";

export default function Feed() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/openai",
  });

  const chatContainer = useRef(null);

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
              {/* <Image
                className="avatar"
                alt="avatar"
                src={m.role === "user" ? "/user-avatar.jpg" : "/lcb-avatar.jpg"}
                width={40} 
                height={40}
              /> */}
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
          {/* <Image
          src="/assets/images/Bot-small.png"
          alt="Ai image"
          width={25}
          height={25}
        /> */}
          <textarea
            type="text"
            name="input-feed"
            placeholder="Message Vechtron"
            onChange={handleInputChange}
            value={input}
          />
          {/* <Button variant="outline" size="icon">
            <ChevronRight />
          </Button> */}
        </form>
        <div className="form-images">
          <Image
            src="/assets/icons/spring.png"
            alt="Ai image"
            width={10}
            height={20}
            className="image"
          />
          <Image
            src="/assets/icons/speak.png"
            alt="Ai image"
            width={20}
            height={20}
            className="image"
          />
        </div>
      </div>
    </div>
  );
}
