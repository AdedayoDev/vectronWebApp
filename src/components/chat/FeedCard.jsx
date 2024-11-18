"use client";
import React, { useState } from "react";
import Image from "next/image";
import CardsData from "@components/chat/ChatData";
export default function FeedCard() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard((prev) => (prev === card ? null : card));
  };

  return (
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
  );
}
