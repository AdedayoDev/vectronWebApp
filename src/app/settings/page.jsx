import SettingsSideBar from "./components/SettingsSideBar";
import React from "react";
import Image from "next/image";
import {
  ChevronRighChevronRight,
  t,
  Home,
  Key,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import NavBar from "@components/navbar/chatNav";

export default function page() {
  return (
    <>
      <NavBar />
      <div>
        <Image
          src="/assets/images/bg-img3.png"
          alt="Background image"
          width={20}
          height={20}
          className="w-[95%] h-[50px] object-cover mt-11 mx-auto"
        />
        <div className="flex gap-[200px] w-[90%] relative -top-5 p-4 bg-white rounded-sm shadow mx-auto ">
          <SettingsSideBar />
          <section className="w-full">
            <div>
              <Link href="/" className="flex items-center gap-2 text-blue-500">
                <Home size={20} />
                <h1>Back to home</h1>
              </Link>
            </div>
            <h1>Settings</h1>
            <div>
              <Link href="/settings/password">
                <div className="flex justify-between my-3 items-center">
                  <div className="flex items-center gap-2">
                    <Key />
                    <p>Password</p>
                  </div>
                  <ChevronRight />
                </div>
                <div className="w-full h-[2px] bg-gray-300" />
              </Link>

              <Link href="/settings/notification">
                <div className="flex justify-between my-3 items-center">
                  <div className="flex items-center gap-2">
                    <Key />
                    <p>Notification</p>
                  </div>
                  <ChevronRight />
                </div>
                <div className="w-full h-[2px] bg-gray-300" />
              </Link>

              <Link href="/settings/integration">
                <div className="flex justify-between my-3 items-center">
                  <div className="flex items-center gap-2">
                    <Key />
                    <p>Integration</p>
                  </div>
                  <ChevronRight />
                </div>
                <div className="w-full h-[2px] bg-gray-300" />
              </Link>

              <Link href="/settings/payment">
                <div className="flex justify-between my-3 items-center">
                  <div className="flex items-center gap-2">
                    <Key />
                    <p>Payment</p>
                  </div>
                  <ChevronRight />
                </div>
                <div className="w-full h-[2px] bg-gray-300" />
              </Link>

              <Link href="/settings/about_vechtron">
                <div className="flex justify-between my-3 items-center">
                  <div className="flex items-center gap-2">
                    <Key />
                    <p>About Vechtron</p>
                  </div>
                  <ChevronRight />
                </div>
                <div className="w-full h-[2px] bg-gray-300" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
