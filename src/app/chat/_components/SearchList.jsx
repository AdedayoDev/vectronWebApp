import Image from "next/image";

function SearchList({ data }) {
  return (
    <div className="flex w-full mx-auto p-2 lg:p-4 items-center justify-between space-x-1 border border-purple-400 text-blue-800 rounded-xl hover:cursor-pointer">
      <div className="flex flex-col text-left justify-center space-y-1">
        <p className="text-base xl:text-lg">{data.text}</p>
        <p className="text-xs">{data.date}</p>
      </div>
    </div>
  );
}

export default SearchList;
