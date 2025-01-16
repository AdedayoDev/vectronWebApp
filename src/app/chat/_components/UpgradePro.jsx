import Image from "next/image";

function UpgradePro() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full bg-[#9FB8FF] p-5 rounded-3xl">
      <button className="absolute top-3 right-3 font-semibold bg-white h-10 w-10 p-1 rounded-full hover:cursor-pointer">
        X
      </button>
      <Image
        src="/assets/images/Empty-chat.png"
        alt="message icon"
        width={120}
        height={120}
        className="my-3"
      />
      <div className="flex items-center justify-center w-full rounded-full text-white bg-blue-700 font-bold space-x-3 p-3 hover:cursor-pointer">
        <span>Upgrade to Pro</span>
        <Image
          src="/assets/icons/solid.png"
          alt="message icon"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
}

export default UpgradePro;
