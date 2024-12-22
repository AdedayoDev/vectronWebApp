import React from "react";
import SignUpForm from "./SignUpForm";
import Image from "next/image";
import { AnimatedTooltipPreview } from "@components/AnimatedToolkip/animated-toolkipTwo";

const SignUpPages = () => {
  return (
    <main className="w-full flex items-center justify-center h-screen">
      {/* Left Section with Background Image and Overlay */}
      <section
        className="w-2/3 h-[1000px] relative"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dpmy3egg2/image/upload/v1734251344/volkswagen_car_ai_1_o7a6hn.png')`,
          backgroundSize: "cover", // Ensures the image covers the entire section
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents repetition
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundColor: "#42307D",
            opacity: 0.8, 
          }}
        >
          <div className="flex flex-col w-[672px]  h-[600px] items-start space-y-8  justify-center p-8">
            <Image
              src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734698485/Content_coc8x0.png"
              alt=""
              width={48}
              height={48}
              className="w-12 h-12"
            />
            <div className="space-y-4">
              <h2 className="font-inter font-medium text-7xl text-white">
                Turn Every Drive Into a Smarter Journey.
              </h2>
              <p className="font-inter font-medium text-xl text-white">
                Access your AI-powered in-car assistant to navigate smarter,
                stay connected, and get real-time support on the go. No sign-up
                hassle. Trusted by drivers worldwide.
              </p>
            </div>
            <div>
              <AnimatedTooltipPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Right Section with SignUpForm */}
      <section className="w-1/2 h-full flex items-center">
        <SignUpForm />
      </section>
    </main>
  );
};

export default SignUpPages;
