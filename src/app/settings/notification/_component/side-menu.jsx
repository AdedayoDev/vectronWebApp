"use client";
import { useState } from "react";
import {
  Edit,
  Lock,
  Bell,
  FileText,
  Activity,
  Grid,
  Users,
  Trash,
  MenuIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SideMenu() {
  const router = useRouter();
  const [active, setActive] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = (name) => {
    setActive(name);
    const routes = {
      "Edit profile": "/settings/edit-profile",
      Password: "/settings/password",
      Notifications: "/settings/notification",
      "Chat export": "/settings/chat-export",
      Sessions: "/settings/sessions",
      Applications: "/settings/applications",
      Teams: "/settings/teams",
      "Delete account": "/settings/deleteaccount",
    };

    if (routes[name]) {
      router.push(routes[name]);
    }
  };

  const buttons = [
    { name: "Edit profile", icon: <Edit /> },
    { name: "Password", icon: <Lock /> },
    { name: "Notifications", icon: <Bell /> },
    { name: "Chat export", icon: <FileText /> },
    { name: "Sessions", icon: <Activity /> },
    { name: "Applications", icon: <Grid /> },
    { name: "Teams", icon: <Users /> },
  ];

  return (
    <>
      {/* Mobile view */}
      <div className="sm:flex lg:hidden">
        <MenuIcon onClick={() => setShowMenu((prev) => !prev)} />
      </div>

      <div>
        {showMenu && (
          <div className="absolute bg-white lg:hidden top-24 left-3 p-7 z-10">
            {buttons.map(({ name, icon }) => (
              <button
                key={name}
                onClick={() => handleClick(name)}
                className={`flex gap-2 items-center border lg:hidden rounded-full mb-3 shadow-md w-56 py-2 pl-4 ${
                  active === name
                    ? "border-black text-black font-bold"
                    : "text-gray-400 border-gray-200"
                }`}
              >
                <span
                  className={`icon ${
                    active === name ? "text-black font-bold" : "text-gray-400"
                  }`}
                >
                  {icon}
                </span>
                <span>{name}</span>
              </button>
            ))}
            <hr className="border-1 border-solid w-full my-10" />
            <button
              onClick={() => handleClick("Delete account")}
              className={`flex gap-2 items-center border rounded-full mb-3 shadow-md w-56 py-2 pl-4 text-red-500 ${
                active === "Delete account"
                  ? "border-black text-black font-bold"
                  : ""
              }`}
            >
              <span
                className={`icon ${
                  active === "Delete account"
                    ? "text-black font-bold"
                    : "text-red-500"
                }`}
              >
                <Trash />
              </span>
              <span>Delete account</span>
            </button>
          </div>
        )}
      </div>

      {/* Desktop view */}
      <div className="ml-5 hidden sm:block">
        {buttons.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => handleClick(name)}
            className={`flex gap-2 items-center border rounded-full mb-3 shadow-md sm:w-56 py-2 pl-4 ${
              active === name
                ? "border-black text-black font-bold"
                : "text-gray-400 border-gray-200"
            }`}
          >
            <span
              className={`icon ${
                active === name ? "text-black font-bold" : "text-gray-400"
              }`}
            >
              {icon}
            </span>
            <span>{name}</span>
          </button>
        ))}
        <hr className="border-1 border-solid w-full my-10" />
        <button
          onClick={() => handleClick("Delete account")}
          className={`flex gap-2 items-center border rounded-full mb-3 shadow-md w-56 py-2 pl-4 text-red-500 ${
            active === "Delete account"
              ? "border-black text-black font-bold"
              : ""
          }`}
        >
          <span
            className={`icon ${
              active === "Delete account"
                ? "text-black font-bold"
                : "text-red-500"
            }`}
          >
            <Trash />
          </span>
          <span className={active === "Delete account" ? "text-black" : ""}>
            Delete account
          </span>
        </button>
      </div>
    </>
  );
}
