import React from "react";
import Image from "next/image";
import "./navbar.css";
export default function Navbar() {
  return (
    <>
      <div className="nav-content">
        Sign in
        <Image
          src="/assets/icons/icon-login.png"
          alt="icon"
          width={20}
          height={20}
        />
      </div>
    </>
  );
}
