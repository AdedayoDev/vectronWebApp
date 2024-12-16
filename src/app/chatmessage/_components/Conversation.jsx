"use client";

import { useState } from "react";
import Image from "next/image";

function Conversation({ items }) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="flex items-center justify-between w-full h-[40px] md:h-[50px] lg:h-[60px] rounded-2xl shadow-xl px-2 border border-gray-200 my-2">
      <div className="flex items-center justify-start space-x-1 sm:space-x-3">
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
        <div className="text-xs font-semibold">{items.text}</div>
      </div>
      <input
        type="checkbox"
        name="checkBox"
        value={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        className="h-4 w-4 text-white accent-green-400"
      />
    </div>
  );
}

export default Conversation;
