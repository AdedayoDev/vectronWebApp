"use client";
import React, { useState } from "react";
import { Radar, ArrowRight } from "lucide-react";
import { FaSpotify } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function voicechatfeed() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="absolute top-36 lg:top-36 z-10 bg-white w-[93%] custom_content lg:w-[75%] shadow-lg rounded left-4 sm:left-5">
      <div className="w-4/5 mx-auto custom_text">
        <h1 className="bg-blue-700 w-40 mx-auto rounded-2xl mt-5 p-1 text-white text-xl text-center">
          VECHTRON UI
        </h1>
        <p className="mt-10 text-center text-xl sm:text-3xl font-semibold">
          Good day! How may I assist you today?
        </p>
      </div>
      <div className="lg:flex lg:mx-52 gap-7 w-5/6 left-[35px] lg:left-[6%] relative mt-10 custom_feed">
        <div className="lg:block grid grid-cols-2 gap-2">
          <div className="flex gap-2 items-center mb-3">
            <div className="bg-blue-700 w-[145px] p-3 rounded-lg">
              <Image
                src="/assets/icons/explore.png"
                alt="search"
                width={20}
                height={20}
              />
              <div className="text-white text-sm">
                <h1 className="mt-2 mb-2">Explore</h1>
                <p>Learn how to use Vechtron.ai for needs</p>
              </div>
            </div>
            <div className="flex gap-1">
              <div className="w-1 h-8 bg-blue-500"></div>
              <div className="w-1 h-8 bg-blue-500"></div>
              <div className="w-1 h-8 bg-blue-500"></div>
            </div>
          </div>

          <div className="flex gap-2 items-center mb-3">
            <div className="bg-blue-700 w-[145px] p-3 rounded-lg">
              <Image
                src="/assets/icons/explore.png"
                alt="search"
                width={20}
                height={20}
              />
              <div className="text-white text-sm">
                <h1 className="mt-2 mb-2">Tutorial</h1>
                <p>Get a clear knowledge base about vechtron.ai</p>
              </div>
            </div>
            <div className="flex gap-1">
              <div className="w-1 h-8 bg-blue-500"></div>
              <div className="w-1 h-8 bg-blue-500"></div>
              <div className="w-1 h-8 bg-blue-500"></div>
            </div>
          </div>

          <div className="flex gap-2 items-center mb-3">
            <div className="bg-blue-700 w-[145px] p-3 rounded-lg">
              <Image
                src="/assets/icons/explore.png"
                alt="search"
                width={20}
                height={20}
              />
              <div className="text-white text-sm">
                <h1 className="mt-2 mb-2">Support</h1>
                <p>Access Vechtron's help and support options.</p>
              </div>
            </div>
            <div className="flex gap-1">
              <div className="w-1 h-8 bg-blue-500"></div>
              <div className="w-1 h-8 bg-blue-500"></div>
              <div className="w-1 h-8 bg-blue-500"></div>
            </div>
          </div>
        </div>

        <div className=" relative top-3">
          <Link href="#">
            <div className="bg-blue-200 shadow-lg p-3 lg:h-32 rounded mb-5">
              <div>
                <FaSpotify color="green" size={24} />
                <h1 className="text-lg font-semibold mt-2 mb-2">
                  Entertainment
                </h1>
              </div>
              <div className="flex justify-between items-center gap-7">
                <p className="text-sm">What Music do you want to listen to?</p>
                <ArrowRight size={24} color="blue" />
              </div>
            </div>
          </Link>

          <Link href="/route">
            <div className="shadow-lg p-3 lg:h-32 rounded mb-5">
              <div>
                {/* <FaSpotify color="green" size={24} /> */}
                <Image
                  src="/assets/icons/google-map.png"
                  alt="search action"
                  width={20}
                  height={20}
                />
                <h1 className="text-lg font-semibold mt-2 mb-2">Navigation</h1>
              </div>
              <div className="flex justify-between items-center gap-7">
                <p className="text-sm">Get your directions faster</p>
                <ArrowRight size={24} color="blue" />
              </div>
            </div>
          </Link>

          <Link href="#">
            <div className="bg-red-500 shadow-lg text-white p-3 lg:h-32 rounded mb-3">
              <div>
                {/* <HeartPulse color="green" size={24} /> */}
                <Image
                  src="/assets/icons/health.png"
                  alt="search action"
                  width={20}
                  height={20}
                />
                <h1 className="text-lg font-semibold mt-2 mb-2">
                  Health & maintenance
                </h1>
              </div>
              <div className="flex justify-between items-center gap-7">
                <p className="text-sm">Maintenance tips & reminders</p>
                <ArrowRight size={24} color="white" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="relative bg-blue-200 h-28 p-3 lg:w-93 lg:ml-10 mt-10 mb-10 rounded">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          placeholder="Ask me anything..."
          className="w-full outline-none border-none bg-transparent p-2"
        />
        <div className="mt-7 flex items-center justify-between">
          <div>
            <Image
              src="/assets/icons/attach.png"
              alt="search"
              width={20}
              height={20}
            />
          </div>
          <div className="flex items-center gap-3">
            <Link href='/voicechat/voicemessage'>
            <Image
              src="/assets/icons/new-voice-icon.png"
              alt="search"
              width={20}
              height={20}
            />
            </Link>
            <Image
              src="/assets/icons/send.png"
              alt="search"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
