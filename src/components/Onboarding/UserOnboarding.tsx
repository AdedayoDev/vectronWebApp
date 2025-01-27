"use client";

import { Button } from "@components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import api from "../../lib/protectedapi";
import { useAuthStore } from "@store/useStore";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { BiChevronRight } from "react-icons/bi";

const UserOnboarding = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<"vehicle" | "pricing" | null>(
    null
  );

  const { updateVehicleOwnerStatus, user } = useAuthStore();

  const handleVehicleOwnerStatus = async (status: boolean) => {
    setIsLoading(true);
    try {
      const token = useAuthStore.getState().token;
      if (!token) {
        console.error("Authorization token is missing. Redirecting to login.");
        router.push("/auth/log-in");
        return;
      }
      const response = await api.post(
        "/api/v1/auth/account/vehicle-owner-status",
        {
          is_vehicle_owner: status,
        }
      );

      if (response) {
        // Update local storage
        updateVehicleOwnerStatus(status);

        if (status) {
          router.push("/vehicleprofile");
        } else {
          router.push("/chat");
        }
      }
    } catch (error) {
      console.error("Error updating vehicle owner status:", error);
    } finally {
      setIsLoading(false);
      setLoadingType(null);
    }
  };

  return (
    <main className="w-10/12 mx-auto h-screen flex items-center justify-center">
      {/* Left Section for Desktop */}
      <section
        className="hidden lg:block w-[600px] rounded-xl mx-auto h-[730px] relative"
        style={{
          backgroundImage: `url('/assets/images/vectron-car.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="absolute inset-0 rounded-xl px-5"
          style={{
            backgroundColor: "#42307D",
            opacity: 0.8,
            zIndex: 1,
          }}
        >
          <div className="p-10 w-full h-full">
            <div>
              <Image
                src="/assets/icons/Media.jpeg (1).png"
                alt="Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </div>
            <div className="flex items-center justify-center h-[690px] w-full">
              <p className="font-inter font-medium text-4xl text-[#fafbfb]">
                Almost there to unlocking your In car AI!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Right Section */}
      <section className="w-full md:w-1/2 h-full">
        <div className="flex flex-col items-center justify-center h-screen ">
          <div className="flex flex-col w-auto space-y-8">
            <h2 className="font-600 font-inter text-base text-[#c3cad7] ">
              Step 1 of 2
            </h2>

            <div className="flex flex-col items-center justify-center text-center h-full mx-auto space-y-8">
              <h2 className="font-semibold text-5xl font-inter text-[#181b1f] text-center">
                Do you have a vehicle?
              </h2>

              <Button
                onClick={() => handleVehicleOwnerStatus(false)}
                disabled={isLoading}
                className="w-[426px] h-[108px] border border-[#e3e9ee] text-[#333] hover:text-black bg-white flex justify-between py-12 rounded-lg hover:bg-[#F5F9FF] hover:border hover:border-[#3556B3] drop-shadow-xl relative group"
              >
                {isLoading && loadingType === "pricing" ? (
                  <BeatLoader size={8} color="#7f56d9" />
                ) : (
                  <>
                    <div className="flex items-center  space-x-4 w-full">
                      <span className="p-4">
                        <Image
                          src="/assets/icons/Polygon 2.png"
                          alt="No"
                          width={70}
                          height={70}
                        />
                      </span>
                      <div className="flex flex-col items-start">
                        <h2 className="font-inter font-medium">No, I Don't</h2>
                        <p className="font-normal font-inter text-[#8692a6] w-10/12 whitespace-normal text-start overflow-visible">
                          Own or belong to a company, this is for you.
                        </p>
                      </div>
                    </div>
                    <BiChevronRight className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#3556B3] text-xl opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-transform duration-300" />
                  </>
                )}
              </Button>

              {/* Button for "Yes, I Do" */}
              <Button
                onClick={() => handleVehicleOwnerStatus(true)}
                disabled={isLoading}
                className="w-[426px] h-[108px] border border-[#e3e9ee] text-[#333] hover:text-black hover:bg-[#F5F9FF] bg-white flex justify-between py-12 rounded-lg hover:border hover:border-[#3556B3] drop-shadow-xl relative group"
              >
                {isLoading && loadingType === "vehicle" ? (
                  <BeatLoader size={8} color="#7f56d9" />
                ) : (
                  <>
                    <div className="flex items-center space-x-4 w-full">
                      <span className="p-4">
                        <Image
                          src="/assets/icons/Polygon 1.png"
                          alt="Yes"
                          width={70}
                          height={70}
                        />
                      </span>
                      <div className="flex flex-col items-start">
                        <h2 className="font-inter font-medium">Yes, I Do</h2>
                        <p className="font-normal font-inter text-[#8692a6] w-10/12 whitespace-normal text-start overflow-visible">
                          Own or belong to a company, this is for you.
                        </p>
                      </div>
                    </div>
                    <BiChevronRight className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#3556B3] text-xl opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-transform duration-300" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserOnboarding;
