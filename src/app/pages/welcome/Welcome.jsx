import React from "react";
import Image from "next/image";
import "./Welcome.css";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <div className="welcome-page">
        <div className="welcome-left">
          <Image
            src="/assets/images/bg-welcome.png"
            alt="welcome image"
            width={500}
            height={500}
            objectFit="cover"
          />
          <div className="welcome-left-text">
            The potential to enhance customer service and improve business
            efficiency
          </div>
        </div>
        <div className="welcome-right">
          <Link href='/'> Sign in <Image src='/assets/icons/logout.png' alt="icon" width={30} height={30} /></Link>
          <div className="welcome-right-content">
            <h1>Welcome to Docvantage</h1>
            <div className="links">
              <Link href='/'><Image src='/assets/icons/google.png' alt="icon" width={30} height={30} />Continue with Google</Link>
              <Link href='/'><Image src='/assets/icons/apple.png' alt="icon" width={30} height={30} />Continue with Apple</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
