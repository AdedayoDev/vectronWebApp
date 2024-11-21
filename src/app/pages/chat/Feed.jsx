"use client";

import Image from "next/image";
// import FeedCard from "@components/chat/FeedCard";
import { FaChevronUp } from "react-icons/fa";
// import { useChat } from "ai/react";
import React, { useEffect,useState, useRef } from "react";
import CardsData from "@app/pages/chat/ChatData";

export default function Feed() {
  // const { messages, input, handleSubmit, handleInputChange } = useChat({
  //   api: "/api/openai",
  // });

  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardClick = (card) => {
    setSelectedCard((prev) => (prev === card ? null : card));
  };

  // useEffect(() => {
  //   if (chatContainer.current) {
  //     chatContainer.current.scrollTo({
  //       top: chatContainer.current.scrollHeight,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [messages]);

  const handleChangeInput = (event) => {
    handleInputChange(event.target.value);
  };

  return (
    <section>
      <div className="feed">
        {/* <FeedCard /> */}
        <div className="text-feed">
      <div className="text-feed-content">
        <div className="text-head">
          <h1>Unlock the power of AI</h1>
          <p>Meet docvantage, our AI chat app revolutionizing conversations</p>
        </div>

        {}
        <div className="chat-creativity">
          <p>Chat creativity</p>
          <Image
            src="/assets/icons/info.svg"
            alt="info icon"
            width={20}
            height={20}
          />
        </div>
        <div className="feed-cards">
          {CardsData.map((card) => (
            <div
              key={card.id}
              className={`cards ${selectedCard === card.id ? "active" : ""}`}
              onClick={() => handleCardClick(card.id)}
            >
              <p>{card.id}</p>
            </div>
          ))}
        </div>
        {selectedCard && (
          <div className="card-details">
            {CardsData.find((card) => card.id === selectedCard)?.details.map(
              (detail, index) => (
                <div className="card-content" key={index}>
                  <div className="card-content-left">
                    <Image
                      src={detail.icon}
                      alt="detail icon"
                      width={40}
                      height={40}
                    />
                    <p>{detail.text}</p>
                  </div>
                  <div className="card-content-right">
                    <Image
                      src="/assets/icons/arrow.png"
                      alt="arrow icon"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
        {/* <div ref={chatContainer} className="chat-response">
          {renderResponse()}
        </div> */}
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
                value=''
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
