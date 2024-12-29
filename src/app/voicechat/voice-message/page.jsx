"use client";
import React, { useState } from "react";
import Image from "next/image";
import SideBar from "../components/sideBar";
import Navbar from "@components/navbar/chatNav";
import { Menu } from "lucide-react";
import Voice from "../components/Voice";

export default function Page() {
  const [showNav, setShowNav] = useState(false);

  function handleShowNav() {
    setShowNav((prev) => !prev);
  }

  return (
    <div>
      <Navbar />
      <div onClick={handleShowNav}>
        <Menu
          size={30}
          color="blue"
          className="absolute sm:hidden top-3 left-4 flex cursor-pointer"
        />
      </div>
      <div className="voice-chat flex justify-between mt-11">
        <div className="voice-chat-left">
          <Image
            src="/assets/images/bg-img.png"
            alt="background-image"
            width={200}
            height={200}
            className="w-full lg:w-[82%] absolute h-32 object-cover sm:top-24"
          />
          {/* <Voice /> */}
        </div>
        <div>
          <SideBar showNavbar={showNav} />
        </div>
      </div>
    </div>
  );
}
