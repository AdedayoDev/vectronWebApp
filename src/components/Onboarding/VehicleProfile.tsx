import Image from "next/image";
import React from "react";

import VehicleForm  from "@components/AceternityForm/VehicleForm";

const VehicleProfile = () => {
  return (
    <main className="w-full h-screen flex items-center justify-center ">
 
      <section
        className="hidden lg:block w-1/2 h-[1000px] relative"
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
          <div className=" p-10 flex  flex-col justify-between items-start w-full h-full">
            <div>
              <Image
                src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734698485/Content_coc8x0.png"
                alt=""
                width={48}
                height={48}
                className="w-12 h-12"
              />
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
