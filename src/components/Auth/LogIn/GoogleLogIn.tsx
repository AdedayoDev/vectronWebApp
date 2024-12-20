import React, {Children, FC, ReactNode } from "react";
import { Button } from "@components/ui/button";

interface GoogleLogInProps {
  children: ReactNode;
}

const loginWithGoogle = () => {};

const GoogleLogIn: FC<GoogleLogInProps> = ({children}) => {
  return (
    <Button
      onClick={loginWithGoogle}
      className="w-full border border-[#D0D5DD] bg-white  text-[#040308] font-semibold font-inter text-base hover:bg-slate-100 "
    >
      <img
        src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734708500/google_fyaivt.png"
        alt=""
      />
      {children}
    </Button>
  );
};

export default GoogleLogIn;
