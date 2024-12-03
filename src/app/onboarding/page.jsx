"use client";

import Navbar from "@components/navbar/Navbar";
import "./onboarding.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();

  function handleSubmit() {
    setTimeout(() => {
      router.push("/vehicleprofile");
    }, 1000);
  }
  return (
    <div>
      <div className="onboarding-container">
        <Navbar link="/signin" text="Sign in" />
        <div className="onboarding-left">
          <Image
            src="/assets/images/vectron-car.png"
            alt="Vectron car"
            width={200}
            height={200}
            className="vectron-image"
          />
        </div>
        <div className="onboarding-right">
          <div className="onboarding-right-content">
            <h1>Do you have a vehicle?</h1>
            <div className="onboarding-btn">
              <button onClick={handleSubmit}>YES, I DO</button>
              <button>NO, I DONT HAVE </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
