"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@components/ui/button";
import { ArrowRight, Menu } from "lucide-react";
import Toggle from "./toggle";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function SideChat() {

  const [showSideBar, setShowSideBar] =useState(false)
  const [changeIcon, setChangeIcon] =useState(true)

  const handleshowBar = () =>{
    setShowSideBar(prev=>!prev)
  }

  const handleChange = () =>{
    setChangeIcon(prev=>!prev)
  }
  return (
    <>
    {/* Mobile */}
    <div className='absolute lg:hidden sm:flex top-2 left-5 hover:bg-gray-100 hover:rounded-full p-[5px]' onClick={handleChange}>
    {changeIcon ? <Menu size={30} onClick={handleshowBar}/>:  <FaTimes size={25} className="font-extralight" onClick={handleshowBar}/>}
    </div>
   {showSideBar && <div className="top-[50px] px-3 bg-white z-10 shadow-md absolute w-[60%] block lg:hidden">
      <div className="mt-3">
        <Link href="/chat/newchat">
          <Button variant="secondary" className="w-full bg-purple-300 text-left">
            <Image
              src="/assets/icons/newmessage.png"
              alt="message icon"
              width={15}
              height={15}
            />
            New message
          </Button>
        </Link>

        <div className="mt-5">
          <h4 className="text-base font-semibold mb-3">Recents</h4>
          <div className="flex gap-2 items-center mt-1">
            <Image
              src="/assets/icons/recent.png"
              alt="message icon"
              width={15}
              height={15}
            />
            <p>Advantages of AI</p>
          </div>
          <div className="flex gap-2 items-center mt-1">
            <Image
              src="/assets/icons/recent.png"
              alt="message icon"
              width={15}
              height={15}
            />
            <p>Reasons for car over heating </p>
          </div>
        </div>
        <Link className="text-base font-semibold flex items-center gap-2 mt-2" href="/chat/chathistory">
          View all <ArrowRight className="" />
        </Link>
      </div>
      <div className="mt-5">
        <h4 className="text-base font-semibold mb-3">Vehicles</h4>
        <div className="flex gap-2 items-center mt-1">
          <Image
            src="/assets/icons/tesla.png"
            alt="message icon"
            width={15}
            height={15}
          />
          <p>Tesla</p>
        </div>
        <div className="flex gap-2 items-center mt-1">
          <Image
            src="/assets/icons/toyota.png"
            alt="message icon"
            width={15}
            height={15}
          />
          <p>Toyota Camry 2012</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex gap-3 mb-3 items-center justify-between">
          <p>Explore</p>
          <Toggle />
        </div>

        <div className="flex gap-3 mb-3 items-center justify-between">
          <p>Maintenance Recommendations</p>
          <Toggle />
        </div>

        <div className="flex gap-3 mb-3 items-center justify-between">
          <p>Troubleshooting & Diagnostics</p>
          <Toggle />
        </div>

        <div className="flex gap-3 mb-3 items-center justify-between">
          <p>Vehicle Profile Management</p>
          <Toggle />
        </div>
      </div>

      <div className="mt-6">
        <div className="other-option">
          <div className="mb-3 flex items-center gap-2 text-base">
            <Image
              src="/assets/icons/upload.png"
              alt="message icon"
              width={15}
              height={15}
            />
            <Link href="#">
              <p>Updates & FAQ</p>
            </Link>
          </div>
          <div className="mb-3 flex items-center gap-2 text-base">
            <Image
              src="/assets/icons/settings.png"
              alt="message icon"
              width={20}
              height={20}
            />
            <Link href="/settings">
              <p>Settings</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-purple-400 rounded-lg p-3 text-center relative mt-10">
        <button className="absolute cursor-pointer right-2 top-2 bg-white p-2 rounded-full h-10 text-xl flex justify-center items-center w-10">x</button>
        <Image
          src="/assets/images/Empty-chat.png"
          alt="message icon"
          width={150}
          height={150}
          className="w-[150px] mx-auto mt-3"
        />
       <Link href='/pricing'>
       <div className="flex items-center gap-3 w-full mx-auto p-3 justify-center mt-5 text-base font-normal rounded-full bg-blue-600 text-white">
          <span>Upgrade to Pro</span>
          <Image
            src="/assets/icons/solid.png"
            alt="message icon"
            width={20}
            height={20}
          />
        </div>
       </Link>
      </div>
    </div>}

    {/* Desktop */}
    <div className="pr-3 hidden lg:block">
      <div className="">
        <Link href="/chat/newchat">
          <Button variant="secondary" className="w-full bg-purple-300 text-left">
            <Image
              src="/assets/icons/newmessage.png"
              alt="message icon"
              width={15}
              height={15}
            />
            New message
          </Button>
        </Link>

        <div className="mt-5">
          <h4 className="text-base font-semibold mb-3">Recents</h4>
          <div className="flex gap-2 items-center mt-1">
            <Image
              src="/assets/icons/recent.png"
              alt="message icon"
              width={15}
              height={15}
            />
            <p>Advantages of AI</p>
          </div>
          <div className="flex gap-2 items-center mt-1">
            <Image
              src="/assets/icons/recent.png"
              alt="message icon"
              width={15}
              height={15}
            />
            <p>Reasons for car over heating </p>
          </div>
        </div>
        <Link className="text-base font-semibold flex items-center gap-2 mt-2" href="/chat/chathistory">
          View all <ArrowRight className="" />
        </Link>
      </div>
      <div className="mt-5">
        <h4 className="text-base font-semibold mb-3">Vehicles</h4>
        <div className="flex gap-2 items-center mt-1">
          <Image
            src="/assets/icons/tesla.png"
            alt="message icon"
            width={15}
            height={15}
          />
          <p>Tesla</p>
        </div>
        <div className="flex gap-2 items-center mt-1">
          <Image
            src="/assets/icons/toyota.png"
            alt="message icon"
            width={15}
            height={15}
          />
          <p>Toyota Camry 2012</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex gap-3 mb-3 items-center justify-between">
          <p>Explore</p>
          <Toggle />
        </div>

        <div className="flex gap-3 mb-3 items-center justify-between">
          <p>Maintenance Recommendations</p>
          <Toggle />
        </div>

        <div className="flex gap-3 mb-3 items-center justify-between">
          <p>Troubleshooting & Diagnostics</p>
          <Toggle />
        </div>

        <div className="flex gap-3 mb-3 items-center justify-between">
          <p>Vehicle Profile Management</p>
          <Toggle />
        </div>
      </div>

      <div className="mt-6">
        <div className="other-option">
          <div className="mb-3 flex items-center gap-2 text-base">
            <Image
              src="/assets/icons/upload.png"
              alt="message icon"
              width={15}
              height={15}
            />
            <Link href="#">
              <p>Updates & FAQ</p>
            </Link>
          </div>
          <div className="mb-3 flex items-center gap-2 text-base">
            <Image
              src="/assets/icons/settings.png"
              alt="message icon"
              width={20}
              height={20}
            />
            <Link href="/settings">
              <p>Settings</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-purple-400 rounded-lg p-3 text-center relative mt-10">
        <button className="absolute cursor-pointer right-2 top-2 bg-white p-2 rounded-full h-10 text-xl flex justify-center items-center w-10">x</button>
        <Image
          src="/assets/images/Empty-chat.png"
          alt="message icon"
          width={150}
          height={150}
          className="w-[150px] mx-auto mt-3"
        />
       <Link href='/pricing'>
       <div className="flex items-center gap-3 w-full mx-auto p-3 justify-center mt-5 text-base font-normal rounded-full bg-blue-600 text-white">
          <span>Upgrade to Pro</span>
          <Image
            src="/assets/icons/solid.png"
            alt="message icon"
            width={20}
            height={20}
          />
        </div>
       </Link>
      </div>
    </div>
    </>
  );
}
