"use client";
import Image from "next/image";
import React from "react";

export default function Navbar() {
  const [hamburger, setHamburger] = useState(false);

  return (
    <>
      <nav className="bg-black text-white">
        {/* Mobile view */}
        <div className="lg:hidden flex items-center justify-between">
          <Image
            src="/assets/icons/Semantice-logo.svg"
            alt="logo"
            width={20}
            height={20}
          />
          <div className="flex gap-3 items-center">
            <div className="flex gap-3 items-center">
              <Link href="/auth/log-in">Login</Link>
              <Link href="#">
                <button className="bg-white rounded px-6 py-2 text-black">
                  Get Access
                </button>
              </Link>
            </div>
            <div>
              <Image
                src="/assets/icons/Burger.png"
                alt="menu"
                width={20}
                height={20}
                onClick={() => setHamburger((prev) => !prev)}
              />

              {hamburger && (
                <div className="bg-white absolute top-0 right-7 w-[200px] z-30">
                  <li onClick={() => setHamburger(false)}>Features</li>
                  <li onClick={() => setHamburger(false)}>Pricing</li>
                  <li onClick={() => setHamburger(false)}>Blog</li>
                  <li onClick={() => setHamburger(false)}>About Us</li>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Large screens */}
        <div className="flex justify-between items-center bg-black text-white">
          <div>
            <Image
              src="/assets/icons/Semantice-logo.svg"
              alt="logo"
              width={20}
              height={20}
            />
          </div>
          <div className="flex gap-2 items-center">
            <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li>
            <li>About Us</li>
          </div>

          <div className="flex gap-3 items-center">
            <Link href="/auth/log-in">Login</Link>
            <Link href="#">
              <button className="bg-white rounded px-6 py-2 text-black">
                Get Access
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
