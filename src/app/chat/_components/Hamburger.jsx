"use client";

import { useState } from "react";
import BarContent from "./BarContent";

function Hamburger() {
  const [active, setActive] = useState(false);
  return (
    <>
      <button
        className={`hamburg z-40 lg:hidden ${active ? "active" : ""}`}
        onClick={() => setActive(!active)}
      >
        <span className="hamburg-top"></span>
        <span className="hamburg-mid"></span>
        <span className="hamburg-bot"></span>
      </button>
      {active && (
        <div className="h-screen bg-black bg-opacity-80 w-full absolute top-10 left-0 z-10">
          <BarContent />
        </div>
      )}
    </>
  );
}

export default Hamburger;
