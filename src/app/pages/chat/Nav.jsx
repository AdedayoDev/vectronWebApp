"use client";
import Image from "next/image";
import Ai from "./Ai";
import React, { useState } from "react";

export default function Nav() {
  const [openMenu, setOpenMenu] = useState(false);
  function handleChange() {
    setOpenMenu((prev) => !prev);
  }
  return (
    <nav>
      {openMenu && <Ai className='chat-left' />}
      <div className="navbar">
        <div className="logo-img">
          <Image 
          onClick={handleChange}
            src="/assets/icons/Burger.png"
            alt="hamburger-menu"
            width={60}
            height={60}
          />
          <Image
            src="/assets/images/docvantage-logo.png"
            alt="logo"
            width={60}
            height={60}
          />
        </div>
        <div className="sign-in">
          <Image
            src="/assets/icons/user.png"
            alt="user"
            width={30}
            height={30}
          />{" "}
          <button> My account</button>
        </div>
      </div>
    </nav>
  );
}
