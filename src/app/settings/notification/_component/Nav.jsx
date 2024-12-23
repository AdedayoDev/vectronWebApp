import Image from "next/image";
import React from "react";

export default function Nav() {
  return (
    <>
      <div className="flex items-center gap-3 mt-4 px-7 justify-between">
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/assets/icons/notification-icon.png"
              alt="Icon"
              width={20}
              height={20}
            />
            <p className="font-bold text-base">Synapse</p>
          </div>
          <div className="lg:flex items-center gap-3 hidden">
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                src="/assets/icons/analytics.png"
                alt="Icon"
                width={20}
                height={20}
              />
              <p className="text-sm">Website analytics</p>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                src="/assets/icons/tags.png"
                alt="Icon"
                width={20}
                height={20}
              />
              <p className="text-sm">Enhancing Communication</p>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                src="/assets/icons/analytics.png"
                alt="Icon"
                width={20}
                height={20}
              />
              <p className="text-sm">New ideas</p>
            </div>
            <Image
              src="/assets/icons/plus-icon.png"
              alt="Icon"
              width={20}
              height={20}
            />
          </div>
        </div>

        <Image
          src="/assets/icons/bit-moji.png"
          alt="background image"
          width={25}
          height={25}
          className="rounded-full cursor-pointer"
        />
      </div>
    </>
  );
}
