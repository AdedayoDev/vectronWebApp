'use client'
import Image from "next/image";

export default function Nav() {
  return (
    <nav>
      <div className="navbar">
        <div className="logo-img">
          <Image
            src="/assets/icons/Burger.png"
            alt="hamburger-menu"
            width={60}
            height={60}
          />
          <Image
            src="/assets/images/docvantage-logo.png"
            alt="logo"
            width={60}
            height={60}
          />
        </div>
        <div>
          <button> <Image src='/assets/icons/user.png' alt="user" width={30} height={30} /> Sign in</button>
        </div>
      </div>
    </nav>
  );
}
