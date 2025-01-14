"use client";

import React, { useState } from "react";
import Image from "next/image";

interface SidebarProps {
  onSelect: (component: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleSelect = (item: string) => {
    setActiveItem(item);
    onSelect(item);
  };

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const style = {};
  return (
    <main className="w-[322px] ">
      <div>
        <h2 className="flex items-center font-inter text-base font-bold capitalize text-[#211f34]">
          <span>
            <Image
              alt="user-setting"
              src="/user-settings.png"
              width={60}
              height={60}
            />
          </span>
          <span>user settings</span>
        </h2>
      </div>
      <div className="">
        <ul className="space-y-4">
          <li
            onClick={() => handleSelect("Profile")}
            className={`w-[274px] flex items-center rounded py-2 px-1 border border-[#708090] ${
              activeItem === "Profile" ? "bg-[#1e3a8a] text-white" : "bg-white"
            }`}
          >
            <span>
              <Image
                alt="user-profile"
                src="/user-avatar.png"
                width={60}
                height={60}
              />
            </span>
            <span> Profile </span>
          </li>
          <li
            onClick={handleDropdown}
            className={`w-[274px] flex items-center rounded py-2 px-1 border border-[#708090] ${
              activeItem === "VehicleProfile"
                ? "bg-[#1e3a8a] text-white"
                : "bg-white"
            }`}
          >
            <span>
              <Image
                alt="vehicle-management"
                src="/carbon_vehicle-services.png"
                width={60}
                height={60}
              />
            </span>
            <span> Vehicle Management</span>
          </li>
          {showDropdown && (
            <ul>
              <li
                onClick={() => handleSelect("VehicleProfile")}
                className={`w-[274px] flex items-center rounded py-2 px-1 border border-[#708090] ${
                  activeItem === "VehicleProfile"
                    ? "bg-[#1e3a8a] text-white"
                    : "bg-white"
                }`}
              >
                <span>
                  <Image
                    alt="vehicle-profile"
                    src="/carbon_vehicle-services.png"
                    width={60}
                    height={60}
                  />
                </span>
               <span> Vehicle Profile </span>
              </li>
              <li
                onClick={() => handleSelect("VehicleManagement")}
                className={`w-[274px] flex items-center rounded py-2 px-1 border border-[#708090] ${
                  activeItem === "VehicleManagement"
                    ? "bg-[#1e3a8a] text-white"
                    : "bg-white"
                }`}
              >
                <span>
                  <Image
                    alt="vehicle-Management"
                    src="/"
                    width={60}
                    height={60}
                  />
                </span>
                <span>Vehicle Management</span>
              </li>
            </ul>
          )}
          <li
            onClick={() => handleSelect("History")}
            className={`w-[274px] flex items-center rounded py-2 px-1 border border-[#708090] ${
              activeItem === "History" ? "bg-[#1e3a8a] text-white" : "bg-white"
            }`}
          >
            <span>
              <Image alt="History" src="/clock.png" width={60} height={60} />
            </span>
            <span> History</span>
          </li>
          <li
            onClick={() => handleSelect("AiSetting")}
            className={`w-[274px] flex items-center rounded py-2 px-1 border border-[#708090] ${
              activeItem === "AiSetting"
                ? "bg-[#1e3a8a] text-white"
                : "bg-white"
            }`}
          >
            <span>
              <Image
                alt="ai-settings"
                src="/ai-settings.png"
                width={60}
                height={60}
              />
            </span>
          <span>  AI Setting</span>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Sidebar;
