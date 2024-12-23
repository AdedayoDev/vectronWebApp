import Image from "next/image";
import React from "react";
import { Button } from "@components/ui/button";

const UserOnboarding = () => {
  return (
    <main className="flex items-center justify-center w-full h-screen">
      <section className="w-1/2 hidden lg:block ">
        <Image
          src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734961047/vech4_wjjixn.png"
          alt="user-onboarding"
          width={1000}
          height={100}
        />
      </section>
      <section className="w-1/2 ">
        <div className="w-[373px] mx-auto space-y-10">
          <h2 className="flex flex-col items-center justify-center font-inter font-semibold text-5xl  text-[#181b1f] text-center">
            Do you have a vehicle?
          </h2>
          <div className="flex flex-col items-center justify-center space-y-10">
            <Button className="border-[#e3e9ee] w-[231px] bg-white border text-[#181b1f] uppercase  px-12 font-semibold font-inter text-base  hover:bg-slate-50">
              yes, i do
            </Button>
            <Button className="border-[#e3e9ee] w-[231px] bg-white border  text-[#181b1f] uppercase px-12 font-semibold font-inter text-base hover:bg-slate-50">
              no, i don&apos;t have
            </Button>{" "}
          </div>
          <hr  />
        </div>
      </section>
    </main>
  );
};

export default UserOnboarding;
