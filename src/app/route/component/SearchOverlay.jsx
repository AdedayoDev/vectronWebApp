import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import Image from "next/image";

function SearchOverlay({ onSearch, initialValue = "", onDirectionsSearch }) {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const searchInputRef = useRef(null);
  const containerRef = useRef(null);

  const recentSearches = [
    "West street, Orchard road",
    "Block A, Scotland street",
    "1234, elmection building Church street",
  ];

  const handleDirectionsSubmit = (e) => {
    e?.preventDefault(); // Prevent form submission if called from form
    if (fromLocation.trim() && toLocation.trim()) {
      onDirectionsSearch(fromLocation, toLocation);
      setShowRecentSearches(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleDirectionsSubmit();
    }
  };

  const handleSearchClick = (search) => {
    if (activeInput === 'from') {
      setFromLocation(search);
    } else {
      setToLocation(search);
    }
    setShowRecentSearches(false);
  };

  // Handle clicks outside of the search container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowRecentSearches(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="absolute w-full bottom-16 z-50 px-6" ref={containerRef}>
      <div className="relative max-w-4xl mx-auto">
        <form onSubmit={handleDirectionsSubmit} className="bg-white rounded-lg shadow-lg p-3 space-y-2">
          {/* From Location */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <input
              type="text"
              placeholder="From location"
              className="flex-1 bg-transparent border-none outline-none text-gray-700"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          {/* To Location */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <input
              type="text"
              placeholder="To location"
              className="flex-1 bg-transparent border-none outline-none text-gray-700"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              type="submit"
              className="p-2 hover:bg-gray-100 rounded-full focus:outline-none disabled:opacity-50"
              disabled={!fromLocation.trim() || !toLocation.trim()}
            >
              <Image
                src="/assets/icons/send-icon.png"
                alt="Get Directions"
                width={20}
                height={20}
              />
            </button>
          </div>
        </form>

        {/* Recent Searches Dropdown */}
        {showRecentSearches && (
          <div className="absolute bottom-full mb-2 w-full bg-white rounded-lg shadow-xl">
            <div className="p-3">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Recent searches</h3>
              <ul className="space-y-1">
                {recentSearches.map((search, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                    onClick={() => handleSearchClick(search)}
                  >
                    <Image
                      src="/assets/icons/clock.png"
                      width={15}
                      height={15}
                      alt="clock icon"
                    />
                    <span className="text-sm text-gray-700">{search}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchOverlay;