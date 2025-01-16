"use client";

import Image from "next/image";
import { useRouter } from 'next/navigation';

function AddVehicleButton() {
  const router = useRouter();

  const handleNewVehicle = () => {
    // Force a hard navigation to the chat detail page
    window.location.href = '/vehicleprofile';
  };

  return (
<div 
  onClick={handleNewVehicle}
  className="flex items-center w-full px-4 py-3 rounded-lg space-x-2 hover:cursor-pointer bg-[#4052B5] hover:bg-[#354296] text-white font-medium shadow-sm transition-colors"
>

      <div className="relative w-5 h-5">
        <Image
          src="/assets/icons/chat-add2.png"
          alt="chat-add"
          fill
          className="object-cover"
        />
      </div>
      <p className="text-white">Add Vehicle</p>
    </div>
  );
}

export default AddVehicleButton;