"use client";

import { Button } from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import api from '../../../lib/protectedapi';
import { useAuthStore } from '@store/useStore'

const EmailVerification = () => {
  const [email, setEmail] = useState<string | null>(null);
  const { token, user } = useAuthStore()

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await api.post('/auth/api/v1/users/send-verify-mail/',{}); 

        // if (response.ok) {
        //   const data = await response.json();
        //   setEmail(data.email);
        // } else {
        //   console.error("Failed to fetch email", await response.json());
        // }
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    };

    fetchEmail(); // Call the fetchEmail function on component mount
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
      await axios.post(
        "https://api-staging.vechtron.com/auth/api/v1/users/send-verify-mail/",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Verification email sent successfully. Please check your inbox.");
      router.push("/auth/input-token");
    } catch (error: any) {
      setError(
        error.response?.data?.data?.message ||
          "An error occurred while sending the email."
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
            We sent a verification link to&nbsp; 
            <span className="font-medium text-[#7f56d9]">
               {user?.email }
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
