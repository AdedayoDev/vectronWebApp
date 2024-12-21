import React from "react";
import LogInForm from "./LogInForm";


const LogInPage = () => {
  return (
    <main className="w-full flex items-center gap- justify-center h-screen">
      {/* Left Section with Background Image and Overlay */}
      <section
        className="w-2/3 h-full relative"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dpmy3egg2/image/upload/v1734707739/image_48_krxsvi.png')`,
          backgroundSize: "cover", // Ensures the image covers the entire section
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents repetition
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#42307D",
            opacity: 0.8, // Adjust transparency of the overlay
          }}
        ></div>
      </section>

      {/* Right Section with SignUpForm */}
      <section className="w-1/2 h-full flex items-center">
        <LogInForm/>
      </section>
    </main>
  );
};

export default LogInPage;
