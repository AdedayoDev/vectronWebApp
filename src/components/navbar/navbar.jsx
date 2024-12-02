import React from "react";
import Image from "next/image";
import "./navbar.css";
import Link from "next/link";
export default function Navbar() {
  return (
    <>
      <div className="nav-content">
       <Link href='/signin' className="nav-link">
       <span>Sign in</span>
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
