"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";


const AddVehiclePrompt = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Would you like to add your vehicle information?
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Adding your vehicle information allows us to help you manage maintenance
        and provide timely service reminders.
      </p>
      <Link href="/vehicleprofile">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
          Add Vehicle Information
        </button>
      </Link>
    </div>
  );
};

export default AddVehiclePrompt;
