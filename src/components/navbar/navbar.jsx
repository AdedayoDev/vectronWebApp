import React from "react";
import Image from "next/image";
import "./navbar.css";
import Link from "next/link";
export default function Navbar({link='/', text}) {
  return (
    <>
      <div className="nav-content">
       <Link href={link} className="nav-link">
       <span>{text}</span>
        <Image
          src="/assets/icons/icon-login.png"
          alt="icon"
          width={20}
          height={20}
        />
       </Link>
      </div>
    </>
  );
}
