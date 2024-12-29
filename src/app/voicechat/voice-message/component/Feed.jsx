import Image from "next/image";
import React from "react";
import "../../voicechat.css";
import {
  Copy,
  Mic,
  Repeat,
  Share,
  Speaker,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

export default function Feed() {
  return (
    <>
      <section className="absolute top-28 sm:top-44 z-10 bg-white w-93 sm:w-[78%] h-[640px] shadow-lg rounded left-4 sm:left-7">
        <div className="flex gap-2 items-baseline p-3">
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
        <section className="w-[90%] mx-auto my-7 section overflow-x-auto scrollbar-thin h-[305px] sm:h-[300px]">
          <div className="flex gap-3 mb-7">
            <div>
              <Image
                src="/assets/icons/avatar-2.png"
                alt="icon"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div>
              <p className="text-base font-semibold mb-2">Peter</p>
              <p className="text-base rounded-lg p-2 bg-gray-300">
                "Can you help me troubleshoot my car?"
              </p>
              <div className="mt-3 flex gap-1 items-center">
                <div>
                  <Mic size={20} />
                </div>
                <p className="font-normal">00:15</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 ">
            <div>
              <Image
                src="/assets/icons/ai-icon.png"
                alt="icon"
                width={40}
                height={40}
                className="w-[100px] object-contain h-[40px] sm:w-[40px] sm:h-[40px]"
              />
            </div>
            <div>
              <p className="text-base font-semibold mb-2 ">Vechtron</p>
              <p className="text-gray-400 w-[90%] sm:w-[70%]">
                I'd be happy to help you troubleshoot your car, but I'll need
                more specific information about what issues you're experiencing.
                This will help me provide more targeted and useful advice.
              </p>
              <div className="flex justify-between w-[90%] sm:w-[70%] items-center">
                <div className="mt-2 rounded shadow-md p-2 border flex gap-2 sm:w-[35%] w-[55%]">
                  <div className="rounded cursor-pointer p-1 border">
                    <Speaker size={20} color="gray" />
                  </div>
                  <div className="rounded cursor-pointer p-1 border">
                    <ThumbsUp size={20} color="gray" />
                  </div>
                  <div className="rounded cursor-pointer p-1 border">
                    <ThumbsDown size={20} color="gray" />
                  </div>
                  <div className="rounded cursor-pointer p-1 border">
                    <Share size={20} color="gray" />
                  </div>
                  <div className="rounded cursor-pointer p-1 border">
                    <Copy size={20} color="gray" />
                  </div>
                </div>
                <div>
                  <Repeat size={20} className=" cursor-pointer" color="gray" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
