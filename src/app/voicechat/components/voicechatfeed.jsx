import React from "react";
import { Radar, ArrowRight } from "lucide-react";
import { FaSpotify } from "react-icons/fa";
import Link from "next/link";

export default function voicechatfeed() {
  return (
    <div className="absolute top-28 z-10 bg-white w-93 sm:w-74 shadow-lg rounded left-4 sm:left-7">
      <div className="w-4/5 mx-auto">
        <h1 className="bg-blue-500 w-40 mx-auto rounded-2xl mt-5 p-1 text-white text-lg  text-center">
          VECHTRON UI
        </h1>
        <p className="mt-10 text-center text-xl sm:text-3xl font-semibold">
          Good day! How may I assist you today?
        </p>
      </div>
      <div className="sm:flex gap-7 w-5/6 mx-auto mt-10">
        <div className="sm:block flex flex-wrap gap-5">
          <div className="flex gap-2 items-center mb-3">
            <div className="bg-blue-500 w-32 p-3 rounded-lg">
              <Radar size={24} color="gray" />
              <div className="text-white text-sm">
                <h1 className="mt-2 mb-2">Explore</h1>
                <p>Learn how to use Vechtron.ai for needs</p>
              </div>
            </div>
            <div className="flex gap-1">
              <div className="w-1 h-8 bg-blue-500"></div>
              <div className="w-1 h-8 bg-blue-500"></div>
              <div className="w-1 h-8 bg-blue-500"></div>
            </div>
          </div>

          <div className="flex gap-2 items-center mb-3">
            <div className="bg-blue-500 w-32 p-3 rounded-lg">
              <Radar size={24} color="gray" />
              <div className="text-white text-sm">
                <h1 className="mt-2 mb-2">Tutorial</h1>
                <p>Learn how to use Vechtron.ai for needs</p>
              </div>
            </div>
            <div className="flex gap-1">
              <div className="w-1 h-8 bg-blue-500"></div>
              <div className="w-1 h-8 bg-blue-500"></div>
              <div className="w-1 h-8 bg-blue-500"></div>
            </div>
          </div>

          <div className="flex gap-2 items-center mb-3">
            <div className="bg-blue-500 w-32 p-3 rounded-lg">
              <Radar size={24} color="gray" />
              <div className="text-white text-sm">
                <h1 className="mt-2 mb-2">Support</h1>
                <p>Learn how to use Vechtron.ai for needs</p>
              </div>
            </div>
            <div className="flex gap-1">
              <div className="w-1 h-8 bg-blue-500"></div>
              <div className="w-1 h-8 bg-blue-500"></div>
              <div className="w-1 h-8 bg-blue-500"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link href="#">
            <div className="bg-blue-200 p-3 sm:h-32 rounded">
              <div>
                <FaSpotify color="green" size={24} />
                <h1 className="text-lg font-semibold mt-2 mb-2">
                  Entertainment
                </h1>
              </div>
              <div className="flex justify-between items-center gap-7">
                <p className="text-sm">What Music do you want to listen to?</p>
                <ArrowRight size={24} color="blue" />
              </div>
            </div>
          </Link>

          <Link href="#">
            <div className="bg-blue-200 p-3 sm:h-32 rounded">
              <div>
                <FaSpotify color="green" size={24} />
                <h1 className="text-lg font-semibold mt-2 mb-2">Navigation</h1>
              </div>
              <div className="flex justify-between items-center gap-7">
                <p className="text-sm">What Music do you want to listen to?</p>
                <ArrowRight size={24} color="blue" />
              </div>
            </div>
          </Link>

          <Link href="#">
            <div className="bg-blue-200 p-3 sm:h-32 rounded">
              <div>
                <FaSpotify color="green" size={24} />
                <h1 className="text-lg font-semibold mt-2 mb-2">
                  Entertainment
                </h1>
              </div>
              <div className="flex justify-between items-center gap-7">
                <p className="text-sm">What Music do you want to listen to?</p>
                <ArrowRight size={24} color="blue" />
              </div>
            </div>
          </Link>

          <Link href="#">
            <div className="bg-blue-200 p-3 sm:h-32 rounded">
              <div>
                <FaSpotify color="green" size={24} />
                <h1 className="text-lg font-semibold mt-2 mb-2">
                  Entertainment
                </h1>
              </div>
              <div className="flex justify-between items-center gap-7">
                <p className="text-sm">What Music do you want to listen to?</p>
                <ArrowRight size={24} color="blue" />
              </div>
            </div>
          </Link>

          <Link href="#">
            <div className="bg-blue-200 p-3 sm:h-32 rounded">
              <div>
                <FaSpotify color="green" size={24} />
                <h1 className="text-lg font-semibold mt-2 mb-2">Diagnostics</h1>
              </div>
              <div className="flex justify-between items-center gap-7">
                <p className="text-sm">What Music do you want to listen to?</p>
                <ArrowRight size={24} color="blue" />
              </div>
            </div>
          </Link>

          <Link href="#">
            <div className="bg-blue-200 p-3 sm:h-32 rounded">
              <div>
                <FaSpotify color="green" size={24} />
                <h1 className="text-lg font-semibold mt-2 mb-2">
                  Health & maintenance
                </h1>
              </div>
              <div className="flex justify-between items-center gap-7">
                <p className="text-sm">What Music do you want to listen to?</p>
                <ArrowRight size={24} color="blue" />
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Link
        href="#"
        className="w-32 bg-blue-700 text-white rounded-full mt-7 block p-3 mb-3 mx-auto text-center"
      >
        <button>See more...</button>
      </Link>

      <div className="text-feed bg-blue-200 h-28 p-3 sm:w-93 sm:ml-7 mt-10  rounded"></div>
    </div>
  );
}
