
import Image from "next/image";
import SideBar from "../../voicechat/components/sideBar";
import Navbar from "@components/navbar/chatNav";
import { Menu } from "lucide-react";
import Feed from "./component/Feed";

export default function Page() {

  return (
    <div>
      <Navbar />
      <div >
        <Menu
          size={30}
          color="blue"
          className="absolute sm:hidden top-3 left-4 flex cursor-pointer"
        />
      </div>
      <div className="voice-chat flex justify-between mt-11">
        <div className="voice-chat-left">
          <Image
            src="/assets/images/bg-img2.png"
            alt="background-image"
            width={200}
            height={200}
            className="w-full lg:w-[78%] absolute h-32 object-cover"
          />
          <Feed />
        </div>
        <div>
          <SideBar />
        </div>
      </div>
    </div>
  );
}
