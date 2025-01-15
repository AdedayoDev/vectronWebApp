// import { Button } from "@components/ui/button";
// import Image from "next/image";
// import React from "react";

// const UserOnboarding = () => {
//   return (
//     <main className="w-full h-screen flex items-center justify-center">
//       <section className="w-1/2 hidden lg:block">
//         <Image
//           src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734961047/vech4_wjjixn.png"
//           alt=""
//           width={1000}
//           height={50}
//         />
//       </section>
//       <section className="w-full lg:w-1/2">
//         {" "}
//         <div className="flex flex-col items-center justify-center w-[323px] h-screen mx-auto space-y-8">
//           <h2 className="font-semibold text-4xl  font-inter text-[#181b1f] text-center">Do you have a vehicle?</h2>
//           <Button className="w-[231px] border border-[#e3e9ee] hover:bg-slate-50 uppercase ">yes, i do.</Button>
//           <Button className="w-[231px] border border-[#e3e9ee] hover:bg-slate-50  uppercase">no, i don't have</Button>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default UserOnboarding;

"use client";

import { Button } from "@components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import api from '../../lib/protectedapi';
import { useAuthStore } from '@store/useStore';
import { useRouter } from 'next/navigation';

const UserOnboarding = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateVehicleOwnerStatus } = useAuthStore();

  const handleVehicleOwnerStatus = async (status: boolean) => {
    setIsLoading(true);
    try {
      const response = await api.post('/api/v1/auth/account/vehicle-owner-status', {
        is_vehicle_owner: status
      });

      if (response) {
        // Update the local storage state
        updateVehicleOwnerStatus(status);
        // Redirect to next page
        router.push('/dashboard'); // or wherever you want to redirect
      }
    } catch (error) {
      console.error("Error updating vehicle owner status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <section className="w-1/2 hidden lg:block">
        <Image
          src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734961047/vech4_wjjixn.png"
          alt=""
          width={1000}
          height={50}
        />
      </section>
      <section className="w-full lg:w-1/2">
        <div className="flex flex-col items-center justify-center w-[323px] h-screen mx-auto space-y-8">
          <h2 className="font-semibold text-4xl font-inter text-[#181b1f] text-center">
            Do you have a vehicle?
          </h2>
          <Button
            onClick={() => handleVehicleOwnerStatus(true)}
            disabled={isLoading}
            className="w-[231px] border border-[#e3e9ee] hover:bg-slate-50 uppercase"
          >
            {isLoading ? "Updating..." : "yes, i do."}
          </Button>
          <Button
            onClick={() => handleVehicleOwnerStatus(false)}
            disabled={isLoading}
            className="w-[231px] border border-[#e3e9ee] hover:bg-slate-50 uppercase"
          >
            {isLoading ? "Updating..." : "no, i don't have"}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default UserOnboarding;