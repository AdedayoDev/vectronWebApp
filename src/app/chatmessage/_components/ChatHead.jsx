import Image from "next/image";

function ChatHead() {
  return (
    <div className="flex items-center bg-slate-100 p-3 md:p-5 space-x-5 rounded-t-2xl">
      <div className="relative w-10 h-10">
        <Image
          src="/assets/icons/vechtron.png"
          alt="profile picture"
          fill
          className="object-cover"
        />
      </div>
      <div className="text-lg text-blue-800 font-semibold">Vechtron</div>
      <div className="relative w-5 h-5">
        <Image
          src="/assets/icons/selector.png"
          alt="selector image"
          fill
          className="object-cover hover:cursor-pointer"
        />
      </div>
    </div>
  );
}

export default ChatHead;
