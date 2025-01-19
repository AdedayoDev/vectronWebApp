"use client";
import Image from "next/image";
import SettingsSideBar from "../settings/components/SettingsSideBar";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@lib/protectedapi";


export const dynamic = 'force-dynamic';

export default function Vehicle_Management() {
  
  const router =useRouter();
  const handleVehicleProfile = async () => {
    try {
      const response = await api.get("/vehicle/api/v1/vehicles");
      
      // Check if 'vehicles' is an array and contains at least one vehicle
      if (Array.isArray(response.data.vehicles) && response.data.vehicles.length > 0) {
        router.push("/vehicle_management/vehicle_profile_list");
      } else {
        router.push("/vehicle_management/add_vehicle_profile");
      }
    } catch (error) {
      console.error("Error fetching vehicle profile:", error);
      alert("Failed to fetch vehicle profiles. Please try again later.");
    }
  };

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
          <div className="w-full lg:mt-0 h-[570px] lg:h-[630px]">
            <div>
              <Link
                href="/settings"
                className="flex items-center gap-2 w-44 text-blue-500 mb-4"
              >
                <Home size={20} />
                <h1 className="text-sm">Back to home</h1>
              </Link>
            </div>
            <h1 className="text-xl font-semibold mb-7">Vehicle Management</h1>
            <div className="lg:w-[80%]">

                <div className="flex justify-between my-3 items-center cursor-pointer">
                  <div className="flex items-center gap-2" onClick={handleVehicleProfile}>
                    <Image
                      src="/assets/icons/vehicle-services.svg"
                      alt="Icon"
                      width={20}
                      height={20}
                    />
                    <p>Vehicle Profile</p>
                  </div>

                  <ChevronRight className="text-gray-400"/>
                </div>
                <div className="w-full h-[2px] bg-gray-300 mb-3" />
              <Link href="#">
                <div className="flex justify-between my-3 items-center">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/assets/icons/health.svg"
                      alt="Icon"
                      width={20}
                      height={20}
                    />
                    <p>Diagnostics</p>
                  </div>

                  <ChevronRight className="text-gray-400"/>
                </div>
                <div className="w-full h-[2px] bg-gray-300 mb-3" />
              </Link>

              <Link href="/route">
                <div className="flex justify-between my-3 items-center">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/assets/icons/map.svg"
                      alt="Icon"
                      width={15}
                      height={15}
                    />
                    <p>Route Navigation</p>
                  </div>

                  <ChevronRight  className="text-gray-400"/>
                </div>
                <div className="w-full h-[2px] bg-gray-300 mb-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
