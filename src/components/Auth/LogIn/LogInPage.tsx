import React from "react";
import LogInForm from "./LogInForm";
import Image from "next/image";

const LogInPage = () => {
  const year = new Date();
  const getYear = year.getFullYear();
  return (
    <main className="w-full flex items-center  justify-center h-screen">
      {/* Left Section with Background Image and Overlay */}
      <section
        className="hidden lg:block w-1/2 h-full relative"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dpmy3egg2/image/upload/v1734707739/image_48_krxsvi.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center", 
          backgroundRepeat: "no-repeat", 
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#42307D",
            opacity: 0.8, 
          }}
        >
          <div className=" p-10 flex  flex-col justify-between items-start w-full h-full">
            <div>
              <Image
                src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734698485/Content_coc8x0.png"
                alt=""
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </div>
            <div>
              <p className="font-medium font-inter text-3xl text-white w-[592px]">
                We’ve been using In-Drive AI to stay connected while driving -
                couldn’t imagine hitting the road without it!
              </p>
            </div>
            <div>
              <p className="font-inter font-normal text-sm text-[#e0d7fe]">&copy; Docvantage UI {getYear}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Right Section with SignUpForm */}
      <section className="w-full lg:w-1/2 h-full flex items-center">
        <LogInForm />
      </section>
    </main>
  );
};

export default LogInPage;
