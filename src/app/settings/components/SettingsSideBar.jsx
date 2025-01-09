"use client";
import { Car, LucideSettings, Timer, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function SettingsSideBar() {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <>
      {/* Mobile  */}
      <div className="flex cursor-pointer items-center gap-2 mb-5 sm:hidden" onClick={()=>{setShowSideBar(prev=>!prev)}}>
        <Image
          src="/assets/icons/user-settings.png"
          alt="icon"
          width={15}
          height={15}
        />
        <h1 className="font-bold text-base">User Settings</h1>
      </div>
      {showSideBar && (
        <section className="block sm:hidden absolute">
          <Link href="/settings/profile">
            <div className="flex items-center gap-2 border mb-3 rounded p-2 w-[274px]">
              <User size={20} />
              <p>Profile</p>
            </div>
          </Link>

          <Link href="/settings/vehicle_management">
            <div className="flex items-center gap-2 mb-3 border rounded p-2 w-[274px]">
              <Car size={20} />
              <p>Vehhicle management</p>
            </div>
          </Link>

          <Link href="/settings/history">
            <div className="flex items-center gap-2 border mb-3 rounded p-2 w-[274px]">
              <Timer size={20} />
              <p>History</p>
            </div>
          </Link>

          <Link href="/settings">
            <div className="flex items-center gap-2 border rounded p-2 w-[274px]">
              <LucideSettings size={20} />
              <p>AI Settings</p>
            </div>
          </Link>
        </section>
      )}

      {/* Desktop  */}
      <section className="hidden sm:block">
        <div className="flex items-center gap-2 mb-5">
          <Image
            src="/assets/icons/user-settings.png"
            alt="icon"
            width={15}
            height={15}
          />
          <h1 className="font-bold text-base">User Settings</h1>
        </div>
        <Link href="/settings/profile">
          <div className="flex items-center gap-2 border mb-3 rounded p-2 w-[274px]">
            <User size={20} />
            <p>Profile</p>
          </div>
        </Link>

        <Link href="/settings/vehicle_management">
          <div className="flex items-center gap-2 mb-3 border rounded p-2 w-[274px]">
            <Car size={20} />
            <p>Vehhicle management</p>
          </div>
        </Link>

        <Link href="/settings/history">
          <div className="flex items-center gap-2 border mb-3 rounded p-2 w-[274px]">
            <Timer size={20} />
            <p>History</p>
          </div>
        </Link>

        <Link href="/settings">
          <div className="flex items-center gap-2 border rounded p-2 w-[274px]">
            <LucideSettings size={20} />
            <p>AI Settings</p>
          </div>
        </Link>
      </section>
    </>
  );
}
