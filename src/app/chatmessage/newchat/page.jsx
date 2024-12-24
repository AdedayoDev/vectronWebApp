import Image from "next/image";
import Input from "../_components/Input";
import Profile from "../_components/Profile";
import ChatHead from "../_components/ChatHead";
import ChatBody from "../_components/ChatBody";
import SideBar from "../_components/SideBar";

export const metadata = {
  title: "New Chat",
  description: "Chat page",
};

export default function Chat() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-end p-2">
          <Profile />
        </div>
        <div className="flex flex-col items-start lg:flex-row">
          <div className="flex flex-1 justify-center items-start w-full">
            <div className="relative border overflow-x-hidden">
              <div className="relative w-full h-40">
                <Image
                  src="/assets/images/bg-img.png"
                  alt="Background image"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col w-dvw lg:w-full p-3 sm:px-7">
                <div className="z-10 flex flex-col items-center w-full -mt-24 bg-white rounded-2xl shadow-xl py-8">
                  <ChatHead />
                  <div className="px-2 my-8 lg:my-12 font-semibold text-sm md:text-lg xl:text-3xl">
                    Good day! How may I assist you today?
                  </div>
                  <ChatBody />
                  <ChatBody />
                  <ChatBody />
                  <Input />
                </div>
              </div>
            </div>
          </div>
          <div className="flex place-self-center w-full lg:w-72 xl:w-80 lg:place-self-start">
            <SideBar />
          </div>
        </div>
      </div>
    </>
  );
}
