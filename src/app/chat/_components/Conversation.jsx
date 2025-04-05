"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

function Conversation({ items }) {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const handleChecked = (e) => {
    setIsChecked(e.target.checked);
    if (isChecked === true) {
      router.replace("/chatmessage/newchat");
    }
  };

  return (
    <div className="flex items-center justify-between w-full h-[40px] md:h-[50px] lg:h-[60px] xl:h-[65px] rounded-2xl shadow-lg pr-6 px-2 lg:px-3 border border-gray-200 my-2 py-6 lg:py-10">
      <div className="flex items-center justify-start space-x-1 sm:space-x-3 ">
        <Image
          src={items.image}
          alt={items.text}
          width={20}
          height={20}
          className="md:hidden"
        />
        <Image
          src={items.image}
          alt={items.text}
          width={30}
          height={30}
          className="hidden md:block lg:hidden"
        />
        <Image
          src={items.image}
          alt={items.text}
          width={40}
          height={40}
          className="hidden lg:block"
        />
        <div className="text-xs md:text-lg text-left font-semibold">
          {items.text}
        </div>
      </div>
      <input
        type="checkbox"
        name="checkBox"
        value={isChecked}
        onChange={(e) => handleChecked}
        className="h-4 w-4 lg:h-6 lg:w-6 text-white accent-green-400 mr-0 lg:mr-10"
      />
    </div>
  );
}

export default Conversation;
