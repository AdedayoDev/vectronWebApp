import Image from "next/image";
import Recent from "./Recent";
import Vehicles from "./Vehicles";
import Switchs from "./Switchs";
import ListComp from "./ListComp";
import UpgradePro from "./UpgradePro";
import Link from "next/link";

function SideBar() {
  return (
    <div className="flex flex-col space-y-10 mt-5 p-5 lg:p-2">
      <Link href="/chatmessage/newchat">
        <div className="flex items-center w-64 px-3 py-1 rounded-xl space-x-2 hover:cursor-pointer bg-purple-400">
          <div className="relative w-5 h-5">
            <Image
              src="/assets/icons/chat-add.png"
              alt="chat-add"
              fill
              className="object-cover"
            />
          </div>
          <p>New Chat</p>
        </div>
      </Link>
      <div>
        <Recent />
      </div>
      <Vehicles />
      <Switchs />
      <div>
        <ListComp src="/assets/icons/IconSet.png">Update and FAQ</ListComp>
        <ListComp src="/assets/icons/settings.png">Settings</ListComp>
      </div>
      <UpgradePro />
    </div>
  );
}

export default SideBar;
