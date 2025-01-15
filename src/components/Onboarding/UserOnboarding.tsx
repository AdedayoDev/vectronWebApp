"use client";

import { Button } from "@components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import api from "../../lib/protectedapi";
import { useAuthStore } from "@store/useStore";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";

const UserOnboarding = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<"vehicle" | "pricing" | null>(
    null
  );

  const { updateVehicleOwnerStatus } = useAuthStore();

  const handleVehicleOwnerStatus = async (status: boolean) => {
    setIsLoading(true);
    setLoadingType(status ? "vehicle" : "pricing");
  
    try {
      const token = useAuthStore.getState().token;
  
      
      if (!token) {
        console.error("Authorization token is missing. Redirecting to login.");
        router.push("/auth/log-in");
        return;
      }
  
      const response = await fetch(
        "https://api-staging.vechtron.com/auth/api/v1/auth/account/vehicle-owner-status",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_vehicle_owner: status }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      updateVehicleOwnerStatus(status);
  
      
      router.push(status ? "/vehicleprofile" : "/pricing");
    } catch (error) {
      console.error("Error updating vehicle owner status:", error);
    } finally {
      setIsLoading(false);
      setLoadingType(null);
    }
  };
  


  return (
    <main className="w-full h-screen flex items-center justify-center">
      {/* Left Section for Desktop */}
      <section
        className="hidden lg:block w-1/2 h-screen relative"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dpmy3egg2/image/upload/v1734961047/vech4_wjjixn.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#42307D",
            opacity: 0.8,
          }}
        >
          <div className="p-10 flex flex-col justify-between items-start w-full h-full">
            <div>
              <Image
                src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734698485/Content_coc8x0.png"
                alt="Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Right Section */}
      <section className="w-full lg:w-1/2">
        <div className="flex flex-col items-center justify-center w-[323px] h-screen mx-auto space-y-8">
          <h2 className="font-semibold text-4xl font-inter text-[#181b1f] text-center">
            Do you have a vehicle?
          </h2>
          <Button
            onClick={() => handleVehicleOwnerStatus(true)}
            disabled={isLoading}
            className="w-[231px] border border-[#e3e9ee] text-[#333] hover:text-white bg-slate-50 uppercase flex items-center justify-center"
          >
            {isLoading && loadingType === "vehicle" ? (
              <BeatLoader size={8} color="#7f56d9" />
            ) : (
              "yes, i do."
            )}
          </Button>
          <Button
            onClick={() => handleVehicleOwnerStatus(false)}
            disabled={isLoading}
            className="w-[231px] border border-[#e3e9ee] text-[#333] hover:text-white bg-slate-50 uppercase flex items-center justify-center"
          >
            {isLoading && loadingType === "pricing" ? (
              <BeatLoader size={8} color="#7f56d9" />
            ) : (
              "no, i don't have"
            )}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default UserOnboarding;
