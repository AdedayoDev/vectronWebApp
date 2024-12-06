import React from "react";
import Image from "next/image";
import "./navbar.css";
import Link from "next/link";
export default function Navbar({link='/', text, icon}) {
  return (
    <>
      <div className="nav-content">
       <Link href='/signin' className="nav-link">
       <span>{text}</span>
        <Image
          src={icon}
          alt="icon"
          width={20}
          height={20}
        />
       <span>{text}</span>
        {/* <Image
          src={iconSecond}
          alt="icon"
          width={20}
          height={20}
        /> */}
       </Link>
      </div>
    </>
  );
}
