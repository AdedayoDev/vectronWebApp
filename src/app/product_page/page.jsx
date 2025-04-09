"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Product_Page() {
  const [waitlist, setWaitlist] = useState("");
  const [openManual, setOpenManual] = useState("");

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
              src="/assets/icons/voice-assistant.png"
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
              src="/assets/icons/knowledge.png"
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

          <div className="flex justify-center items-start mt-7">
            <div>
              <div
                onClick={() => setOpenManual((prev) => !prev)}
                className="bg-[#161616]  text-white flex justify-between mt-[30px] w-[200px] py-2 px-4 items-center lg:mt-[120px]"
              >
                <h1 className="flex gap-2">
                  <Image
                    src="/assets/icons/manual.png"
                    alt="icon"
                    width={20}
                    height={20}
                  />
                  <p>Manual</p>
                </h1>
                <ChevronDown size={20} />
              </div>
              {openManual && (
                <ul className="list-none bg-[#222222] w-[200px] mt-3 py-3 px-4 text-gray-300">
                  <li className="mb-2" onClick={() => setOpenManual(false)}>
                    <Link href="#">Tutorials</Link>
                  </li>
                  <li className="mb-2" onClick={() => setOpenManual(false)}>
                    <Link href="#">Maintenance</Link>
                  </li>
                  <li className="mb-2" onClick={() => setOpenManual(false)}>
                    <Link href="#">FAQ</Link>
                  </li>
                </ul>
              )}
            </div>

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

        <section className="w-[90%] mx-auto mt-20">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <Image
              src="/assets/icons/protection.png"
              alt="icon"
              width={20}
              height={20}
            />
            <p className="text-sm">PROTECTION</p>
          </div>
          <div className="text-2xl lg:text-4xl mt-6 text-center">
            <h2>
              <span className="text-blue-500">
                Your data is safe, with secure
              </span>
            </h2>
            <h2>storage and full privacy control.</h2>
          </div>

          <div className="lg:grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-b from-black/60 to-gray-800/60 mt-10 py-5 px-3">
              <div className="items-center flex gap-2 mb-3">
                <div>
                  <Image
                    src="/assets/icons/data.png"
                    alt="icon"
                    width={25}
                    height={25}
                  />
                </div>
                <h2>Data Protection</h2>
              </div>
              <p className="text-gray-300 text-sm">
                Your vehicle's data is securely encrypted and protected.
              </p>
            </div>

            <div className="bg-gradient-to-b from-black/60 to-gray-800/60 mt-10 py-5 px-3">
              <div className="items-center flex gap-2 mb-3">
                <div>
                  <Image
                    src="/assets/icons/privacy.png"
                    alt="icon"
                    width={25}
                    height={25}
                  />
                </div>
                <h2>Privacy Controls</h2>
              </div>
              <p className="text-gray-300 text-sm">
                Easily manage your preferences for data sharing and usage.
              </p>
            </div>

            <div className="bg-gradient-to-b from-black/60 to-gray-800/60 mt-10 py-5 px-3">
              <div className="items-center flex gap-2 mb-3">
                <div>
                  <Image
                    src="/assets/icons/trusted.png"
                    alt="icon"
                    width={25}
                    height={25}
                  />
                </div>
                <h2>Trusted Partnership</h2>
              </div>
              <p className="text-gray-300 text-sm">
                We prioritize your trust and transparency in our services.
              </p>
            </div>
          </div>
        </section>

        <section className="w-[90%] mx-auto mt-20">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <Image
              src="/assets/icons/blog-light.png"
              alt="icon"
              width={20}
              height={20}
            />
            <p className="text-sm">BLOG</p>
          </div>
          <div className="lg:flex gap-[50px] mt-10">
            <div >
              <h2 className="text-2xl lg:text-4xl lg:w-[55%] mb-4">
                Stay Updted with Our Latest Insights.
              </h2>
              <p className='mb-3 lg:text-lg lg:w-[55%] text-gray-300'>
                Explore tips, guides, and news to make the most of your in-car
                AI experience.
              </p>
              <Link href="#">
                <div className="w-[180px] mb-5 rounded justify-center flex gap-2 py-2 px-4 items-center border-2 border-white">
                  <button>Visit our blog</button>
                  <Image
                    src="/assets/icons/arrow-right-up.png"
                    alt="icon"
                    width={20}
                    height={20}
                  />
                </div>
              </Link>
            </div>
            <div className="bg-black text-white p-3 rounded w-[418px]">
              <Image
                src="/assets/images/car-update.png"
                alt="icon"
                width={150}
                height={150}
                className="w-full"
              />
              <p className='text-lg my-5 w-[65%]'>Top 5 In-Car AI Features for a Smarter Drive.</p>
              <Image
                src="/assets/icons/plus-circle2.png"
                alt="icon"
                width={25}
                height={25}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
