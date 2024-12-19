"use client";

import SideChat from "@app/voicechat/components/sideChat";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import Image from "next/image";
import Navbar from "@components/navbar/chatNav";
import './route.css'

export default function Route() {
  const mapRef = useRef(null);
  const [searchLocation, setsearchLocation] = useState("");
  const [isTyping, setisTyping] = useState(false);

  function handleSearchLocation(e) {
    setsearchLocation(e.target.value);
  }
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      version: "weekly",
    });

    loader.load().then(() => {
      if (mapRef.current) {
        // Initialize the map
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 37.7749, lng: -122.4194 },
          zoom: 10,
        });

        // Add a marker
        new google.maps.Marker({
          position: { lat: 37.7749, lng: -122.4194 },
          map: map,
          title: "San Francisco",
        });
      }
    });
  }, []);
  return (
    <>
      <Navbar />
      <div className="route-container mt-11 flex justify-between">
        <div className="">
          <Image
            src="/assets/images/bg-img.png"
            alt="Google map"
            width={200}
            height={200}
            className="w-full lg:w-78 absolute h-28 mt-2"
          />
          <div className="mapppp left-7 absolute w-87 md:w-74  pt-20">
            <div className="flex items-center gap-2 p-3 bg-white rounded-t-2xl">
              <Image
                src="/assets/icons/vechtron.png"
                alt="background-image"
                width={20}
                height={20}
              />
              <div className="text-md">Vechtron</div>
              <Image
                src="/assets/icons/dropdown.png"
                alt="background-image"
                width={5}
                height={5}
                className="w-2 h-3"
              />
            </div>

            <div className="map-container">
              <div ref={mapRef} className="map-container"/>



              <div className="shadow-custom absolute rounded-3xl backdrop-blur-40 p-3 flex bottom-16 left-3 lg:left-16 items-center bg-slate-white-gradient gap-2 w-93 lg:w-919">
                <Image
                  src="/assets/icons/google-map.png"
                  alt="Google map"
                  width={20}
                  height={20}
                />
                <input
                  type="text"
                  value={searchLocation}
                  onChange={handleSearchLocation}
                  placeholder="Where are you off to?"
                  className="bg-transparent rounded border-0 w-full outline-none"
                />

                {isTyping ? (
                  <Image
                    src="/assets/icons/send-icon.png"
                    alt="Send Icon"
                    width={20}
                    height={20}
                  />
                ) : (
                  <Image
                    src="/assets/icons/voice-icon.png"
                    alt="Voice icon"
                    width={20}
                    height={20}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="side-container hidden md:flex pr-6">
          <SideChat />
        </div>
      </div>
    </>
  );
}
