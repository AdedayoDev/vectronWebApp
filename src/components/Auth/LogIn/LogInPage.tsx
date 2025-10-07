"use client";

import React, { useState, useEffect, useCallback } from "react";
import LogInForm from "./LogInForm";
import Image from "next/image";

const LogInPage = () => {
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
  }, [handleNext, currentIndex]); // Add handleNext to dependency array

  const handleDotClick = (index: number) => {
    if (currentIndex !== index) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, 500);
    }
  };
  const year = new Date();
  const getYear = year.getFullYear();
  return (
    <main className="w-11/12 mx-auto flex items-center  justify-center h-screen">
      {/* Left Section with Background Image and Overlay */}
      <section
        className="hidden lg:block w-[600px] rounded-xl mx-auto h-[730px] py-10 my-auto relative"
        style={{
          backgroundImage: `url('/assets/images/vectron-car.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <div
          className="absolute inset-0 rounded-xl px-5"
          style={{
            background:
              "linear-gradient(to bottom, rgba(66, 48, 125, 0.9), rgba(0, 0, 0, 0.5))",
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
                <p className="font-medium font-inter text-5xl text-white w-[525px] mb-4">
                  Revolutionizing Vehicle Care with AI
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
        console.log(process.env.NEXT_PUBLIC_BACKEND_API);
      </section>

      {/* Right Section with SignUpForm */}
      <section className="w-full lg:w-1/2 h-full flex items-center">
        <LogInForm />
      </section>
    </main>
  );
};

export default LogInPage;
