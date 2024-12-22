import Image from "next/image";
import React from "react";

interface AuthHeaderProps {
  label: string;
  title: string;
  image: string;
}
const AuthHeader = ({ label, title, image }: AuthHeaderProps) => {
  return (
    <main className="space-y-2">
      <div>
        <Image
          src={image}
          alt="image"
          width={40}
          height={40}
          className="w-10 h-10"
        />
      </div>
      <div className="space-y-2">
        <h2 className="font-inter font-semibold text-3xl text-[#101828]">
          {title}
        </h2>
        <p className="font-inter font-normal text-base text-[#667085]">
          {label}
        </p>
      </div>
    </main>
  );
};

export default AuthHeader;
