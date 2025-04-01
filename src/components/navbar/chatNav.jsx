"use client";
import React, { useState } from "react";
import Image from "next/image";
import PortalSwitcher from "./PortalSwitcher";
import PortalSidebar from "../../app/vehicle_management/portal/_component/PortalSidebar";
import Link from "next/link";
import { useAuthStore } from "@store/useStore";
import { ModeToggle } from "@components/Theme-provider/ModeToggle";
import { FiBell, FiMoon, FiInfo } from "react-icons/fi";
import NotificationBell from  "@components/navbar/notification";
import { Menu } from "lucide-react"; // Importing the Menu icon

export default function ChatNav() {
  const { user } = useAuthStore();
  const [activeSection, setActiveSection] = useState("vehicleDashboard"); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Sidebar open/close state

  return (
    <div className="w-full bg-white px-4 py-4 shadow-md">
      <div className="w-11/12 mx-auto">
        {/* Navbar Main Content */}
        <div className="flex w-full items-center justify-between space-x-4">
          {/* Left Section: Logo & Portal Switcher */}
          <div className="flex items-center space-x-4">
            <Image
              src="/assets/icons/Media.jpeg (1).png"
              width={50}
              height={50}
              alt="Chat Icon"
            />
            <PortalSwitcher />
          </div>

          {/* Right Section: Icons (hidden on mobile) */}
          <div className="hidden md:flex p-4 gap-4 justify-around">
            <NotificationBell />
            <ModeToggle />
            {/* <FiMoon size={22} className="cursor-pointer hover:text-gray-900 transition" /> */}
            {/* <FiInfo size={22} className="cursor-pointer hover:text-gray-900 transition" /> */}
            <Link href="/settings">
              <Image
                src={user?.profile_picture || "/assets/images/Avatar.png"}
                width={30}
                height={30}
                alt="User Avatar"
                className="rounded-full"
              />
            </Link>
          </div>

          {/* Hamburger Menu Button (visible only on mobile) */}
          {/* <button
            className="flex md:hidden p-2 bg-gray-200 rounded-lg hover:bg-gray-300 ml-auto"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={24} />
          </button> */}
        </div>

        {/* Sidebar Component (Mobile Only) */}
        {/* <PortalSidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
        /> */}
      </div>
    </div>
  );
}
