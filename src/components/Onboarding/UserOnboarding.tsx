import { Button } from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserOnboarding = () => {
  return (
    <main className="w-full h-screen flex items-center justify-center">
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
        {" "}
        <div className="flex flex-col items-center justify-center w-[323px] h-screen mx-auto space-y-8">
          <h2 className="font-semibold text-4xl  font-inter text-[#181b1f] text-center">
            Do you have a vehicle?
          </h2>
          <Link href='/vehicleprofile'>
          <Button className="w-[231px] border border-[#e3e9ee] bg-slate-50 hover:bg-slate-100 text-[#333] uppercase ">
            yes, i do.
          </Button>
          </Link>
          <Link href="/pricing">
          <Button className="w-[231px] border border-[#e3e9ee] bg-slate-50 hover:bg-slate-100 text-[#333]  uppercase">
            no, i don't have
          </Button>
          </Link> 
        </div>
      </section>
    </main>
  );
};

export default UserOnboarding;
