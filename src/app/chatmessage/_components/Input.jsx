import Image from "next/image";

function Input() {
  return (
    <div className="flex flex-col w-[250px] xs:w-[275px] sm:w-[305px] md:w-[540px] xl:w-[900px]  bg-white p-5 md:p-7 lg:p-10 mx-auto">
      <div className="flex flex-col bg-[#C8D6FF] rounded-2xl p-5 md:p-8 space-y-2">
        <p className="w-full font-bold text-sm text-blue-500 text-left md:text-lg">
          Message Vechtron
        </p>
        <div className="h-10 md:h-20">{/* Text Area */}</div>
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

//
