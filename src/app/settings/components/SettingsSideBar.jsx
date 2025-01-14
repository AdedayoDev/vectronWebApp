"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useAuthStore } from "@store/useStore";
import { handleLogout } from '../../../lib/utils';

export default function SettingsSideBar() {
  const [showSideBar, setShowSideBar] = useState(false);
  const router = useRouter(); 
  const { user } = useAuthStore();

  const isActive = (path) => router.pathname === path;

  return (
    <>
      {/* Mobile */}
      <div
        className="flex absolute -top-[57px] -left-2 z-20 lg:hidden md:flex cursor-pointer items-center gap-2 mb-5"
        onClick={() => {
          setShowSideBar((prev) => !prev);
        }}
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
            href="/user_profile"
            iconSrc="/assets/icons/user-octagon.svg"
            label="Profile"
            isActive={isActive("/user_profile")}
            onClick={()=>{setShowSideBar(false)}}
          />
          <SidebarLink
            href="/vehicle_management"
            iconSrc="/assets/icons/vehicle-services.svg"
            label="Vehicle Management"
            isActive={isActive("/settings/vehicle_management")}
            onClick={()=>{setShowSideBar(false)}}
          />
          <SidebarLink
            href="/history"
            iconSrc="/assets/icons/history.svg"
            label="History"
            isActive={isActive("/settings/history")}
            onClick={()=>{setShowSideBar(false)}}
          />
          <SidebarLink
            href="/settings"
            iconSrc="/assets/icons/settings-ai.svg"
            label="AI Settings"
            isActive={isActive("/settings")}
            onClick={()=>{setShowSideBar(false)}}
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
              <p>{user.username || "John Doe"}</p>
            </div>
            <div 
              onClick={handleLogout}
              className="cursor-pointer"
            >
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
          href="/user_profile"
          iconSrc="/assets/icons/user-octagon.svg"
          label="Profile"
          isActive={isActive("/user_profile")}
        />
        <SidebarLink
          href="/vehicle_management"
          iconSrc="/assets/icons/vehicle-services.svg"
          label="Vehicle Management"
          isActive={isActive("/settings/vehicle_management")}
        />
        <SidebarLink
          href="/history"
          iconSrc="/assets/icons/history.svg"
          label="History"
          isActive={isActive("/settings/history")}
        />
        <SidebarLink
          href="/settings"
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
            <p>{user.username || "John Doe"}</p>
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
const SidebarLink = ({ href, iconSrc, label, isActive }) => {
  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-2 border rounded p-2 w-[274px] mb-3 ${
          isActive ? "bg-blue-600 text-white" : "bg-white text-black"
        }`}
      >
        <Image
          src={iconSrc}
          alt={`${label} icon`}
          width={20}
          height={20}
          className={`${isActive ? "text-white" : "text-black"}`}
        />
        <p>{label}</p>
      </div>
    </Link>
  );
};
