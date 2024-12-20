import React, { FC, ReactNode } from "react";
import { Button } from "@components/ui/button";

interface AppleLogIn {
  children: ReactNode;
}

const loginWithApple = () => {};

const AppleLogIn: FC<AppleLogIn> = ({children}) => {
  return (
    <Button
      onClick={loginWithApple}
      className="w-full border border-[#D0D5DD] bg-white  text-[#040308] font-semibold font-inter text-base hover:bg-slate-100 "
    >
      <img
        src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734708500/apple_xl4xop.png"
        alt=""
      />
      {children}
    </Button>
  );
};

export default AppleLogIn;
