import React from "react";
import Image from "next/image";
import { Button } from "@components/ui/button";
import Link from "next/link";

const WelcomeToVechtron = () => {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-[528px] mx-auto space-y-6">
        <div>
          <Image
            src="/assets/icons/Media.jpeg (1).png"
            alt=""
            width={40}
            height={40}
          />
        </div>
        <div>
          <h1 className="font-inter font-semibold text-3xl text-[#101828] ">
            Welcome to Vechtron
          </h1>
          <p className="text-[#667085] font-inter font-normal text-base">
            Start Driving WIth AI
          </p>
        </div>
        <div className="space-y-6">
          <div>
            <Link href="/auth/log-in">
              <Button className="bg-[#fbfdff] border border-[#3b82f6]  w-[400px] h-[44px] rounded-full text-inter font-bold text-[#1e3a8a] hover:bg-[#e7edf3] text-base">
                Login your Vechtron Account
              </Button>
            </Link>
          </div>
          <div>
            <Link href="/auth/sign-up">
              <Button className="bg-[#3556b3] w-[400px] h-[44px] rounded-full text-inter  hover:bg-[#0d2770] font-medium text-white text-base">
                Create account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WelcomeToVechtron;
