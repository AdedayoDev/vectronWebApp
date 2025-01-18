"use client";
import Image from "next/image";
import SettingsSideBar from "../../settings/components/SettingsSideBar";

import { Home } from "lucide-react";
import Link from "next/link";

export default function Vehicle_Profile() {
  return (
    <>
      <section>
        <Image
          src="/assets/images/bg-img3.png"
          alt="Background image"
          width={20}
          height={20}
          className="w-[95%] h-[50px] object-cover mt-11 mx-auto"
        />
        <div className="block md:block lg:flex gap-[100px] w-[90%] relative -top-5 px-4 pt-11 bg-white rounded-sm shadow mx-auto ">
          <SettingsSideBar />
          <div className="w-full lg:mt-0 lg:h-[630px]">
            <div>
              <Link
                href="/vehicle_management"
                className="flex items-center gap-2 text-blue-500 mb-4"
              >
                <Home size={20} />
                <h1 className="text-base">Back to Vehicle Management</h1>
              </Link>
            </div>
            <h1 className="font-semibold text-2xl">Vehicle Profile</h1>
            <div className="border border-solid border-gray-400 lg:w-[580px] text-center px-11 py-12 mx-auto mt-32 lg:mt-20">
              <p>
                Lets help keep your vehicle in perfect condition, Set up your
                vehicle profile to track and get reminders regarding your
                vehicle(s)
              </p>
              <Link href='/vehicleprofile'>
              <div className="flex justify-center items-center gap-2 text-purple-800 mt-4 font-medium">
                <Image
                  src="/assets/icons/add-circle.svg"
                  alt="icon"
                  width={20}
                  height={20}
                />
                <p>Add Vehicle</p>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
