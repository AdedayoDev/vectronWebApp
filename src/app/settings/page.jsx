import SettingsSideBar from "./components/SettingsSideBar";
import React from "react";
import Image from "next/image";
import { Home, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <>
      <div>
        <Image
          src="/assets/images/bg-img3.png"
          alt="Background image"
          width={20}
          height={20}
          className="w-[95%] h-[50px] object-cover mt-11 mx-auto"
        />
        <div className="block md:block lg:flex gap-[100px] w-[90%] relative -top-5 px-4 pt-11 bg-white rounded-sm shadow mx-auto ">
          <SettingsSideBar />
          <section className="w-full lg:mt-0 h-[570px] lg:h-[630px]">
            <div>
              <Link
                href="/"
                className="flex items-center gap-2 text-blue-500 mb-4"
              >
                <Home size={20} />
                <h1>Back to home</h1>
              </Link>
            </div>
            <h1 className="my-5 font-bold">Settings</h1>
            <div className="lg:w-4/5 mt-6">
              <Link href="/settings/password">
                <div className="flex justify-between my-3 items-center">
                  <div className="flex items-center gap-2">
                    <div>
                      <Image
                        src="/assets/icons/key.svg"
                        alt="icon"
                        width={20}
                        height={20}
                        className=""
                      />
                    </div>
                    <p>Password</p>
                  </div>
                  <ChevronRight />
                </div>
                <div className="w-full h-[2px] bg-gray-300 mb-3" />
              </Link>

              <Link href="/settings/notification">
                <div className="flex justify-between my-3 items-center">
                  <div className="flex items-center gap-2">
                  <div>
                      <Image
                        src="/assets/icons/info-circle.svg"
                        alt="icon"
                        width={20}
                        height={20}
                        className=""
                      />
                    </div>
                    <p>Notification</p>
                  </div>
                  <ChevronRight />
                </div>
                <div className="w-full h-[2px] bg-gray-300" />
              </Link>

              <Link href="/settings/integration">
                <div className="flex justify-between my-3 items-center">
                  <div className="flex items-center gap-2">
                  <div>
                      <Image
                        src="/assets/icons/info-circle.svg"
                        alt="icon"
                        width={20}
                        height={20}
                        className=""
                      />
                    </div>
                    <p>Integration</p>
                  </div>
                  <ChevronRight />
                </div>
                <div className="w-full h-[2px] bg-gray-300" />
              </Link>

              <Link href="/settings/payment">
                <div className="flex justify-between my-3 items-center">
                  <div className="flex items-center gap-2">
                  <div>
                      <Image
                        src="/assets/icons/payment.svg"
                        alt="icon"
                        width={20}
                        height={20}
                        className=""
                      />
                    </div>
                    <p>Payment</p>
                  </div>
                  <ChevronRight />
                </div>
                <div className="w-full h-[2px] bg-gray-300" />
              </Link>

              <Link href="/settings/about_vechtron">
                <div className="flex justify-between my-3 items-center">
                  <div className="flex items-center gap-2">
                  <div>
                      <Image
                        src="/assets/icons/info-circle.svg"
                        alt="icon"
                        width={20}
                        height={20}
                        className=""
                      />
                    </div>
                    <p>About Vechtron</p>
                  </div>
                  <ChevronRight />
                </div>
                <div className="w-full h-[2px] bg-gray-300" />
              </Link>
            </div>

            <div>
            <Link href='/settings/delete_account'>
            <div className="flex items-center mt-24 lg:mt-32 gap-2 text-red-600">
              <Image
                src="/assets/icons/trash.svg"
                alt="icon"
                width={20}
                height={20}
                className=""
              />
              <p>Delete Account</p>
            </div>
            </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
