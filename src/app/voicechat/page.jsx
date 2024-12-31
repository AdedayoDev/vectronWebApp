import Image from "next/image";
import React from "react";
<<<<<<< HEAD
import SideChat from "../voicechat/components/sideChat";
import Feed from "@components/chatComp/feed";
=======
import SideBar from "../chatmessage/_components/SideBar"
>>>>>>> 42addfa93428a83276baadbcf4380458be406481
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
              className="w-full lg:w-[80.5%] absolute h-32 cover-fill lg:top-24"
            />
            <div className="voice-chat-content">
              <div className=" text-black-50 absolute lg:w-74 w-96 lg:mx-7 mx-10 my-24 px-2 py-3 rounded-md bg-white">
                <div className="voice-chat-text items-center flex gap-2 cursor-pointer">
                  <Image
                    src="/assets/icons/vechtron.png"
                    alt="background-image"
                    width={20}
                    height={20}
                  />
                  <div className="text-md">Vechtron</div>
                  <Image
                    src="/assets/icons/dropdown.png"
                    alt="background-image"
                    width={5}
                    height={5}
                    className="w-2 h-3"
                  />
                </div>
              </div>
            </div>
            <Feed />
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
