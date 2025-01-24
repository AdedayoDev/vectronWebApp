"use client";
import React from "react";
import "./chatNav.css";
import Image from "next/image";
import Link from "next/link";
import PortalSwitcher from './PortalSwitcher';
import { useAuthStore } from '@store/useStore';

export default function ChatNav() {
  const { user } = useAuthStore();
  return (
    <>
      <div className="chatnav-container">
      <PortalSwitcher />
        <Image src="/assets/icons/notification.png" alt="images" width={15} height={15} />
        <Image src="/assets/icons/moon.png" alt="images" width={15} height={15} />
        <Image src="/assets/icons/info.svg" alt="images" width={15} height={15} />
        <div className="relative w-7 h-7">
        <Link href="/settings">
        <Image
          src={user?.profile_picture || "/assets/images/Avatar.png"}
          // width={30}
          // height={30}
          fill
          alt="images"
          className="object-cover hover:cursor-pointer rounded-full" 
        />
        </Link>
        </div>
      </div>
    </>
  );
}
