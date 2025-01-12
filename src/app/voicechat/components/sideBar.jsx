"use client";
import { Menu, Search } from "lucide-react";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Toggle from "@components/chatComp/Toggle";

export default function sideBar() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      {/* mobile */}
      {showMenu ? (
        <FaTimes
          size={25}
          onClick={() => setShowMenu((prev) => !prev)}
          className="custom_menu absolute top-0 mt-3 left-0 mx-3 sm:block block lg:hidden"
        />
      ) : (
        <Menu
          size={30}
          className="custom_menu absolute top-0 mt-3 left-0 mx-3 sm:block lg:hidden"
          onClick={() => setShowMenu((prev) => !prev)}
        />
      )}
      {showMenu && (
        <div className="custom_sidebar absolute z-10 left-0 rounded p-3 lg:hidden bg-white shadow-lg w-[60%] h-[1100px]">
          <div className="flex justify-between mb-7">
            <h1 className="font-semibold">VECHTRON UI</h1>
            <Image
              src="/assets/icons/vech-ui.png"
              alt="search"
              width={20}
              height={20}
            />
          </div>
          <Link
            href="/chat/newchat"
            className="flex items-center justify-between"
          >
            <div className="flex items-center p-2 px-5 gap-2 bg-blue-500 text-white rounded-full">
              <Image
                src="/assets/icons/chat-add2.png"
                alt="search"
                width={20}
                height={20}
              />
              <p>New message</p>
            </div>
            <div className="bg-blue-800 p-2 rounded-full">
              <Search size={20} color="white" />
            </div>
          </Link>

          <div className="my-7">
            <p className="text-base font-semibold mb-3">Explore</p>
            <div className="text text-blue-400">
              <div className="flex justify-between gap-4 mb-3 items-center">
                <p>Maintenance Recommendations</p>
                <Toggle />
              </div>
              <div className="flex justify-between gap-4 mb-3 items-center">
                <p>Troubleshooting & Diagnostic</p>
                <Toggle />
              </div>
              <div className="flex justify-between gap-4 mb-3 items-center">
                <p>Vehicle Profile Management</p>
                <Toggle />
              </div>
            </div>
          </div>

          <div className="my-11">
            <div className="w-full h-[3px] bg-gray-300" />
            <Link
              href="/chat/chathistory"
              className="my-3 cursor-pointer block text-blue-400"
            >
              Your Conversations
            </Link>
            <div className="w-full h-[3px] bg-gray-300" />
          </div>

          <Link href="#">
            <div className="flex items-center gap-2 p-2 bg-blue-700 text-white rounded-md">
              <Image
                src="/assets/icons/chat-add2.png"
                alt="search"
                width={20}
                height={20}
              />
              <p>Add Vehicle</p>
            </div>
          </Link>

          <div className="mt-36">
            <Link href="#">
              <div className=" bg-blue-700 text-white rounded p-2 flex gap-2 mt-2">
                <Image
                  src="/assets/icons/agent.png"
                  alt="search action"
                  width={20}
                  height={20}
                />
                <p>Vechtron Car Agent</p>
              </div>
            </Link>

            <Link href="/support">
              <div className="text-blue-500 rounded border-2 border-blue-300 p-2 flex gap-2 mt-2">
                <Image
                  src="/assets/icons/headset.png"
                  alt="search action"
                  width={20}
                  height={20}
                />
                <p> Support</p>
              </div>
            </Link>

            <Link href="/settings">
              <div className="text-blue-500 rounded border-2 border-blue-300 p-2 flex gap-2 mt-2">
                <Image
                  src="/assets/icons/settings.png"
                  alt="search action"
                  width={20}
                  height={15}
                />
                <p> Settings</p>
              </div>
            </Link>
          </div>

          <div className="upgrade-container mt-6 p-3 relative rounded-2xl bg-purple-400">
            <div className=" cursor-pointer rounded-full bg-white absolute p-2 w-8 h-8 flex items-center justify-center right-2">
              X
            </div>

            <div className="upgrade-content text-center">
              <Image
                src="/assets/images/Empty-chat.png"
                alt="search action"
                width={98}
                height={86}
                className="mx-auto"
              />
              <Link href="/pricing">
                <button className="justify-center items-center gap-2 flex w-full rounded-full p-2 bg-blue-700 text-white">
                  Upgrade to Pro
                  <Image
                    src="/assets/icons/Solid.png"
                    alt="search action"
                    width={20}
                    height={20}
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Desktop */}
      <div className="hidden md:hidden lg:block rounded p-3 bg-blue-50">
        <div className="flex justify-between mb-7">
          <h1 className="font-semibold">VECHTRON UI</h1>
          <Image
            src="/assets/icons/vech-ui.png"
            alt="search"
            width={20}
            height={20}
          />
        </div>
        <Link
          href="/chat/newchat"
          className="flex items-center justify-between"
        >
          <div className="flex items-center p-2 px-5 gap-2 bg-blue-500 text-white rounded-full">
            <Image
              src="/assets/icons/chat-add2.png"
              alt="search"
              width={20}
              height={20}
            />
            <p>New message</p>
          </div>
          <div className="bg-blue-800 p-2 rounded-full">
            <Search size={20} color="white" />
          </div>
        </Link>

        <div className="my-7">
          <p className="text-base font-semibold mb-3">Explore</p>
          <div className="text text-blue-400">
            <div className="flex justify-between gap-4 mb-3 items-center">
              <p>Maintenance Recommendations</p>
              <Toggle />
            </div>
            <div className="flex justify-between gap-4 mb-3 items-center">
              <p>Troubleshooting & Diagnostic</p>
              <Toggle />
            </div>
            <div className="flex justify-between gap-4 mb-3 items-center">
              <p>Vehicle Profile Management</p>
              <Toggle />
            </div>
          </div>
        </div>

        <div className="my-11">
          <div className="w-full h-[3px] bg-gray-300" />
          <Link
            href="/chat/chathistory"
            className="my-3 cursor-pointer block text-blue-400"
          >
            Your Conversations
          </Link>
          <div className="w-full h-[3px] bg-gray-300" />
        </div>

        <Link href="#">
          <div className="flex items-center gap-2 p-2 bg-blue-700 text-white rounded-md">
            <Image
              src="/assets/icons/chat-add2.png"
              alt="search"
              width={20}
              height={20}
            />
            <p>Add Vehicle</p>
          </div>
        </Link>

        <div className="mt-36">
          <Link href="#">
            <div className=" bg-blue-700 text-white rounded p-2 flex gap-2 mt-2">
              <Image
                src="/assets/icons/agent.png"
                alt="search action"
                width={20}
                height={20}
              />
              <p>Vechtron Car Agent</p>
            </div>
          </Link>

          <Link href="/support">
            <div className="text-blue-500 rounded border-2 border-blue-300 p-2 flex gap-2 mt-2">
              <Image
                src="/assets/icons/headset.png"
                alt="search action"
                width={20}
                height={20}
              />
              <p> Support</p>
            </div>
          </Link>

          <Link href="/settings">
            <div className="text-blue-500 rounded border-2 border-blue-300 p-2 flex gap-2 mt-2">
              <Image
                src="/assets/icons/settings.png"
                alt="search action"
                width={20}
                height={15}
              />
              <p> Settings</p>
            </div>
          </Link>
        </div>

        <div className="upgrade-container mt-6 p-3 relative rounded-2xl bg-purple-400">
          <div className=" cursor-pointer rounded-full bg-white absolute p-2 w-8 h-8 flex items-center justify-center right-2">
            X
          </div>

          <div className="upgrade-content text-center">
            <Image
              src="/assets/images/Empty-chat.png"
              alt="search action"
              width={98}
              height={86}
              className="mx-auto"
            />
            <Link href="/pricing">
              <button className="justify-center items-center gap-2 flex w-full rounded-full p-2 bg-blue-700 text-white">
                Upgrade to Pro
                <Image
                  src="/assets/icons/Solid.png"
                  alt="search action"
                  width={20}
                  height={20}
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
