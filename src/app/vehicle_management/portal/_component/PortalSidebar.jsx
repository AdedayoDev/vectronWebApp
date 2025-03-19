"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Truck, Car, Wrench, DollarSign, Cpu } from "lucide-react";
import { useAuthStore } from "@store/useStore";
import { FiBell, FiMoon, FiInfo } from "react-icons/fi";

export default function PortalSidebar({ activeSection, setActiveSection, isMenuOpen, setIsMenuOpen }) {
  const { user } = useAuthStore();

  const menuItems = [
    { name: "Vehicle Dashboard", icon: <Car />, section: "vehicleDashboard" },
    { name: "Vehicle Inventory", icon: <Truck />, section: "inventory" },
    { name: "Maintenance", icon: <Wrench />, section: "maintenance", comingSoon: true },
    { name: "AI Troubleshooting", icon: <Cpu />, section: "ai-support", comingSoon: true },
    { name: "Financial Insights", icon: <DollarSign />, section: "financials", comingSoon: true },
  ];

  return (
    <>
      {/* Sidebar (Mobile Only) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 z-50 bg-white shadow-lg transform transition-transform duration-300 md:hidden 
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Portal Navigation</h2>
          <button onClick={() => setIsMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li
                key={item.section}
                className={`flex items-center justify-between gap-5 p-2 rounded-lg cursor-pointer transition-all ${
                  activeSection === item.section
                    ? "bg-blue-700 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => {
                  setActiveSection(item.section);
                  setIsMenuOpen(false);
                }}
              >
                {/* Icon + Name */}
                <div className="flex items-center space-x-3">
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </div>

                {/* Coming Soon Tag */}
                {item.comingSoon && (
                  <span className="text-xs block text-yellow-600 font-semibold">
                    Coming Soon
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t flex flex-col">
          {/* Settings Icons */}
          <div className="flex items-center justify-around">
            <FiBell size={22} className="cursor-pointer hover:text-gray-900 transition" />
            <FiMoon size={22} className="cursor-pointer hover:text-gray-900 transition" />
            <FiInfo size={22} className="cursor-pointer hover:text-gray-900 transition" />
          </div>

          {/* User Profile */}
          <div className="mt-4 flex items-center">
            <Link href="/settings">
              <Image
                src={user?.profile_picture || "/assets/images/Avatar.png"}
                width={40}
                height={40}
                alt="User Avatar"
                className="rounded-full border"
              />
            </Link>
            <div className="ml-3">
              <p className="text-sm font-semibold">{user?.name || "Guest User"}</p>
              <p className="text-xs text-gray-500">View Profile</p>
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div className="p-4 mt-auto">
          <button
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            onClick={() => alert("Logging out...")}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
