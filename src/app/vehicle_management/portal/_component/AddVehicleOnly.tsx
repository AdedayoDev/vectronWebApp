"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";


interface AddVehicleOnlyProps {}

const AddVehicleOnly: React.FC<AddVehicleOnlyProps> = () => {
  return (
    <section>
      <Image
        src="/assets/images/bg-img3.png"
        alt="Background image"
        width={20}
        height={20}
        className="w-full h-[50px] object-cover mt-11 mx-auto"
      />
      <div className="w-full flex justify-center items-center px-4 pt-11 bg-white rounded-sm shadow mx-auto">
        <div className="border border-solid border-gray-400 lg:w-[580px] text-center px-11 py-12 mx-auto mt-32 lg:mt-20">
          <p>
            Let's help keep your vehicle in perfect condition. Set up your
            vehicle profile to track and get reminders regarding your vehicle(s).
          </p>
          <Link href="/vehicleprofile">
            <div className="flex justify-center items-center gap-2 text-purple-800 mt-4 font-medium cursor-pointer">
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
    </section>
  );
};

export default AddVehicleOnly;
