"use client";

import Image from "next/image";
import cardsData from "./chatCardsData";
import { useState } from "react";

export default function PowerofAi({ showNewChat, toggleContainers }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [newChatDropDown, setNewChatDropDown] = useState(false);

  const handleToggle = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
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
      {!showNewChat && (
        <div className="powerai-container">
          <div className="powerofAi-content">
            <div className="powerai-header">
              <h1>Unlock the power of AI</h1>
              <p>Meet docvantage, our AI chat app revolutionizing conversations</p>
            </div>
            <div className="powerai-cards">
              <div className="card-chat-option">
                <p>Chat creativity</p>
                <Image src="/assets/icons/info.svg" alt="icon" width={20} height={20} />
              </div>
              <div className="powerai-card-head">
                {cardsData.map((data, index) => (
                  <span
                    key={index}
                    onClick={() => handleToggle(index)}
                    style={{
                      cursor: "pointer",
                      backgroundColor: activeDropdown === index ? "white" : "transparent",
                      padding: "5px 10px",
                      borderRadius: "4px",
                    }}
                  >
                    {data.span}
                  </span>
                ))}
              </div>
              {activeDropdown !== null && (
                <div className="cards-info">
                  {cardsData[activeDropdown].items.map((item, index) => (
                    <div key={index} className="cards-info-content">
                      <div className="direction">
                        <Image src={item.image} alt={item.text} width={40} height={40} />
                        <p>{item.text}</p>
                      </div>
                      <Image src="/assets/icons/arrow.png" alt="arrow" width={15} height={15} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showNewChat && (
        <div className="new-chat-container">
          <div className="new-chat-content">
            <div className="new-chat-header">
              <Image
                src="/assets/icons/vechtron.png"
                alt="icon"
                width={20}
                height={20}
                style={{ cursor: "pointer" }}
              />
              <p>Vechtron</p>
              <Image
                onClick={() => setNewChatDropDown(!newChatDropDown)}
                src="/assets/icons/dropdown.png"
                alt="icon"
                width={10}
                height={15}
                style={{ cursor: "pointer" }}
              />
            </div>
            {newChatDropDown && (
              <div className="new-chat-dropdown">
                <div className="dropdown-content">
                  <p>Hello</p>
                  <p>Hello</p>
                  <p>Hello</p>
                </div>
              </div>
            )}
            <div className="new-chat-intro">
              <h1>Hi, Lampnents</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
