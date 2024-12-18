import Image from "next/image";
import SearchList from "./SearchList";

const data = [
  { text: "Troubleshooting car wont stop", date: "Today" },
  {
    text: "What is the recommended tire pressure for my vehicle",
    date: "Today",
  },
  {
    text: "Can you explain what the check engine light means",
    date: "October",
  },
  {
    text: "Difference between synthetic and conventional motor oil",
    date: "May",
  },
];

function SearchBar() {
  return (
    <div className="relative flex flex-col w-full xl:w-[800px] mx-auto p-3 lg:p-5 items-center justify-center my-10 md:my-20 space-y-4">
      <div className="flex w-full rounded-xl p-1 lg:p-3 space-x-3  border border-gray-300">
        <Image
          src="/assets/icons/search.png"
          alt="search icon"
          width={20}
          height={20}
          className=""
        />
        <input
          type="text"
          className="outline-none text-xs md:text-base lg:text-lg w-full"
          placeholder="Search Conversations"
        />
      </div>
      {data.map((item, index) => (
        <SearchList data={item} key={index} />
      ))}
    </div>
  );
}

export default SearchBar;
