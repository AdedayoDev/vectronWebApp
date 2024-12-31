'use client';

import React from "react";
import SideMenu from "./_component/side-menu";
import Notification from "./_component/notificationFeed";
import Nav from "./_component/Nav";
import { CldImage } from 'next-cloudinary';

export default function Settings() {
  return (
    <>
      <Nav />
      <div className="notification mt-4">
        <div>
        {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && (
    <CldImage
        src="bg-img3_sjyfvr"
        alt="background image"
        width={200}
        height={200}
        className="w-full h-64 object-cover"
    />
)}

        </div>
        <div className="notification-content px-4 py-2 w-90 lg:w-96 sm:left-6 relative rounded-t-lg shadow-custom bg-white left-8 -mt-11">
          <div className="mt-14 flex">
            <SideMenu />
            <Notification />
          </div>
        </div>
      </div>
    </>
  );
}
