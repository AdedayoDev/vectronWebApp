import Link from "next/link";
import Image from "next/image";
import Conversation from "./_components/Conversation";
import Input from "./_components/Input";
import Profile from "./_components/Profile";
import SideBar from "./_components/SideBar";

export const metadata = {
  title: "Chat with AI",
  description: "AI Chat page",
};

export default function Chat() {
  const items = [
    {
      image: "/assets/images/icon.png",
      text: "Explore Knowledge base",
    },
    {
      image: "/assets/images/icon2.png",
      text: "Explore Troubleshooting",
    },
    {
      image: "/assets/images/icon3.png",
      text: "Explore Maintenance & Diagnostics",
    },
    {
      image: "/assets/images/icon4.png",
      text: "Explore Route Navigation",
    },
  ];

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-end p-2">
          <Profile />
        </div>
        <div className="flex flex-col items-start gap-1 lg:flex-row">
          <div className="flex flex-1 justify-center items-center w-full">
            <div>
              <div className="relative w-full h-40">
                <Image
                  src="/assets/images/bg-img.png"
                  alt="Background image"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col w-dvw lg:w-full p-3 sm:px-7">
                <div className="relative flex flex-col text-center w-full -mt-24 bg-white z-10 p-2 sm:p-7 lg:py-7 lg:px-10 xl:px-52 rounded-2xl shadow-xl">
                  <Link
                    href="/chatmessage/newchat"
                    className="absolute top-3 right-3 border-2 border-purple-600 w-7 md:w-10 p-1 rounded-xl"
                  >
                    <div className="relative w-4 h-4 md:w-7 md:h-7">
                      <Image
                        src="/assets/icons/cancel.png"
                        alt="cancel icon"
                        fill
                        className="object-fit hover:cursor-pointer"
                      />
                    </div>
                  </Link>
                  <div className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold mb-3 mt-10">
                    Unlock the power of AI
                  </div>
                  <div className="text-xs md:text-sm lg:text-md xl:text-lg text-gray-400">
                    Meet docvantage, our ai chat app revolutionizing
                    conversations
                  </div>
                  <div className="mt-10 pb-20">
                    {items.map((item, index) => (
                      <Conversation key={index} items={item} />
                    ))}
                  </div>
                </div>

                <div className="mx-auto -mt-8">
                  <Input />
                </div>
              </div>
            </div>
          </div>
          <div className="flex place-self-center w-72 xl:w-80 lg:place-self-start">
            <SideBar />
          </div>
        </div>
      </div>
    </>
  );
}
