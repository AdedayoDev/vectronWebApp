"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Feed from "@app/pages/chat/Feed";
import PrevChat from "@app/pages/chat/PrevChat";
import Ai from "@app/pages/chat/Ai";

export default function Chat(props) {
  const [searchInput, setSearchInput] = useState({
    search: "",
  });

  function handlePress(e) {
    const { name, value } = e.target.value;

    setSearchInput();
  }
  const chatLinks = [
    {
      href: "/chat/ethics",
      src: "/assets/icons/message.png",
      text: "AI Chat Tool Ethics",
    },
    {
      href: "/chat/impact-writing",
      src: "/assets/icons/message.png",
      text: "AI Chat Tool Impact Writing",
    },
    { href: "/chat/new", src: "/assets/icons/message.png", text: "New Chat" },
  ];

  const actionLinks = [
    {
      href: "/clear",
      src: "/assets/icons/delete.png",
      alt: "Delete icon",
      text: "Clear conversation",
    },
    {
      href: "/theme",
      src: "/assets/icons/light.png",
      alt: "Light mode icon",
      text: "Light mode",
    },
    {
      href: "/updates",
      src: "/assets/icons/upload.png",
      alt: "Updates icon",
      text: "Updates & FAQ",
    },
    {
      href: "/logout",
      src: "/assets/icons/logout.png",
      alt: "Logout icon",
      text: "Log out",
    },
  ];

  return (
    <main>
      <div className="chat-search-input">
        <input
          type="text"
          onChange={handlePress}
          name="search"
          placeholder="Search your chat history"
        />
        <p>Select</p>
        <hr />
      </div>
      <div className="background-image"></div>
      <div className="container">
        <Ai />
        <Feed />
        <section className="chat-right">
          <Image
            className="mode"
            src="/assets/icons/moon-star.png"
            alt="dark mode"
            width={30}
            height={30}
          />
          <Link href="/chat/new">
            <button className="btn-dark">+ New Chat</button>
          </Link>
          <PrevChat links={chatLinks} />
          <Link href="/chathistory">
            <b>See all chats</b>
          </Link>

          <div className="chat-right-bottom">
            {actionLinks.map((link) => (
              <Link key={link.text} href={link.href} className="action-link">
                <Image src={link.src} alt={link.alt} width={20} height={20} />
                {link.text}
              </Link>
            ))}
          </div>

          <div className="upgrade">
            <p className="close-btn" aria-label="Close Upgrade Modal">
              x
            </p>
            <div className="upgrade-content">
              <Image
                src="/assets/images/Empty-chat.png"
                alt="Upgrade prompt image"
                width={150}
                height={100}
              />
              <button className="upgrade-btn">
                Upgrade to Pro
                <Image
                  src="/assets/icons/solid.png"
                  alt="Upgrade icon"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>

          <p className="follow">Follow us on</p>
        </section>
      </div>
    </main>
  );
}
