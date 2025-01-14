"use client";

import Input from "../_components/Input";
import ChatHead from "../_components/ChatHead";
import ChatBody from "../_components/ChatBody";
import Voice from "../_components/Voice";
import { useState } from "react";

function NewchatBody() {
  const [voiceChat, setVoiceChat] = useState(false);

  const handletoggle = () => {
    setVoiceChat(!voiceChat);
  };
  console.log(voiceChat);
  return (
    <div className="z-10 flex flex-col items-center w-full -mt-24 bg-white rounded-2xl shadow-xl py-8">
      {voiceChat ? (
        <>
          <ChatHead />
          <div className="px-2 my-8 lg:my-12 font-semibold text-sm md:text-lg xl:text-3xl">
            Good day! How may I assist you today?
          </div>
          <ChatBody />
          <ChatBody />
          <ChatBody />
          <Input onClick={handletoggle} />
        </>
      ) : (
        <Voice onClick={handletoggle} />
      )}
    </div>
  );
}

export default NewchatBody;
