import React, { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";

function SearchOverlay({ showSearch, handleShowSearch }) {
  const [showMore, setShowMore] = useState(false);
  const [inputValue, setinputValue] = useState("");

  const recentSearches = [
    "West street, Orchard road",
    "Block A, Scotland street",
    "1234, elmection building Church street",
  ];
  const additionalSearches = [
    "JavaScript Fundamentals",
    "Responsive Design",
    "Node.js Best Practices",
  ];

  return (
    <>
      {showSearch && (
        <div className="searchOverlay rounded-md font-bold bg-white w-1/2 md:w-64 p-3 z-10 absolute left-11 lg:left-24 h-60 overflow-y-auto scrollbar-thin lg:top-[585px] bottom-[122px]">
          {/* Search Input */}
          <div className="flex items-center gap-2 border rounded-md p-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent outline-none"
              value={inputValue}
              onChange={(e) => {
                setinputValue(e.target.value);
              }}
            />
            <Search size={20} className="text-gray-500" />
            <Image
              src="/assets/icons/share-icon.png"
              width={15}
              height={15}
              alt="share icon"
            />
          </div>

          {/* Recent Searches */}
          <div className="mt-5">
            <ul>
              {recentSearches.map((search, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-700 mt-2"
                >
                  <Image
                    src="/assets/icons/clock.png"
                    width={15}
                    height={15}
                    alt="clock icon"
                  />
                  {search}
                </li>
              ))}
            </ul>
          </div>

          {/* Show More Section */}
          {showMore && (
            <div className="mt-2">
              <ul>
                {additionalSearches.map((search, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-700 mt-1"
                  >
                    <Image
                      src="/assets/icons/clock.png"
                      width={15}
                      height={15}
                      alt="clock icon"
                    />
                    {search}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            className="text-blue-500 text-sm mt-3"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "More from recent history"}
          </button>
        </div>
      )}
    </>
  );
}

export default SearchOverlay;
