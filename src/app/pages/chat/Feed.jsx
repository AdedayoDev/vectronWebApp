"use client";
import Image from "next/image";
import FeedCard from "@components/chat/FeedCard";
import { FaChevronUp } from "react-icons/fa";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

export default function Feed() {
  const { messages, input = "", handleSubmit, handleInputChange } = useChat({
    api: "/api/openai",
  });


  // Scroll behavior of the chat result
  const chatContainer = useRef(null);

  const scroll = () => {
    const { offsetHeight, scrollHeight, scrollTop } =
      chatContainer.current || {};
    if (scrollHeight >= scrollTop + offsetHeight) {
      chatContainer.current?.scrollTo(0, scrollHeight + 200);
    }
  };

  useEffect(() => {
    scroll();
  }, [messages]);

  const handleChangeInput = (event) => {
    // Correctly call handleInputChange to update the input value
    handleInputChange(event.target.value);
  };

  // Show chat elements
  const renderResponse = () => {
    return (
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
  };

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
            <form onSubmit={handleSubmit} className="input">
              <input
                type="text"
                placeholder="Ask me anything"
                onChange={handleChangeInput}
                // value={input}
              />
              <button type="submit">
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
