import Image from "next/image";
import React from "react";
import SideBar from "./components/sideBar"
import VoiceChatFeed from "./components/voicechatfeed";
import Navbar from "@components/navbar/chatNav";
import "./voicechat.css";

export default function page() {
  return (
    <>
      <div className="wrapper">
        <Navbar />
        <div className="flex justify-between mt-11">
          <div className="voice-chat-left">
            <Image
              src="/assets/images/bg-img.png"
              alt="background-image"
              width={200}
              height={200}
              className="w-full lg:w-[80.5%] absolute h-32 cover-fill"
            />
            <VoiceChatFeed />
          </div>
          <div className="hidden sm:flex">
            <SideBar />
          </div>
        </div>
      </div>
    </>
  );
}
