"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import PortalSwitcher from "./PortalSwitcher";
import { useAuthStore } from "@store/useStore";

export default function ChatNav() {
  const { user } = useAuthStore();
  return (
    <div className="w-full bg-white  px-4 py-4">
      <div className="flex justify-between items-center w-11/12 mx-auto">
        <div className="flex items-center space-x-4">
          <div >
            <Image
              src="/assets/icons/Media.jpeg (1).png"
              width={50}
              height={50}
              alt="Chat Icon"
            />
          </div>
          <PortalSwitcher />
        </div>
        <div className="flex items-center space-x-4">
          <Image
            src="/assets/icons/notification.png"
            alt="images"
            width={15}
            height={15}
          />
          <Image
            src="/assets/icons/moon.png"
            alt="images"
            width={15}
            height={15}
          />
          <Image
            src="/assets/icons/info.svg"
            alt="images"
            width={15}
            height={15}
          />
          <div className="relative w-7 h-7">
            <Link href="/settings">
              <Image
                src={user?.profile_picture || "/assets/images/Avatar.png"}
                // width={30}
                // height={30}
                fill
                alt="images"
                className="object-cover  rounded-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
