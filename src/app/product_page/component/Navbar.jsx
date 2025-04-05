"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Navbar() {
  const [hamburger, setHamburger] = useState(false);

  return (
    <>
      <nav className="bg-black text-white py-5">
        {/* Mobile view */}
        <div className="lg:hidden">
          <div className="items-center w-[80%] mx-auto flex justify-between">
            <div className="">
              <Image
                src="/assets/icons/Semantic-logo.svg"
                alt="logo"
                width={50}
                height={50}
                className="w-full"
              />
            </div>
            <button
              className=""
              onClick={() => setHamburger((prev) => !prev)}
            >
              <Image
                src="/assets/icons/Burger.png"
                alt="menu"
                width={20}
                height={20}
                className="w-full"
              />
            </button>
          </div>

          {hamburger && (
            <div className="bg-white absolute text-black top-11 w-full z-50">
              <ul className="list-none py-5 px-6">
                <li  className=''onClick={() => setHamburger(false)}>Features</li>
                <Link href="#">
                  <li  className=''onClick={() => setHamburger(false)}>Features</li>
                </Link>
                <Link href="#">
                  <li className='' onClick={() => setHamburger(false)}>Pricing</li>
                </Link>
                <Link href="#">
                  <li  className=''onClick={() => setHamburger(false)}>Blog</li>
                </Link>
                <Link href="#">
                  <li  className=''onClick={() => setHamburger(false)}>About Us</li>
                </Link>
              </ul>
              <div className="flex gap-3 px-6 mb-5 items-center">
                <Link href="/auth/log-in">Login</Link>
                <Link href="#">
                  <button className="bg-black rounded px-3 w-[150px] py-2 text-white">
                    Get Access
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Large screens */}
        <div>
          <div className="hidden lg:flex justify-between items-center w-[80%] mx-auto">
            <div>
              <Image
                src="/assets/icons/Semantic-logo.svg"
                alt="logo"
                width={50}
                height={50}
                className="scale-[3]"
              />
            </div>

            <div>
              <ul className="list-none flex gap-3 items-center">
                <Link href="#">
                  <li>Features</li>
                </Link>
                <Link href="#">
                  <li>Pricing</li>
                </Link>
                <Link href="#">
                  <li>Blog</li>
                </Link>
                <Link href="#">
                  <li>About Us</li>
                </Link>
              </ul>
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
        </div>
      </nav>
    </>
  );
}
