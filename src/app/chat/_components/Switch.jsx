"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function Switch({ disabled, children }) {
  return !!children ? (
    <div
      className={`flex items-center justify-between w-full h-[40px] text-xs md:text-base font-medium`}
    >
      {children}
      <Button disabled={disabled} />
    </div>
  ) : (
    <Button disabled={disabled} />
  );
}

function Button({ disabled }) {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
    if (isChecked === true) {
      router.replace("/chat/chatdetail");
    }
  };

  return (
    <button
      className={`flex w-[18px] h-[10px] transition-all duration-500 ${
        isChecked ? "bg-blue-600" : "bg-gray-300"
      } p-[1.2px] rounded-full disabled:cursor-not-allowed`}
      onClick={handleToggle}
      disabled={disabled}
    >
      <span
        className={`w-[8px] h-[8px] rounded-full bg-white ${
          isChecked === true ? "translate-x-2" : ""
        } transition-all duration-500`}
      ></span>
    </button>
  );
}
export default Switch;
