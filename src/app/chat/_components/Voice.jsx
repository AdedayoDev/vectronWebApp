import { Mic, X } from "lucide-react";
import Image from "next/image";
import image from "../../../../public/assets/icons/voicechat.png";

export default function Voice({ onClick }) {
  return (
    <div className="flex flex-col w-full p-5 lg:min-h-[35rem]">
      <div className="flex w-dvw lg:max-w-screen-lg xl:max-w-[900px] gap-2 items-center ">
        <Image
          src="/assets/icons/vechtron.png"
          alt="icon"
          width={20}
          height={20}
        />
        <p> Vechtron</p>
        <Image
          src="/assets/icons/selector.png"
          alt="icon"
          width={15}
          height={15}
        />
      </div>
      <div className="my-10 w-36 md:w-64 h-48 sm:h-64 mx-auto flex flex-col items-center justify-between">
        <div className="relative rounded-full h-20 sm:h-32 w-20 sm:w-32">
          <Image
            src={image}
            fill
            alt="voice recording icon"
            className="object-cover"
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="text-center bg-slate-200 rounded-full p-2 font-light">
            <Mic size={30} color="red" className="cursor-pointer" />
          </div>

          <div className="text-center bg-slate-200 rounded-full p-2 font-light">
            <X
              size={30}
              color="black"
              className="cursor-pointer"
              onClick={onClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
