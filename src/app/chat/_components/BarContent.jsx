import Image from "next/image";
import Link from "next/link";
import Recent from "./Recent";
import Switchs from "./Switchs";
import ListComp from "./ListComp";
import UpgradePro from "./UpgradePro";
import NewChatButton from './NewChat';
import AddVehicleButton from './AddVehicles';

export default function BarContent() {
  return (
    <div className="w-full lg:flex flex-col space-y-10 p-3 md:p-5 bg-[#EBF3FF] lg:rounded-2xl">
      <div className="flex items-center justify-between mt-10 lg:mt-0">
        <p className="uppercase text-lg lg:text-2xl">VECHTRON ui</p>
        <div className="relative w-7 h-7">
          <Image
            src="/assets/icons/sidebar.png"
            alt="sidebar"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        <Link href="/chat/chatdetail">
            <NewChatButton />
        </Link>
        <Link href="/chat/searchchat">
          <div className="relative w-10 h-10">
            <Image
              src="/assets/icons/sidebar-search.png"
              alt="sidebar-search"
              fill
              className="object-cover"
            />
          </div>
        </Link>
      </div>
      <Switchs />
      <div className="flex items-center justify-between py-3 border-y border-slate-400">
        <p className="text-purple-400 hover:cursor-pointer">
          Your conversations
        </p>
        <p className="text-blue-900 hover:cursor-pointer">Clear All</p>
      </div>
      <div>
        <Recent />
      </div>
      <div>
        <AddVehicleButton />
      </div>
      <div>
        <ListComp
          src="/assets/icons/bar.png"
          classes="bg-blue-700 p-2 text-white rounded-lg hover:cursor-pointer"
        >
          Support
        </ListComp>
        <Link href="/settings">
          <ListComp
            src="/assets/icons/setting.png"
            classes="bg-blue-800 p-2 text-white rounded-lg hover:cursor-pointer"
          >
            Settings
          </ListComp>
        </Link>
      </div>
      <UpgradePro />
    </div>
  );
}
