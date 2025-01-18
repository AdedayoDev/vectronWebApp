"use client";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import { useAuthStore } from "@store/useStore";
import { handleLogout } from "../../../lib/utils";
import api from "@lib/protectedapi";

export const dynamic = "force-dynamic";

export default function SettingsSideBar() {
  const [showSideBar, setShowSideBar] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthStore();

  const isActive = (path) => pathname === path;

  const handleVehicleProfile = async () => {
    try {
      const response = await api.get("/vehicle/api/v1/vehicles");
      
      // Check if 'vehicles' is an array and contains at least one vehicle
      if (Array.isArray(response.data.vehicles) && response.data.vehicles.length > 0) {
        router.push("/vehicle_management/vehicle_profile_list");
      } else {
        router.push("/vehicleprofile");
      }
    } catch (error) {
      console.error("Error fetching vehicle profile:", error);
      alert("Failed to fetch vehicle profiles. Please try again later.");
    }
  };
  
  return (
    <>
      {/* Mobile */}
      <div
        className="flex absolute -top-[57px] z-50 -left-2 lg:hidden md:flex cursor-pointer items-center gap-2 mb-5"
        onClick={() => setShowSideBar((prev) => !prev)}
      >
        <Image
          src="/assets/icons/user-settings.png"
          alt="icon"
          width={15}
          height={15}
        />
        <h1 className="font-bold text-base">User Settings</h1>
      </div>
      {showSideBar && (
        <section className="block lg:hidden absolute -top-8 -left-7 px-7 py-11 shadow-lg z-30 bg-white h-screen">
          <SidebarLink
            iconSrc="/assets/icons/user-octagon.svg"
            label="Profile"
            isActive={isActive("/user_profile")}
            onClick={() => {
              router.push("/user_profile");
              setShowSideBar(false);
            }}
          />
          <SidebarLink
            iconSrc="/assets/icons/vehicle-services.svg"
            label="Vehicle Management"
            isActive={isActive("/vehicle_management")}
            onClick={() => {
              setShowSideBar(false);
              handleVehicleProfile();
            }}
          />
          <SidebarLink
            iconSrc="/assets/icons/history.svg"
            label="History"
            isActive={isActive("/history")}
            onClick={() => {
              router.push("/history");
              setShowSideBar(false);
            }}
          />
          <SidebarLink
            iconSrc="/assets/icons/settings-ai.svg"
            label="AI Settings"
            isActive={isActive("/settings")}
            onClick={() => {
              router.push("/settings");
              setShowSideBar(false);
            }}
          />
          <div className="flex rounded-full shadow-lg p-2 items-center justify-between mt-64 cursor-pointer">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/icons/avatar.png"
                alt="user"
                width={25}
                height={20}
                className="rounded-full"
              />
              <p>{user?.username || "John Doe"}</p>
            </div>
            <div onClick={handleLogout} className="cursor-pointer">
              <Image
                src="/assets/icons/logout-icon.svg"
                alt="Logout"
                width={20}
                height={20}
                className="rounded-full"
              />
            </div>
          </div>
        </section>
      )}

      {/* Desktop */}
      <section className="hidden lg:block">
        <div className="flex items-center gap-2 mb-5 cursor-pointer">
          <Image
            src="/assets/icons/user-settings.png"
            alt="icon"
            width={15}
            height={15}
          />
          <h1 className="font-bold text-base">User Settings</h1>
        </div>
        <SidebarLink
          onClick={() => router.push("/user_profile")}
          iconSrc="/assets/icons/user-octagon.svg"
          label="Profile"
          isActive={isActive("/user_profile")}
        />
        <SidebarLink
          iconSrc="/assets/icons/vehicle-services.svg"
          label="Vehicle Management"
          isActive={isActive("/settings/vehicle_management")}
          onClick={handleVehicleProfile}
        />
        <SidebarLink
          onClick={() => router.push("/history")}
          iconSrc="/assets/icons/history.svg"
          label="History"
          isActive={isActive("/history")}
        />
        <SidebarLink
          onClick={() => router.push("/settings")}
          iconSrc="/assets/icons/settings-ai.svg"
          label="AI Settings"
          isActive={isActive("/settings")}
        />
        <div className="flex rounded-full shadow-lg p-2 items-center justify-between mt-48 cursor-pointer">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/icons/avatar.png"
              alt="user"
              width={25}
              height={20}
              className="rounded-full"
            />
            <p>{user?.username || "John Doe"}</p>
          </div>
          <Image
            src="/assets/icons/logout-icon.svg"
            alt="icon"
            width={20}
            height={20}
            className="rounded-full"
          />
        </div>
      </section>
    </>
  );
}

// SidebarLink Component
const SidebarLink = ({ iconSrc, label, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 border rounded p-2 w-[274px] mb-3 cursor-pointer ${
        isActive ? "bg-blue-600 text-white" : "bg-white text-black"
      }`}
    >
      <Image
        src={iconSrc}
        alt={`${label} icon`}
        width={15}
        height={15}
        className="text-current"
      />
      <p>{label}</p>
    </div>
  );
};
