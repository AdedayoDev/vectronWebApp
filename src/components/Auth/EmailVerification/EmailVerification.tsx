"use client";

import { Button } from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const EmailVerification = () => {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await fetch(
          "https://your-backend-endpoint.com/api/get-email",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setEmail(data.email);
        } else {
          console.error("Failed to fetch email", await response.json());
        }
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    };

    fetchEmail(); // Call the fetchEmail function on component mount
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
          <p>
            We sent a verification link to{" "}
            <span className="font-medium text-[#7f56d9]">
              {email || "loading..."}
            </span>
          </p>
        </div>
        <Link href="/components/Auth/input-token">
          {" "}
          <Button className="bg-[#7f56d9] w-96 h-11 text-base font-inter font-medium text-white">
            Enter Code manually
          </Button>{" "}
        </Link>

        <Link href="/auth/log-in">
          {" "}
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
