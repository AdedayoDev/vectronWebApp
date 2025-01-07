import React from "react";
import "./chatdetail.css";
import Navbar from "@components/navbar/chatNav";
import Image from "next/image";
import SideBar from "../_components/SideBar";
import {
  Copy,
  Mic,
  Repeat,
  Share,
  Speaker,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

export default function Chatdetail() {
  return (
    <>
      <div className="chatdetail-container">
        <Navbar />
        <div className="chatdetail-content">
          <div className="">
            <Image
              src="/assets/images/bg-img.png"
              alt="Background image"
              width={200}
              height={200}
              className="absolute lg:w-[81%] h-[150px] w-full"
            />
            <div className="chatdetail-detail shadow h-[83%] lg:h-[95%]">
              <div className="detail-content mt-4">
                <div className="detail-user">
                  <Image
                    src="/assets/icons/avatar-2.png"
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="avatar-bg"
                  />
                  <div className="detail-user-text">
                    <h4>Peter</h4>
                    <p>Can you help me troubleshoot my car?</p>
                  </div>
                </div>

                <div className="detail-system">
                  <Image
                    src="/assets/icons/ai-icon.png"
                    alt="Avatar"
                    width={30}
                    height={30}
                    className="system-icon"
                  />
                  <div className="detail-user-text">
                    <h4>Vechtron</h4>
                    <p>
                      I would be happy to help you troubleshoot your car, but I
                      will need more specific information about what issues you
                      are experiencing. This will help me provide more targeted
                      and useful advice.
                    </p>
                  </div>
                </div>
                <div className="">
                  <div className="flex justify-between w-[90%] lg:w-[70%] items-center">
                    <div className="mt-2 rounded shadow-md p-2 border flex gap-2 lg:w-[35%] w-[55%]">
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
                      <Repeat
                        size={20}
                        className=" cursor-pointer"
                        color="gray"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <SideChat /> */}
        <SideBar />
      </div>
    </>
  );
}
