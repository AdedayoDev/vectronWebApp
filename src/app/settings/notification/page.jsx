"use client";

import { CheckSquare2 } from "lucide-react";
import React, { useState } from "react";
import { CldImage } from "next-cloudinary";
import SettingsSideBar from "../components/SettingsSideBar";

export default function Settings() {
  
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedSynapse, setSelectedSynapse] = useState("");

  const toggleNotifications = () => {
    setIsNotificationsEnabled((prev) => !prev);
  };

  const handleSelection = (section, option) => {
    if (section === "alert") setSelectedAlert(option);
    if (section === "channel") setSelectedChannel(option);
    if (section === "synapse") setSelectedSynapse(option);
  };
  return (
    <>
      <div className="mt-4">
        <div>
          {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && (
            <CldImage
              src="bg-img3_sjyfvr"
              alt="Background image"
              width={20}
              height={20}
              className="w-[95%] h-[50px] object-cover mt-11 mx-auto"
            />
          )}
        </div>
        <div className="block md:block lg:flex gap-[100px] w-[90%] relative -top-5 px-4 pt-11 bg-white rounded-sm shadow mx-auto ">
        <SettingsSideBar />
          <div className="lg:w-[60%] w-full">
            <div className="flex justify-between">
              <h1 className="text-3xl font-bold">Notifications</h1>
              <button
                onClick={toggleNotifications}
                className={`w-12 h-6 rounded-full ${
                  isNotificationsEnabled ? "bg-blue-600" : "bg-gray-300"
                } relative`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-white left-0 absolute top-0.5 transition-transform ${
                    isNotificationsEnabled ? "translate-x-6" : "translate-x-0.5"
                  }`}
                ></span>
              </button>
            </div>
            <br />
            <hr />

            {/* Alert Preferences Section */}
            <div className="alert mb-10">
              <h1 className="my-7 font-bold text-lg">Alert Preferences</h1>
              {[
                "Maintenance Alerts",
                "Diagnostic Alerts",
                "Location Tracking",
                "Expense Update",
              ].map((option) => (
                <div
                  key={option}
                  className="alert-content flex items-center mb-2 justify-between"
                >
                  <h1>{option}</h1>
                  <input
                    type="checkbox"
                    checked={selectedAlert === option}
                    onChange={() => handleSelection("alert", option)}
                  />
                </div>
              ))}
            </div>
            <hr />

            {/* Notification Channels Section */}
            <div className="channel mb-10">
              <h1 className="my-7 font-bold text-lg">Notification Channels</h1>
              {["Push Notifications", "Email Alerts", "Mentioned"].map(
                (option) => (
                  <div
                    key={option}
                    className="channel-content flex items-center mb-2 justify-between"
                  >
                    <h1>{option}</h1>
                    <input
                      type="checkbox"
                      checked={selectedChannel === option}
                      onChange={() => handleSelection("channel", option)}
                    />
                  </div>
                )
              )}
            </div>
            <hr />

            {/* From Synapse Section */}
            <div className="synapse">
              <h1 className="my-7 font-bold text-lg">From Synapse</h1>
              {[
                "New notifications",
                "Someone invite you to new chat",
                "Mentioned",
              ].map((option) => (
                <div
                  key={option}
                  className="synapse-content flex items-center mb-2 justify-between"
                >
                  <h1>{option}</h1>
                  <input
                    type="checkbox"
                    checked={selectedSynapse === option}
                    onChange={() => handleSelection("synapse", option)}
                  />
                </div>
              ))}
            </div>

            {/* Save and Cancel Buttons */}
            <div className="save-btn flex items-center my-16 gap-2">
              <button
                type="button"
                className="flex items-center gap-2 bg-blue-800 text-white rounded-full p-3"
              >
                Save changes
                <CheckSquare2 size={15} />
              </button>
              <button className="rounded-full border-4 border-solid border-purple-400 py-2 px-3">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
