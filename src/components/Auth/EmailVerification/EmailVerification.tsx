"use client";

import { Button } from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { emailVerification } from "@lib/Api"; 
import { useAuthStore } from "@store/useStore"; 

const EmailVerification = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const user = useAuthStore((state) => state.user); 

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email); 
    }
  }, [user]);

  const handleEmailVerification = async () => {
    if (!email) {
      console.error("Email is not available");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailVerification({ email }); 
      router.push("/input-token"); 
    } catch (error: any) {
      console.error("Error requesting email verification:", error.message);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="w-full h-screen flex flex-col space-y-5 items-center justify-center">
        <div>
          <Image
            src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734714374/Featured_icon_mcn2x0.png"
            alt="Email Verification Icon"
            width={56}
            height={56}
            className="w-14 h-14"
          />
        </div>
        <div>
          <h2 className="font-inter font-semibold text-3xl text-center text-[#101828]">
            Check your email
          </h2>
          <p>
            We sent a verification link to{" "}
            <span className="font-medium text-[#7f56d9]">
              {email || "loading..."}
            </span>
          </p>
        </div>
        <Button
          className="bg-[#7f56d9] w-80 h-11 text-base font-inter font-medium text-white"
          onClick={handleEmailVerification}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Enter Code Manually"}
        </Button>

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

export default EmailVerification;
