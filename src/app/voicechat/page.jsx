import Image from "next/image";
import React from "react";
import SideChat from "../voicechat/components/sideChat";
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
              className="backgroud-image w-full lg:w-78 absolute h-32 cover-fill"
            />
            <VoiceChatFeed />
          </div>
          <div className="hidden sm:flex px-6">
            <SideChat />
          </div>
        </div>
      </div>
    </>
  );
}
