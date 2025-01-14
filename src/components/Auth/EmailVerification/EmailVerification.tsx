"use client";

import { Button } from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuthStore, axiosInstance } from "@store/useStore"; 

const EmailVerification = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Access the store token
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const emailFromStorage = localStorage.getItem("user");
    if (emailFromStorage) {
      const user = JSON.parse(emailFromStorage);
      setEmail(user.email);
    } else {
      setError("No email found. Please sign up first.");
    }
  }, []);

  const handleSendEmail = async () => {
    const token = useAuthStore.getState().token; // Get the stored token
    if (!email) {
      alert("No email found.");
      return;
    }
  
    if (!token) {
      setError("No authorization token found. Please log in again.");
      return;
    }
  
    setIsSending(true);
    setError(null);
  
    try {
      // Use axiosInstance to send the token to the endpoint
      await axiosInstance.post(
        "/api/v1/users/send-verify-mail/",
        { email }, // Request payload
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token as Bearer token
          },
        }
      );
  
      alert("Verification email sent successfully. Please check your inbox.");
      router.push("/auth/input-token");
    } catch (error: any) {
      setError(
        error.response?.data?.data?.message || "An error occurred while sending the email."
      );
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
