"use client";

import { Button } from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../../lib/protectedapi";
import { useAuthStore } from "@store/useStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const EmailVerification = () => {
  const [email, setEmail] = useState<string | null>(null);

  const { user } = useAuthStore();

  const handleSendVerification = async () => {
    try {
      const response = await api.post("/auth/api/v1/users/send-verify-mail/", {});

      if (response.status === 200) {
        setEmail(user?.email || "");
        toast.success("Verification email sent successfully!", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error("Failed to send verification email. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    handleSendVerification();
  }, []);

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
          <p className="text-center">
            We sent a verification link to&nbsp;
            <span className="font-medium text-[#7f56d9]">
              {email || "your email"}
            </span>
          </p>
        </div>
        <Button
          className="bg-[#7f56d9] w-80 h-11 text-base font-inter font-medium text-white"
          onClick={handleSendVerification}
        >
          Enter Code Manually
        </Button>
        <Link href="/auth/log-in">
          <Button size="lg" className="bg-transparent hover:bg-transparent flex items-center">
            <FaArrowLeft className="text-lg lg:text-xl text-[#667085] mr-2" />
            <span className="font-urbanist font-medium text-sm text-[#667085]">
              Back to log in
            </span>
          </Button>
        </Link>
      </div>

      {/* ToastContainer */}
      <ToastContainer />
    </main>
  );
};

export default EmailVerification;
