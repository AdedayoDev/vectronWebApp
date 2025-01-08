"use client";
import React, { useState } from "react";
import Image from "next/image";
import SideBar from "../components/sideBar";
import Navbar from "@components/navbar/chatNav";

import Voice from "../components/Voice";

export default function Page() {

 

  return (
    <div>
      <Navbar />
      <div className="voice-chat flex justify-between mt-11">
        <div className="voice-chat-left">
          <Image
            src="/assets/images/bg-img2.png"
            alt="background-image"
            width={200}
            height={200}
            className="w-full lg:w-[78%] absolute h-32 object-cover"
          />
          <Voice />
        </div>
        <div>
          <SideBar  />
        </div>
      </div>
    </div>
  );
}
