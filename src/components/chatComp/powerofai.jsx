"use client";

import Image from "next/image";
import cardsData from "./chatCardsData";
import { useState } from "react";

export default function PowerofAi() {
  const [closeCard, setCloseCard] = useState(false);
  const handleToggle = () => {
    setCloseCard((prev) => !prev);
  };

  return (
    <>
      <Image
        src="/assets/images/bg-img.png"
        alt="Background image"
        width={200}
        height={200}
        className="powerai-bg"
      />
        <div className="powerai-container">
          <div className="powerofAi-content">
            <div className="powerai-header">
              <h1>Unlock the power of AI</h1>
              <p>
                Meet docvantage, our AI chat app revolutionizing conversations
              </p>
            </div>
            <div className="powerai-cards">
              <div className="card-chat-option">
                <p>Chat creativity</p>
                <Image
                  src="/assets/icons/info.svg"
                  alt="icon"
                  width={20}
                  height={20}
                />
              </div>
              <div className="powerai-card-head">
                <span onClick={handleToggle}>Super</span>
                <span onClick={handleToggle}>High</span>
                <span onClick={handleToggle}>Medium</span>
                <span onClick={handleToggle}>Low</span>
              </div>
            {closeCard && (
              <div className="cards-info">
                {cardsData.map((card, index) => (
                  <div key={index} className="cards-info-content">
                    <div className="direction">
                    <Image
                      src={card.image}
                      alt={card.text}
                      width={40}
                      height={40}
                      />
                      <p>{card.text}</p>
                    </div>
                    <Image
                      src='/assets/icons/arrow.png'
                      alt='arrow'
                      width={15}
                      height={15}
                    />
                  </div>
                ))}
              </div>
            )}
            </div>
          </div>
        </div>
    </>
  );
}
