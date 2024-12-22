import Image from "next/image";
import SearchList from "./SearchList";

const data = [
  {
    text: "Advantages of AI",
    date: "Last message 30 minutes ago",
  },
  {
    text: "Advantages of AI",
    date: "Last message 30 minutes ago",
  },
  {
    text: "Advantages of AI",
    date: "Last message 30 minutes ago",
  },
];

function SearchBar() {
  return (
    <div className="relative flex flex-col w-full xl:w-[800px] mx-auto px-5 lg:px-10 items-center justify-center my-5 md:my-10 space-y-3">
      <div className="flex flex-col w-full mb-5">
        <div className="flex w-full rounded-xl p-1 lg:p-3 space-x-2 border border-purple-400">
          <Image
            src="/assets/icons/search.png"
            alt="search icon"
            width={30}
            height={20}
            className=""
          />
          <input
            type="text"
            className="outline-none text-xs md:text-base lg:text-lg w-full placeholder:text-blue-800 text-blue-800"
            placeholder="Search your chats"
          />
        </div>
        <div className="place-self-start text-blue-800 text-xs lg:text-sm my-3">
          You have 2 previous chats with Vechtron
        </div>
      </div>
      {data.map((item, index) => (
        <SearchList data={item} key={index} />
      ))}
    </div>
  );
}

export default SearchBar;
