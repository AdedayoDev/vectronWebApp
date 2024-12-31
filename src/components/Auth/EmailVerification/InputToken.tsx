"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { Button } from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const InputToken = () => {
  const [token, setToken] = useState(["", "", "", ""]);
  const [email, setEmail] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter(); // Initialize useRouter

  // Function to handle input change
  const handleInputChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const updatedToken = [...token];
      updatedToken[index] = value;
      setToken(updatedToken);

      // Move to the next input
      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Function to handle deletion of input
  const handleInputDelete = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      const updatedToken = [...token];

      // Clear the current input value
      if (updatedToken[index]) {
        updatedToken[index] = "";
        setToken(updatedToken);
      }

      // Move focus to the previous input if "Backspace" is pressed
      if (event.key === "Backspace" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Function to handle pasting into inputs
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    const updatedToken = pastedData.split("");
    setToken(updatedToken);

    // Autofill all inputs
    updatedToken.forEach((value, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index]!.value = value;
      }
    });

    // Move focus to the last input
    if (updatedToken.length === 4) {
      inputRefs.current[3]?.focus();
    }
  };

  // Function to fetch email
  React.useEffect(() => {
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

    fetchEmail();
  }, []);

  // Function to submit the token
  const handleSubmitToken = async () => {
    const tokenString = token.join("");
    try {
      const response = await fetch(
        "https://your-backend-endpoint.com/api/verify-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            token: tokenString,
          }),
        }
      );

      if (response.ok) {
        console.log("Token verified successfully");
        // Redirect to /auth/email-verified after successful verification
        router.push("/auth/email-verified");
      } else {
        console.error("Invalid token", await response.json());
        // Handle error (e.g., show error message)
        alert("Invalid token. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying token:", error);
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
            We sent a verification link to{" "}
            <span className="font-medium text-[#7f56d9]">
              {email || "loading..."}
            </span>
          </p>
        </div>
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
          className="bg-[#7f56d9] w-96 h-11 text-base font-inter font-medium text-white"
        >
          Verify Token
        </Button>
        <p className="font-inter font-normal text-sm text-[#667085]">
          Didn&apos;t receive the email?
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

export default InputToken;
