"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@components/ui/button";
import { useAnimate, stagger } from "framer-motion";
import { useRouter } from "next/navigation";

const WelcomeToVechtron = () => {
  const [loginScope, loginAnimate] = useAnimate();
  const [signupScope, signupAnimate] = useAnimate();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = (path: string, animateFunction: any) => {
    animateFunction([
      [".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
      ["button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
      ["button", { scale: 1 }, { duration: 0.1 }],
      [".letter", { y: 0 }, { duration: 0.00001, at: 0.5 }],
    ]).then(() => {
      setTimeout(() => {
        router.push(path);
      }, 500);
    });
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-11/12 md:w-10/12 mx-auto space-y-6">
        <div>
          <Image
            src="/assets/icons/Media.jpeg (1).png"
            alt="Vechtron Logo"
            width={40}
            height={40}
            priority
          />
        </div>
        <div className="flex flex-col ">
          <h1 className="font-inter font-bold text-4xl md:text-5xl text-[#101828]">
            Welcome to Vechtron
          </h1>
          <p className="text-[#667085] font-inter font-normal text-xl md:text-2xl">
            Start your AI-powered Drive Today!
          </p>
        </div>
        <div className="space-y-6 items-center justify-center">
          <div ref={loginScope}>
            <Button
              onClick={() => handleClick("/auth/log-in", loginAnimate)}
              className="bg-[#fbfdff] border border-[#3b82f6] w-full md:w-9/12 h-[44px] rounded-full text-inter font-bold text-[#1e3a8a] hover:bg-[#e7edf3] text-base transition-colors"
            >
              <span className="sr-only">Log in to your Vechtron Account</span>

              {isMounted ? (
                <span
                  className="h-8 overflow-hidden flex items-center justify-center"
                  aria-hidden
                >
                  {[
                    "L",
                    "o",
                    "g" + " " + "i",
                    "n" + " " + "t",
                    "o" + " " + "y",
                    "o",
                    "u",
                    "r" + " " + "V",
                    "e",
                    "c",
                    "h",
                    "t",
                    "r",
                    "o",
                    "n" + " " + "A",
                    "c",
                    "c",
                    "o",
                    "u",
                    "n",
                    "t",
                  ].map((letter, index) => (
                    <span
                      data-letter={letter}
                      className="letter relative inline-block h-8 leading-8 after:absolute after:left-0 after:top-full after:h-0 after:content-[attr(data-letter)]"
                      key={`${letter}-${index}`}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              ) : (
                "Log in"
              )}
            </Button>
          </div>

          <div ref={signupScope}>
            <Button
              onClick={() => handleClick("/auth/sign-up", signupAnimate)}
              className="bg-[#3556B3] w-full md:w-9/12 mx-auto h-[44px] rounded-full text-inter hover:bg-[#0d2770] font-medium text-white text-base transition-colors"
            >
              <span className="sr-only">Create Account</span>

              {isMounted ? (
                <span
                  className="h-8 overflow-hidden flex items-center justify-center"
                  aria-hidden
                >
                  {[
                    "C",
                    "r",
                    "e",
                    "a",
                    "t",
                    "e" + " " + "A",
                    "c",
                    "c",
                    "o",
                    "u",
                    "n",
                    "t",
                  ].map((letter, index) => (
                    <span
                      data-letter={letter}
                      className="letter relative inline-block h-8 leading-8 after:absolute after:left-0 after:top-full after:h-0 after:content-[attr(data-letter)]"
                      key={`${letter}-${index}`}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WelcomeToVechtron;
