"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import WelcomeToVechtron from "./WelcomeToVechtron";
import {AuthGuard} from "../../guards/AuthGuards"

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const textArray = [
    {
      id: 1,
      text: "Access your AI-powered in-car assistant to navigate smarter, stay connected, and get real-time support on the go. No sign-up hassle.",
    },
    {
      id: 2,
      text: "Stay ahead with cutting-edge technology and AI that understands you like never before. Experience the future of driving.",
    },
    {
      id: 3,
      text: "Your journey is more connected than ever with real-time updates and seamless AI support, anytime and anywhere.",
    },
    {
      id: 4,
      text: "Unlock the ultimate driving experience with our AI-powered assistant. Effortless, efficient, and smart.",
    },
  ];

  // Move handleNext into useCallback
  const handleNext = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === textArray.length - 1 ? 0 : prevIndex + 1
      );
      setIsAnimating(false);
    }, 500);
  }, [textArray.length]); // Add textArray.length as dependency

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleNext]); // Add handleNext to dependency array


  const handleDotClick = (index: number) => {
    if (currentIndex !== index) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, 500);
    }
  };

  return (
    <AuthGuard>
    <main className="w-full flex items-center justify-center h-screen">
      {/* Left Section with Background Image and Overlay */}
      <section
        className="hidden lg:block w-[600px] rounded-xl mx-auto h-[760px] relative"
        style={{
          backgroundImage: `url('/assets/images/vectron-car.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="absolute inset-0 rounded-xl px-5"
          style={{
            backgroundColor: "#42307D",
            opacity: 0.8,
            zIndex: 1,
          }}
        >
          <div className="p-10 flex flex-col items-start w-full h-full">
            <div>
              <Image
                src="/assets/icons/Media.jpeg"
                alt="vechtron logo"
                width={48}
                height={48}
                className="w-12 h-12 rounded-xl"
              />
            </div>

            <div className="flex flex-col justify-between h-screen w-full mt-10">
              <div>
                <p className="font-medium font-inter text-3xl text-white w-[525px] mb-4">
                  Turn Every Drive Into a Smarter Journey.
                </p>
              </div>
              <div className="space-y-20">
                <div className=" flex flex-col overflow-hidden w-[525px] h-auto">
                  {/* Sliding Text */}
                  <div
                    className={`flex transition-transform duration-500 ease-in-out ${
                      isAnimating ? "transform" : ""
                    }`}
                    style={{
                      transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                  >
                    {textArray.map((item) => (
                      <div
                        key={item.id}
                        className="w-full text-center flex-shrink-0 text-white text-lg"
                      >
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dots */}
                <div className="flex items-center justify-center space-x-3 mt-4">
                  {textArray.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        currentIndex === index
                          ? "bg-blue-600 scale-125"
                          : "bg-gray-400"
                      } transition-all duration-300`}
                      onClick={() => handleDotClick(index)}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Section with SignUpForm */}
      <section className="w-full lg:w-1/2 h-full flex items-center">
        <WelcomeToVechtron />
      </section>
    </main>
    </AuthGuard>
  );
};

export default LandingPage;
