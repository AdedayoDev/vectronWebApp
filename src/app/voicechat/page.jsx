import Image from "next/image";
import React from "react";
import SideBar from "../chatmessage/_components/SideBar";
import "@app/chat/chat.css";
import VoiceChatFeed from "./components/voicechatfeed";
import Navbar from "@components/navbar/chatNav";
import "./voicechat.css";

export default function page() {
  return (
    <>
      <div className="wrapper">
        <Navbar />
        <div className="voice-chat flex justify-between mt-11">
          <div className="voice-chat-left">
            <Image
              src="/assets/images/bg-img.png"
              alt="background-image"
              width={200}
              height={200}
              className="w-full lg:w-[80.5%] absolute h-32 cover-fill sm:top-24"
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
