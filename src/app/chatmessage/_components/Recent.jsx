import Image from "next/image";
import ListComp from "./ListComp";

function Recent() {
  return (
    <div className="flex flex-col text-[#442066]">
      <p className="text-[16px] font-bold my-1">Recents</p>
      <ListComp src="/assets/icons/gridchat.png">Advantages of AI</ListComp>
      <ListComp src="/assets/icons/gridchat.png">
        Reasons for car over heating
      </ListComp>

      <div className="flex items-center justify-start space-x-2 hover:cursor-pointer">
        <p className="text-[16px] font-bold my-1">View All</p>
        <div className="relative w-3 h-2">
          <Image
            src="/assets/icons/arrow.png"
            alt="arrow"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Recent;
