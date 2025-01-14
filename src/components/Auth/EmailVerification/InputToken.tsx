"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useAuthStore } from "@store/useStore"; 
const InputToken = () => {
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState(["", "", "", ""]);
  const [email, setEmail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]); 
  const router = useRouter();

  
  const bearerToken = useAuthStore((state) => state.token);

 
  useEffect(() => {
    const emailFromStorage = localStorage.getItem("user");
    if (emailFromStorage) {
      try {
        const user = JSON.parse(emailFromStorage);
        if (user && user.email) {
          setEmail(user.email);
        } else {
          setError("Invalid user data in storage. Please log in again.");
        }
      } catch {
        setError("Failed to parse user data from storage.");
      }
    } else {
      setError("No email found. Please log in first.");
    }
  }, []);

  // Function to handle changes in individual input fields
  const handleInputChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const updatedToken = [...token];
      updatedToken[index] = value;
      setToken(updatedToken);

      // Move focus to the next input if valid
      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Function to handle backspace or delete input
  const handleInputDelete = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      const updatedToken = [...token];

      // Clear the current input value
      if (updatedToken[index]) {
        updatedToken[index] = "";
        setToken(updatedToken);
      }

      // Move focus to the previous input
      if (event.key === "Backspace" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Function to handle pasting a token directly
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("text").slice(0, 4); // Restrict to 4 characters
    const updatedToken = pastedData.split("");
    setToken(updatedToken);

    // Autofill inputs
    updatedToken.forEach((value, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index]!.value = value;
      }
    });

    // Move focus to the last input if all are filled
    if (updatedToken.length === 4) {
      inputRefs.current[3]?.focus();
    }
  };

  // Function to handle form submission
  const handleSubmitToken = async () => {
    const tokenString = token.join("");
    setError(null);

    if (!email) {
      setError("No email found. Please log in again.");
      return;
    }

    if (!bearerToken) {
      setError("No authorization token found. Please log in again.");
      return;
    }

    if (tokenString.length !== 4) {
      setError("Please enter a 4-digit verification code.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/v1/users/verify-email/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({
          email,
          token: tokenString,
        }),
      });

      if (response.ok) {
        router.push("/auth/email-verified");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid verification code. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      setError("An unexpected error occurred. Please try again later.");
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
            Enter the verification code
          </h2>
          <p>
            We sent a verification code to{" "}
            <span className="font-medium text-[#7f56d9]">
              {email || "loading..."}
            </span>
          </p>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="flex space-x-4">
          {token.map((value, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleInputChange(e.target.value, index)}
              onKeyDown={(e) => handleInputDelete(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 border border-gray-300 text-center text-lg font-medium text-[#7f56d9] focus:outline-none focus:ring-2 focus:ring-[#7f56d9] rounded"
            />
          ))}
        </div>
        <Button
          onClick={handleSubmitToken}
          disabled={isSubmitting}
          className="bg-[#7f56d9] w-80 h-11 text-base font-inter font-medium text-white"
        >
          {isSubmitting ? "Verifying..." : "Verify Token"}
        </Button>
        <p className="font-inter font-normal text-sm text-[#667085]">
          Didn&apos;t receive the email?{" "}
          <span
            className="text-[#6941c6] cursor-pointer"
            onClick={() => router.push("/auth/resend-email")}
          >
            Click to resend
          </span>
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

export default InputToken;
