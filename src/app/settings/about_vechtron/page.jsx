"use client";
import Image from "next/image";
import SettingsSideBar from "../components/SettingsSideBar";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function About_Vechtron() {
  return (
    <>
      <section>
        <Image
          src="/assets/images/bg-img3.png"
          alt="Background image"
          width={20}
          height={20}
          className="w-[95%] h-[50px] object-cover mt-11 mx-auto"
        />
        <div className="block md:block lg:flex gap-[100px] w-[90%] relative -top-5 px-4 pt-11 bg-white rounded-sm shadow mx-auto ">
          <SettingsSideBar />
          <div className="w-full lg:mt-0 h-[570px] lg:h-[630px]">
            <h1 className="text-xl font-semibold mb-7">About Vechtron</h1>
            <div className="lg:w-[80%]">
              <Link href="/settings/terms_conditions">
                <div className="flex justify-between my-3 items-center">
                  <p>Terms and conditions</p>

                  <ChevronRight className="text-gray-400"/>
                </div>
                <div className="w-full h-[2px] bg-gray-300 mb-3" />
              </Link>
              <Link href="/settings/privacy_policy">
                <div className="flex justify-between my-3 items-center">
                  <p>Privacy policy</p>

                  <ChevronRight className="text-gray-400"/>
                </div>
                <div className="w-full h-[2px] bg-gray-300 mb-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
