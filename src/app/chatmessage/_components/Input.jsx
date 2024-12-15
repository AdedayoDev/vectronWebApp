import Image from "next/image";

function Input() {
  return (
    <div className="flex flex-col w-dvw sm:w-[310px] md:w-[540px] xl:w-[900px] bg-white -mt-8 p-2 sm:p-7 lg:p-10  xl:mx-auto">
      <div className="flex flex-col bg-[#C8D6FF] rounded-2xl p-5 md:p-8 space-y-2">
        <p className="font-bold text-sm text-blue-500">Message Vechtron</p>
        <div className="h-10 md:h-20"></div>
        <div className="flex items-center justify-between">
          <div className="relative w-5 h-5">
            <Image
              src="/assets/icons/attach.png"
              alt="attachment image"
              fill
              className="object-cover hover:cursor-pointer"
            />
          </div>
          <div className="relative w-5 h-5">
            <Image
              src="/assets/icons/voiceRecord.png"
              alt="voiceRecord image"
              fill
              className="object-cover hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Input;
