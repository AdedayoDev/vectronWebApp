"use client";
import Image from "next/image";
import SettingsSideBar from "../../settings/components/SettingsSideBar";
import Link from "next/link";
import { Home } from "lucide-react";
import api from "../../../lib/protectedapi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Vehicle_Profile_List() {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
const router = useRouter()
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await api.get("/vehicle/api/v1/vehicles", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (Array.isArray(response.data.vehicles) && response.data.vehicles.length > 0) {
          setVehicles(response.data.vehicles);
        } else {
          setVehicles([]);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setError("Unable to fetch vehicles. Please try again later.");
      }
    };

    fetchVehicles();
  }, []);


    const goToVehicleProfile = (vehicle_id) => {
      router.push(`/vehicle_management/vehicle_profile?id=${vehicle_id}`);
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
            <h1 className="text-xl font-normal mb-7">
              Your Vehicle Profiles
            </h1>
            <div className="lg:w-[80%]">
<div className="space-y-4"> {/* Added spacing between vehicles */}
  {Array.isArray(vehicles) && vehicles.length > 0 ? (
    vehicles.map((vehicle) => (
      <div
        key={vehicle.id}
        className="flex gap-3 items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
        onClick={() => goToVehicleProfile(vehicle.id)}
      >
        <Image
          src="/assets/icons/black_car.png"
          alt={vehicle.make || 'Vehicle'}
          width={50}
          height={50}
        />
        <p className="font-semibold text-xl text-blue-600">
          {vehicle.make || 'Unknown'}
        </p>
      </div>
    ))
  ) : (
    <p className="text-lg text-gray-600">
      No vehicles available at the moment.
    </p>
  )}
</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
