"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Product_Page() {
  const [waitlist, setWaitlist] = useState("");
  const handSubmit = (e) => {
    e.preventDefault();
    console.log(waitlist);
    if (waitlist) {
      alert("You have been added to the waitlist");
    } else {
      alert("Please enter a valid email address");
    }
    setWaitlist("");
  };

  return (
    <>
      <main>
        {/* className="bg-[#2e2f38]" */}
        <section className="relative">
          <Image
            src="/assets/icons/bg-product.svg"
            alt="Background image"
            width={20}
            height={20}
            className="w-full hidden lg:block object-cover absolute top-0 left-0"
          />
          <div className="z-40 relative lg:w-[40%] w-[90%] mx-auto py-[100px] lg:py-[200px]">
            <div className="flex items-center gap-2 w-[80%] lg:w-[50%] pb-6 text-sm mx-auto">
              <Image
                src="/assets/icons/lucide_bot.svg"
                alt="icon"
                width={20}
                height={20}
              />
              <p className="text-white">
                Empower your drive with intelligent design
              </p>
            </div>
            <div className="text-center">
              <h1 className="font-semibold text-3xl lg:text-5xl text-white">
                <span className="text-blue-600">Unleash</span> the power of AI
                for your Car
              </h1>
              <p className="text-white lg:w-[70%] mt-7 mx-auto text-lg">
                Discover how AI can revolutionize your car’s maintenance and
                diagnostics with our intelligent in-car assistant.
              </p>
            </div>
            <form
              onSubmit={handSubmit}
              className="bg-white rounded-lg w-full lg:w-[80%] mx-auto p-6 mt-6 flex gap-2"
            >
              <input
                type="text"
                value={waitlist}
                onChange={(e) => setWaitlist(e.target.value)}
                placeholder="Request a Demo..."
                className="outline-none w-[60%] text-black border-none py-2 px-4"
              />
              <div className="flex items-center gap-3 bg-black text-white rounded py-2 w-[150px] justify-center">
                <button type="submit" className="text-sm">
                  Join Waitlist
                </button>
                <Image
                  src="/assets/icons/lucide_bot.svg"
                  alt="icon"
                  width={20}
                  height={20}
                />
              </div>
            </form>
          </div>
        </section>
        <section className="w-[90%] mx-auto lg:mt-20">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <Image
              src="/assets/icons/personalize.svg"
              alt="icon"
              width={20}
              height={20}
            />
            <p className="text-sm">PERSONALIZED</p>
          </div>
          <div className="text-2xl lg:text-4xl mt-6 text-center">
            <h2>
              <span className="text-blue-600">Customize</span> your experience.
            </h2>
            <h2>Vehicle type and personal preferences.</h2>
          </div>

          <div className="mt-10">
            <Image
              src="/assets/icons/board.svg"
              alt="icon"
              width={20}
              height={20}
              className="w-full"
            />
            <div className="lg:flex items-center gap-2 mt-16 mb-4 justify-between">
              <p className="my-5 lg:text-2xl lg:w-[40%]">
                Use our In-Car AI Solution to explore and refine driving
                insights. Smarter and Faster.
              </p>
              <div className="flex py-2 gap-2 px-3 w-fit rounded items-center bg-white text-black inset-1 border border-blue-400">
                <button className="outline-none">Get early access</button>
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
        </section>

        <section className="lg:flex justify-between items-start w-[90%] mx-auto mt-10">
          <div className="bg-black flex justify-between rounded text-white lg:w-[30%] mb-7 items-start gap-3 p-4">
            <Image
              src="/assets/icons/lucide_bot.svg"
              alt="icon"
              width={20}
              height={20}
            />
            <p className="">
              Equip your drive with In-Car AI for real-time diagnostics and
              troubleshooting. Access instant insights, step-by-step solutions,
              and connect with experts for support when needed—keeping you
              informed and safe on the road.
            </p>
          </div>
          <div className="flex gap-4">
            <div>
              <Image
                src="/assets/images/login-phone.png"
                alt="icon"
                width={200}
                height={200}
                className="w-full"
              />
            </div>
            <div>
              <Image
                src="/assets/images/identify-phone.png"
                alt="icon"
                width={200}
                height={200}
                className="w-full"
              />
            </div>
            <div>
              <Image
                src="/assets/images/daignostics-phone.png"
                alt="icon"
                width={200}
                height={200}
                className="w-full"
              />
            </div>
            <div>
              <Image
                src="/assets/images/support-phone.png"
                alt="icon"
                width={200}
                height={200}
                className="w-full"
              />
            </div>
          </div>
        </section>

        <section className="w-[90%] mx-auto mt-20">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <Image
              src="/assets/icons/personalize.svg"
              alt="icon"
              width={20}
              height={20}
            />
            <p className="text-sm">VOICE-ACTIVATED ASSISTANT</p>
          </div>
          <div className="text-2xl lg:text-4xl mt-6 text-center">
            <h2>
              <span className="text-blue-500">Hands-free</span> navigation
              through core
            </h2>
            <h2>features, designed for safe driving.</h2>
          </div>

          <div className="mt-10 lg:grid grid-cols-3">
            <div className="bg-black flex justify-between rounded text-white mb-7 items-start gap-3 py-7 px-4 lg:w-[80%]">
              <Image
                src="/assets/icons/stars-icon.png"
                alt="icon"
                width={20}
                height={20}
              />
              <p className="">
                Create an intelligent vehicle monitoring system that detects,
                analyzes, and alerts you to any car issues or breakdowns. The
                goal is to enhance driver safety and ensure prompt support when
                needed.
              </p>
            </div>

            <div className="bg-black flex justify-between rounded text-white  mb-7 items-start gap-3 py-7 lg:w-[80%] px-4">
              <Image
                src="/assets/icons/stars-icon.png"
                alt="icon"
                width={20}
                height={20}
              />
              <p className="">
                Create a robust system that automatically connects you to
                emergency services or roadside assistance. From breakdowns to
                urgent issues, ensure timely support for a stress-free driving
                experience.
              </p>
            </div>

            <div className="bg-black flex justify-between rounded text-white mb-7 lg:w-[80%] items-start gap-3 py-7 px-4">
              <Image
                src="/assets/icons/stars-icon.png"
                alt="icon"
                width={20}
                height={20}
              />
              <p className="">
                The AI can automatically provide your location and vehicle
                details, ensuring faster response and more efficient assistance
                during emergencies.
              </p>
            </div>
            <Image
              src="/assets/images/meter.png"
              alt="icon"
              width={200}
              height={200}
              className="w-full mb-4 lg:w-[80%]"
            />
            <Image
              src="/assets/images/car-plug.png"
              alt="icon"
              width={200}
              height={200}
              className="w-full mb-4 lg:w-[80%]"
            />
            <Image
              src="/assets/images/car-route.png"
              alt="icon"
              width={200}
              height={200}
              className="w-full mb-4 lg:w-[80%]"
            />
          </div>
        </section>

        <section className="w-[90%] mx-auto mt-20">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <Image
              src="/assets/icons/personalize.svg"
              alt="icon"
              width={20}
              height={20}
            />
            <p className="text-sm">KNOWLEDGE BASE</p>
          </div>
          <div className="text-2xl lg:text-4xl mt-6 text-center">
            <h2>
              <span className="text-blue-500">Get AI-powered</span> answers to
              your
            </h2>
            <h2>questions instantly.</h2>
          </div>

          <div className="lg:flex items-center gap-2 mt-10 mb-4 justify-between">
            <p className="my-5 lg:text-2xl lg:w-[40%]">
              Upload your existing questions or issues to our AI-powered
              Knowledge Base and get real-time answers and insights tailored to
              your needs—available on request.
            </p>
            <div className="flex py-2 gap-2 px-3 w-fit rounded items-center bg-white text-black inset-1 border border-blue-400">
              <button className="outline-none">Sign up</button>
              <ArrowRight size={20} />
            </div>
          </div>

          <div className="lg:flex justify-between items-start">
            <div className="text-white">Maontain</div>
            <div className="w-[80%]">
              <Image
                src="/assets/images/desktop-phone.png"
                alt="icon"
                width={200}
                height={200}
                className="w-full"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
