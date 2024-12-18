import Image from "next/image";

function SearchList({ data }) {
  return (
    <div className="flex w-full mx-auto p-3 lg:p-7 items-center justify-between space-x-1 border-b border-slate-300">
      <div className="flex flex-col text-left justify-center space-y-2 lg:space-y-4">
        <p className="text-base xl:text-xl">{data.text}</p>
        <p className="text-xs lg:text-sm">{data.date}</p>
      </div>
      <div className="relative w-[5px] h-7">
        <Image
          src="/assets/icons/Vector.png"
          alt="search icon"
          fill
          className="object-fit hover:cursor-pointer"
        />
      </div>
    </div>
  );
}

export default SearchList;
