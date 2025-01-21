import Image from "next/image";
import React from "react";

import VehicleForm  from "@components/AceternityForm/VehicleForm";

const VehicleProfile = () => {
  return (
    <main className="w-full h-screen flex items-center justify-center ">
 
      <section
        className="hidden lg:block w-[600px] rounded-xl mx-auto h-[690px] relative"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dpmy3egg2/image/upload/v1734961047/vech4_wjjixn.png')`,
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
          }}
        >
          <div className=" p-10 flex  flex-col justify-between items-start w-full h-full">
            <div>
              <Image
                src="/assets/icons/Media.jpeg (1).png"
                alt=""
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </div>
            <div className="flex items-center justify-center h-[690px] w-full">
              <p className="font-inter font-medium text-center text-4xl text-[#fafbfb]">
              Would you like to set up your vehicle profile now or later?
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full lg:w-1/2">
        <VehicleForm />
      </section>
    </main>
  );
};

export default VehicleProfile;
