import React from "react";
import "./chatNav.css";
import Image from "next/image";

export default function chatNav() {
  return (
    <>
      <div className="chatnav-container">
        <Image src="/assets/icons/notification.png" alt="images" width={15} height={15} />
        <Image src="/assets/icons/moon.png" alt="images" width={15} height={15} />
        <Image src="/assets/icons/info.svg" alt="images" width={15} height={15} />
        <Image
          src="/assets/icons/avatar.png"
          width={30}
          height={30}
          alt="images"
          className="user-avatar"
        />
      </div>
    </>
  );
}
