import Image from "next/image";
import React from "react";
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
  } from "@components/ui/form";
import { VehicleForm } from "@components/AceternityForm/VehicleForm";

const VehicleProfile = () => {
  return (
    <main className="w-full h-screen flex items-center justify-center ">
      <section className="w-1/2 hidden lg:block">
        <Image
          src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734961047/vech4_wjjixn.png"
          alt=""
          width={1000}
          height={50}
        />
      </section>
      <section className="w-full lg:w-1/2">
       <VehicleForm/>
      </section>
    </main>
  );
};

export default VehicleProfile;
