import React, { FC, ReactNode } from "react";
import { Button } from "@components/ui/button";
import Image from "next/image";

interface GoogleLogInProps {
  children: ReactNode; 
  userData: {
    name?: string; 
    email: string; 
    password?: string; 
  };
  mode: "login" | "signup"; 
}

const handleGoogleRequest = async (userData: GoogleLogInProps["userData"], mode: "login" | "signup") => {
  const endpoint =
    mode === "signup"
      ? "https://your-backend-endpoint.com/api/google-signup"
      : "https://your-backend-endpoint.com/api/google-login";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      console.log(`User successfully ${mode === "signup" ? "signed up" : "logged in"} with Google!`);
    } else {
      console.error(`Failed to ${mode === "signup" ? "sign up" : "log in"} with Google`, await response.json());
    }
  } catch (error) {
    console.error(`Error during Google ${mode} request:`, error);
  }
};

const GoogleLogIn: FC<GoogleLogInProps> = ({ children, userData, mode }) => {
  return (
    <Button
      onClick={() => handleGoogleRequest(userData, mode)} // Handle the request based on mode
      className="w-full border border-[#D0D5DD] bg-white text-[#040308] font-semibold font-inter text-base hover:bg-slate-100"
    >
        <Image
        src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734708500/google_fyaivt.png"
        alt="Google Logo"
        width={20}
        height={20}
        className="w-6 h-6 mr-2"
        />
     
      {children}
    </Button>
  );
};

export default GoogleLogIn;
