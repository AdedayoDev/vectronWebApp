"use client";

import Image from "next/image";
import Profile from "../_components/Profile";
import SideBar from "../_components/SideBar";
import Search from "../_components/Search";

export default function Chat() {
  return (
    <>
      <div className="relative">
        <div className="relative w-full h-40">
          <Image
            src="/assets/images/bg-img.png"
            alt="Background image"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col w-dvw lg:w-full p-3 sm:px-7">
          <div className="z-10 flex flex-col text-center w-full -mt-24 bg-white rounded-2xl shadow-xl">
            <div className="flex items-center p-3 md:p-5 space-x-5 rounded-t-2xl">
              <div className="relative w-7 h-7">
                <Image
                  src="/assets/icons/chatmessage.png"
                  alt="chatmessage"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-lg text-blue-800 font-semibold">
                Chat History
              </div>
            </div>
            <Search />
          </div>
        </div>
      </div>
    </>
  );
}