import React, { FC, ReactNode, useEffect } from "react";
import { Button } from "@components/ui/button";
import Image from "next/image";
import { getGoogleOAuthURL } from '@/lib/googleAuth';

interface GoogleLogInProps {
  children: ReactNode; 
  userData: {
    name?: string; 
    email: string; 
    password?: string; 
  };
  mode: "login" | "signup"; 
}


const GoogleLogIn: FC<GoogleLogInProps> = ({ children, userData, mode }) => {

  
  return (
    <Button
    onClick={() => {
      window.location.href = getGoogleOAuthURL();
    }}// Handle the request based on mode
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
