import Image from "next/image";
import NewchatBody from "../_ui/NewchatBody";

export const metadata = {
  title: "New Chat",
  description: "Chat page",
};

export default function Chat() {
  return (
    <>
      <div className="relative overflow-x-hidden">
        <div className="relative w-full h-40">
          <Image
            src="/assets/images/bg-img.png"
            alt="Background image"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col w-dvw lg:w-full p-3 sm:px-7">
          <NewchatBody />
        </div>
      </div>
    </>
  );
}
