"use client";
import { Mic, MicOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Voice() {
  const [showMic, setShowMic] = useState(false);

  return (
    <div className="absolute top-[145px] bg-white shadow rounded-lg sm:w-[92%] lg:h-[850px] lg:w-[75%] md:w-[95%] left-4 p-4">
      <div className="flex gap-2 items-center">
        <Image
          src="/assets/icons/vechtron.png"
          alt="icon"
          width={20}
          height={20}
        />
        <p> Vechtron</p>
        <Image
          src="/assets/icons/selector.png"
          alt="icon"
          width={15}
          height={15}
        />
      </div>
      <div className="w-[50%] mx-auto mt-[75px] lg:mt-44">
        <div className="mx-auto w-[90px] h-[90px] rounded-full bg-purple-900"></div>
        <div className="mt-52 mb-10 sm:mb-16 cursor-pointer flex justify-center gap-32 items-center">
          <div
            onClick={() => {
              setShowMic((prev) => !prev);
            }}
            className="text-center bg-slate-200 rounded-full p-2 font-light"
          >
            {showMic ? (
              <Mic size={35} color="red" />
            ) : (
            
            <MicOff size={35} color="red"/>
            )}
          </div>

          <Link href="/voicechat">
            <div className="cursor-pointer text-center bg-slate-200 rounded-full p-3 font-normal text-4xl w-14 h-14 flex justify-center items-center">
              x
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
