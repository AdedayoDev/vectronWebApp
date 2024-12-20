import Image from "next/image";
import React from "react";

export default function button(props) {
  return (
    <div>
      <button className="w-full py-2 px-4 gap-2 flex items-center justify-start bg-purple-300 hover:bg-purple-200 rounded-lg mt-2">
        <Image
          src={props.buttonIcon}
          alt={props.buttonText}
          width={20}
          height={20}
        />
        {props.buttonText}
      </button>
    </div>
  );
}
