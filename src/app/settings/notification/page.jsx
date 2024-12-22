import Image from "next/image";
import React from "react";
import sideMenu from "../notification/_component/side-menu";

export default function page() {
  return (
    <>
      <div className="notification">
        <div>
          <Image
            src="/assets/images/bg-img3.png"
            alt="background image"
            width={200}
            height={200}
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="notification-content px-4 w-90 lg:w-96 sm:left-6 relative rounded-t-lg shadow-custom bg-white left-8 -mt-11">
          <sideMenu />
        </div>
      </div>
    </>
  );
}
