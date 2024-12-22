"use client";

import React from "react";
import Toggle from "@components/chatComp/Toggle";
import Image from "next/image";
export default function notificationFeed() {
  return (
    <div className="w-2/4 mx-auto">
      <div className="flex items-center gap-x-96 mb-10">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <div>
          <Toggle />
        </div>
      </div>
        <hr />
      <div className="alert mb-10">
        <h1 className="my-7 font-bold text-lg">Alert Preferences</h1>
        <div className="alert-content flex items-center mb-2 justify-between">
          <h1>Maintenance Alerts</h1>
          <input type="checkbox" />
        </div>
        <div className="alert-content flex items-center mb-2 justify-between">
          <h1>Diagnostic Alerts</h1>
          <input type="checkbox" />
        </div>
        <div className="alert-content flex items-center mb-2 justify-between">
          <h1>Location Tracking</h1>
          <input type="checkbox" />
        </div>
        <div className="alert-content flex items-center mb-2 justify-between">
          <h1>Expense Update</h1>
          <input type="checkbox" />
        </div>
      </div>
<hr />
      <div className="channel mb-10">
        <h1 className="my-7 font-bold text-lg">Notification Channels</h1>
        <div className="channel-content flex items-center mb-2 justify-between">
          <h1>Push Notifications</h1>
          <input type="checkbox" />
        </div>
        <div className="alert-content flex items-center mb-2 justify-between">
          <h1>Email Alerts</h1>
          <input type="checkbox" />
        </div>
        <div className="alert-content flex items-center mb-2 justify-between">
          <h1>Mentioned</h1>
          <input type="checkbox" />
        </div>
      </div>
<hr />
      <div className="synapse">
        <h1 className="my-7 font-bold text-lg">From Synapes</h1>
        <div className="synapse-content flex items-center mb-2 justify-between">
          <h1>New notifications</h1>
          <input type="checkbox" />
        </div>
        <div className="alert-content flex items-center mb-2 justify-between">
          <h1>Someone invite you to new chat</h1>
          <input type="checkbox" />
        </div>
        <div className="alert-content flex items-center mb-2 justify-between">
          <h1>Mentioned</h1>
          <input type="checkbox" />
        </div>
      </div>
      
      <div className="save-btn flex items-center my-16 gap-2">
        <button
          type="button"
          className="flex items-center gap-2 bg-blue-800 text-white rounded-full p-3"
        >
          Save changes
          <Image
            src="/assets/icons/check-circle.png"
            alt="icon"
            width={15}
            height={15}
          />
        </button>
        <button className="rounded-full border-4 border-solid border-purple-400 py-2 px-3">
          Cancel
        </button>
      </div>
    </div>
  );
}
