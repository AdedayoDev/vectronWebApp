"use client";

import { Button } from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../../lib/protectedapi";
import { useAuthStore } from "@store/useStore";
import { useRouter } from "next/navigation";

const EmailVerification = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [statusBarVisible, setStatusBarVisible] = useState(false);
  const [statusBarProgress, setStatusBarProgress] = useState(0);
  const [statusBarType, setStatusBarType] = useState<"success" | "error" | null>(null);

  const { user } = useAuthStore();
  const router = useRouter();

  const handleSendVerification = async () => {
    setStatusBarVisible(false);
    setStatusBarProgress(0);
    setStatusBarType(null);

    try {
      const response = await api.post("/auth/api/v1/users/send-verify-mail/", {});

      if (response.status === 200) {
        setEmail(user?.email || "");
        setStatusBarType("success");
        setStatusBarVisible(true);

        // Simulate progress bar
        const interval = setInterval(() => {
          setStatusBarProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              router.push("/components/auth/input-token"); // Navigate to input-token after progress completes
            }
            return prev + 5;
          });
        }, 100);
      } else {
        setStatusBarType("error");
        setStatusBarVisible(true);
        setStatusBarProgress(100);
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      setStatusBarType("error");
      setStatusBarVisible(true);
      setStatusBarProgress(100);
    }
  };

  useEffect(() => {
    // Automatically send verification email on component mount
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

      {/* Status Bar */}
      {statusBarVisible && (
        <div
          className={`fixed bottom-4 left-4 right-4 max-w-md mx-auto p-4 rounded-lg shadow-lg z-50 ${
            statusBarType === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <p>
            {statusBarType === "success"
              ? "Verification email sent successfully!"
              : "Failed to send verification email. Please try again."}
          </p>
          {statusBarType === "success" && (
            <div className="h-2 bg-green-500 rounded mt-2 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-green-700 transition-all"
                style={{ width: `${statusBarProgress}%` }}
              ></div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default EmailVerification;
