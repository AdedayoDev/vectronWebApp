"use client";

import { Button } from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const EmailVerified = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/onboarding");
  };

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="w-full h-screen flex flex-col space-y-5 items-center justify-center">
        <div>
          <Image
            src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734747529/Featured_icon_1_ntnup0.png"
            alt="Email Verification Icon"
            width={56}
            height={56}
            className="w-14 h-14"
          />
        </div>
        <div>
          <h2 className="font-inter font-semibold text-3xl text-center text-[#101828]">
            Email verified
          </h2>
          <p className="font-inter text-base text-[#667085] text-center w-96">
            Your password has been successfully reset. Click below to log in magically.
          </p>
        </div>
        <Button
          className="bg-[#7f56d9] w-96 h-11 text-base font-inter font-medium text-white"
          onClick={handleContinue}
        >
          Continue
        </Button>
        <p className="font-inter font-normal text-sm text-[#667085]">
          Didn&apos;t receive the email?{" "}
          <span className="text-[#6941c6] cursor-pointer">Click to resend</span>
        </p>
        <Link href="/auth/log-in">
          <Button size="lg" className="bg-transparent hover:bg-transparent">
            <FaArrowLeft className="text-lg lg:text-xl text-[#667085]" />
            <span className="font-urbanist font-medium text-sm text-[#667085]">
              Back to log in
            </span>
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default EmailVerified;
