"use client";
import Image from "next/image";
import React from "react";
import Faq from "./components/Faq";
import PricingSlider from "./components/PricingSlider";
import "./settings.css";
import NavBar from "@components/navbar/navbar";
import { CldImage } from "next-cloudinary";

export default function Settings() {
  return (
    <>
      <NavBar text="My account" icon="/assets/icons/user.png" />
      <div className="settings-container mt-14">
        <div className="settings-main">
          {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && (
            <CldImage
              src="bg-img3_sjyfvr"
              alt="background image"
              width={200}
              height={200}
              className="w-full h-64 object-cover"
            />
          )}
        </div>
        <div className="settings-content px-4 w-90 lg:w-96 sm:left-6 relative rounded-t-lg shadow-custom bg-white left-8 -mt-11">
          <div className="text-center pt-16">
            <h1 className="font-bold text-5xl md:text-6xl mb-5">
              Choose your preferred plan
            </h1>
            <p className="font-semibold text-gray-400 text-lg">
              Meet the Vechtron ai chat app revolutionizing conversations
              related to cars
            </p>
          </div>
          <div className="flex justify-center mb-11 mt-11 gap-7 text-sm bg-gray-200 w-64 rounded-lg m-auto py-2">
            <div className="cursor-pointer font-semibold bg-white rounded-md shadow-custom p-2">
              Monthly
            </div>
            <div className="cursor-pointer font-semibold bg-white shadow rounded-md-custom p-2">
              Anually (-20%)
            </div>
          </div>
          <PricingSlider />
          <div className="image mt-20">
            <Image
              src="/assets/images/faq-img.png"
              alt="background image"
              width={200}
              height={200}
              className="w-60 mx-auto"
            />
          </div>
          <Faq />
        </div>
      </div>
    </>
  );
}
