"use client";

import { AuthProvider } from "@components/guards/AuthProvider";
import { ProtectedRoute } from "@components/guards/ProtectedRoute";
import { useAuthStore } from "@store/useStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from '../../lib/protectedapi';
import "./onboarding.css";
import UserOnboarding from "@components/Onboarding/UserOnboarding";

export default function Onboarding() {
  const router = useRouter();
  const { user, updateVehicleOwnerStatus } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);



  return (
    <AuthProvider>
      <ProtectedRoute>
        {/* <div>
          <div className="onboarding-container">
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
                  <button 
                    onClick={() => handleVehicleOwnerStatus(true)}
                    disabled={isLoading}
                  >
                    {isLoading ? "UPDATING..." : "YES, I DO"}
                  </button>
                  <button 
                    onClick={() => handleVehicleOwnerStatus(false)}
                    disabled={isLoading}
                  >
                    {isLoading ? "UPDATING..." : "NO, I DONT HAVE"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <UserOnboarding/>
      </ProtectedRoute>
    </AuthProvider>
  );
}