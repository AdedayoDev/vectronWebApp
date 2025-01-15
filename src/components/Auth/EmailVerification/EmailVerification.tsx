"use client";

import { Button } from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useAuthStore } from "@store/useStore";

const EmailVerification = () => {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

 
  const { token, user } = useAuthStore();


  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api-staging.vechtron.com";

 
  const handleSendEmail = async () => {
    if (!user?.email) {
      setError("No email found. Please log in again.");
      return;
    }

    if (!token) {
      setError("No authorization token found. Please log in again.");
      return;
    }

    setIsSending(true);
    setError(null);

    try {
      
      const response = await axios.post(
        `${BASE_URL}/auth/api/v1/users/send-verify-mail/`,
        { email: user.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      
      if (response.status === 200) {
        alert("Verification email sent successfully. Please check your inbox.");
        window.location.href = "/auth/email-verified";
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while sending the email.";

      
      if (
        error.response?.data?.code === "USER_ALREADY_VERIFIED" ||
        errorMessage.includes("already verified")
      ) {
        alert("Your account is already verified.");
        window.location.href = "/auth/email-verified";
      } else {
      
        setError(errorMessage);
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="w-full h-screen flex flex-col space-y-5 items-center justify-center">
        <div>
          <Image
            src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734714374/Featured_icon_mcn2x0.png"
            alt="Icon representing email verification"
            width={56}
            height={56}
            className="w-14 h-14"
          />
        </div>
        <div className="space-y-3">
          <h2 className="font-inter font-semibold text-3xl text-center text-[#101828]">
            Check your email
          </h2>
          <p className="w-[360px] text-center">
            We sent a verification link to&nbsp;
            <span className="font-medium text-[#7f56d9]">
              {user?.email || "your email"}
            </span>
          </p>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <Button
          className="bg-[#7f56d9] w-80 h-11 text-base font-inter font-medium text-white"
          onClick={handleSendEmail}
          disabled={isSending}
        >
          {isSending ? "Sending..." : "Enter Code manually"}
        </Button>
        <Link href="/auth/log-in">
          <Button size="lg" className="bg-transparent hover:bg-transparent">
            <FaArrowLeft className="text-lg lg:text-xl text-[#212225]" />
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
