import Image from "next/image";
import React from "react";
import SideBar from "../chat/_components/SideBar";
// import Feed from "@components/chatComp/feed";
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
              src="/assets/images/bg-img2.png"
              alt="background-image"
              width={200}
              height={200}
              className="banner-image w-full lg:w-[78%] absolute h-32 cover-fill"
            />
            {/* <Feed /> */}
            <VoiceChatFeed />
          </div>
          <div>
            <SideBar />
          </div>
        </div>
      </div>
    </>
  );
}
