import Image from "next/image";
import {
  CirclePlus,
  Copy,
  Mic,
  Repeat,
  Share,
  ThumbsDown,
  ThumbsUp,
  Volume2,
} from "lucide-react";

export default function Chatdetail() {
  return (
    <>
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
          <div className="relative flex flex-col w-full min-h-96 lg:min-h-[35rem] lg:min-w-[760px] xl:w-[960px] -mt-24 bg-white z-10 p-2 sm:p-7 rounded-2xl shadow-xl">
            <div className="w-full">
              <div className="max-w-xs md:max-w-xl">
                <div className="flex items-start justify-start space-x-3 mb-2">
                  <Image
                    src="/assets/icons/avatar-2.png"
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex flex-col items-start justify-start space-y-2">
                    <h4 className="font-bold text-sm">Peter</h4>
                    <p className="md:ml-3 text-xs lg:text-sm">
                      Can you help me troubleshoot my car?
                    </p>
                  </div>
                </div>
                <div className="flex items-start justify-start space-x-3 mb-2">
                  <Image
                    src="/assets/icons/ai-icon.png"
                    alt="AI icon"
                    width={40}
                    height={40}
                    className="p-1 ml-1 rounded-full"
                  />
                  <div className="flex flex-col items-start justify-start space-y-2">
                    <h4 className="font-bold text-sm">Vechtron</h4>
                    <p className="md:ml-3 text-xs lg:text-sm">
                      I would be happy to help you troubleshoot your car, but I
                      will need more specific information about what issues you
                      are experiencing. This will help me provide more targeted
                      and useful advice.
                    </p>
                    <div className="flex items-center justify-between w-full md:ml-3">
                      <div className="flex border border-gray-200 p-1 md:py-2 md:pl-1 md:pr-10 space-x-2 rounded-lg">
                        <div className="rounded cursor-pointer p-1">
                          <Volume2 size={13} color="gray" />
                        </div>
                        <div className="rounded cursor-pointer p-1 border">
                          <ThumbsUp size={13} color="gray" />
                        </div>
                        <div className="rounded cursor-pointer p-1 border">
                          <ThumbsDown size={13} color="gray" />
                        </div>
                        <div className="rounded cursor-pointer p-1 border">
                          <Share size={13} color="gray" />
                        </div>
                        <div className="rounded cursor-pointer p-1 border">
                          <Copy size={13} color="gray" />
                        </div>
                      </div>
                      <div className="rounded cursor-pointer p-1 border">
                        <Repeat size={13} color="gray" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 pb-20"></div>
          </div>

          <div className="mx-auto mt-7 w-full">
            <div className="flex border p-3 w-full border-purple-400 space-x-2 rounded-lg">
              <Image
                src="/assets/icons/ai-icon.jpg"
                alt="AI icon"
                width={20}
                height={10}
                className="rounded-full"
              />
              <input
                type="text"
                className="outline-none w-full text-sm"
                placeholder="Ask me anything"
              />
              <div className="flex space-x-3 justify-end">
                <CirclePlus
                  size={20}
                  color="gray"
                  className="hover:cursor-pointer"
                />
                <Mic size={20} color="gray" className="hover:cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
