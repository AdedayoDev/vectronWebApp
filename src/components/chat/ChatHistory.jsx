import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ChatHistory({ links }) {
  
  return (
    <div className="chat-right-top">

      {links.map((link, index) => (
        <Link href={link.href} key={index} className="links">
          <Image
            src={link.src}
            alt={link.alt || "Message icon"}
            width={20}
            height={20}
          />
          {link.text}
        </Link>
      ))}
    </div>
  );
}
