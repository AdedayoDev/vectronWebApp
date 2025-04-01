"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";

const WelcomeToVechtron = () => {
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-11/12 md:w-10/12 mx-auto space-y-6">
        <div>
          <Image
            src="/assets/icons/Media.jpeg (1).png"
            alt="Vechtron Logo"
            width={40}
            height={40}
            priority
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-inter font-bold text-4xl md:text-5xl text-[#101828]">
            Welcome to Vechtron
          </h1>
          <p className="text-[#667085] font-inter font-normal text-xl md:text-2xl">
            Start your AI-powered Drive Today!
          </p>
        </div>
        <div className="space-y-6 items-center justify-center">
          <Button
            onClick={() => handleClick("/auth/log-in")}
            className="bg-[#fbfdff] border border-[#3b82f6] w-full md:w-9/12 h-[44px] rounded-full text-inter font-bold text-[#1e3a8a] hover:bg-[#e7edf3] text-base transition-colors"
          >
            Log in to your Vechtron Account
          </Button>

          <Button
            onClick={() => handleClick("/auth/sign-up")}
            className="bg-[#3556B3] w-full md:w-9/12 mx-auto h-[44px] rounded-full text-inter hover:bg-[#0d2770] font-medium text-white text-base transition-colors"
          >
            Create Account
          </Button>
        </div>
      </div>
    </main>
  );
};

export default WelcomeToVechtron;
