"use client";
import Button from "./button";
import Image from "next/image";
import Link from "next/link";

export default function sideChat({ showNavbar, handleShowNav }) {
  return (
    <>
      {/* mobile */}

      {showNavbar && (
        <div className="absolute z-10 left-0 rounded p-3 bg-blue-100">
          <Button
            buttonIcon="/assets/icons/chat-add.png"
            buttonText="New message"
          />
          <button className="py-2 px-4 w-full gap-2 items-center flex bg-transparent border-2 border-black border-solid hover:bg-purple-200 rounded-lg mt-2">
            <Image
              src="/assets/icons/search-action.png"
              alt="search action"
              width={20}
              height={20}
            />
            Search action
          </button>
          <div className="starred-chat mt-6">
            <p className="text-md font-bold mb-2">Starred</p>
            <div className="border-dotted border-black border-x border-y h-20">
              <p className="flex justify-center my-7 text">
                Star chats you use often
              </p>
            </div>
          </div>
          <div className="recents mt-5">
            <p className="text-md font-bold mb-2">Recents</p>
            <div className="cursor-pointer recents-content flex gap-2 mb-2">
              <Image
                src="/assets/icons/gridchat.png"
                alt="search action"
                width={20}
                height={20}
              />
              <p>Advantages of AI</p>
            </div>
            <div className="cursor-pointer recents-content flex gap-2">
              <Image
                src="/assets/icons/gridchat.png"
                alt="search action"
                width={20}
                height={20}
              />
              <p> Reasons for car over heating</p>
            </div>
            <Link
              href="/chathistory"
              className="mt-2 font-bold flex items-center gap-3 no-underline"
            >
              View all
              <Image
                src="/assets/icons/arrow.png"
                alt="search action"
                width={20}
                height={5}
                className="w-4 h-3"
              />
            </Link>
          </div>

          <div className="vehicles mt-6">
            <p className="text-md font-bold mb-2">Vehicles</p>
            <div className="cursor-pointer vehicle-content flex gap-2">
              <Image
                src="/assets/icons/tesla.png"
                alt="search action"
                width={20}
                height={20}
              />
              <p> Tesla</p>
            </div>
            <div className=" cursor-pointer vehicle-content flex gap-2 mt-2">
              <Image
                src="/assets/icons/toyota.png"
                alt="search action"
                width={25}
                height={15}
              />
              <p> Toyota Camery 2012</p>
            </div>
          </div>

          <div className="updates mt-10">
            <div className="cursor-pointer updates-content flex gap-2 mt-2">
              <Image
                src="/assets/icons/Iconset.png"
                alt="search action"
                width={20}
                height={15}
              />
              <p> Updates & FAQ</p>
            </div>
            <div className="cursor-pointer vehicle-content flex gap-2 mt-2">
              <Image
                src="/assets/icons/settings.png"
                alt="search action"
                width={20}
                height={15}
              />
              <p> Settings</p>
            </div>
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
              <button className="justify-center items-center gap-2 flex w-full rounded-full p-2 bg-blue-700 text-white">
                Upgrade to Pro
                <Image
                  src="/assets/icons/Solid.png"
                  alt="search action"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop */}
      <div className="hidden sm:block side-container rounded p-3">
        <Button
          buttonIcon="/assets/icons/chat-add.png"
          buttonText="New message"
        />
        <button className="py-2 px-4 w-full gap-2 items-center flex bg-transparent border-2 border-black border-solid hover:bg-purple-200 rounded-lg mt-2">
          <Image
            src="/assets/icons/search-action.png"
            alt="search action"
            width={20}
            height={20}
          />
          Search action
        </button>
        <div className="starred-chat mt-6">
          <p className="text-md font-bold mb-2">Starred</p>
          <div className="border-dotted border-black border-x border-y h-20">
            <p className="flex justify-center my-7 text">
              Star chats you use often
            </p>
          </div>
        </div>
        <div className="recents mt-5">
          <p className="text-md font-bold mb-2">Recents</p>
          <div className="cursor-pointer recents-content flex gap-2 mb-2">
            <Image
              src="/assets/icons/gridchat.png"
              alt="search action"
              width={20}
              height={20}
            />
            <p>Advantages of AI</p>
          </div>
          <div className="cursor-pointer recents-content flex gap-2">
            <Image
              src="/assets/icons/gridchat.png"
              alt="search action"
              width={20}
              height={20}
            />
            <p> Reasons for car over heating</p>
          </div>
          <Link
            href="/chathistory"
            className="mt-2 font-bold flex items-center gap-3 no-underline"
          >
            View all
            <Image
              src="/assets/icons/arrow.png"
              alt="search action"
              width={20}
              height={5}
              className="w-4 h-3"
            />
          </Link>
        </div>

        <div className="vehicles mt-6">
          <p className="text-md font-bold mb-2">Vehicles</p>
          <div className="cursor-pointer vehicle-content flex gap-2">
            <Image
              src="/assets/icons/tesla.png"
              alt="search action"
              width={20}
              height={20}
            />
            <p> Tesla</p>
          </div>
          <div className=" cursor-pointer vehicle-content flex gap-2 mt-2">
            <Image
              src="/assets/icons/toyota.png"
              alt="search action"
              width={25}
              height={15}
            />
            <p> Toyota Camery 2012</p>
          </div>
        </div>

        <div className="updates mt-10">
          <div className="cursor-pointer updates-content flex gap-2 mt-2">
            <Image
              src="/assets/icons/Iconset.png"
              alt="search action"
              width={20}
              height={15}
            />
            <p> Updates & FAQ</p>
          </div>
          <div className="cursor-pointer vehicle-content flex gap-2 mt-2">
            <Image
              src="/assets/icons/settings.png"
              alt="search action"
              width={20}
              height={15}
            />
            <Link href="/settings">
              <p> Settings</p>
            </Link>
          </div>
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
            <button className="justify-center items-center gap-2 flex w-full rounded-full p-2 bg-blue-700 text-white">
              Upgrade to Pro
              <Image
                src="/assets/icons/Solid.png"
                alt="search action"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
