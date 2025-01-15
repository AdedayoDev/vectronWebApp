"use client";

import { AuthProvider } from "@components/guards/AuthProvider";
import { ProtectedRoute } from "@components/guards/ProtectedRoute";
import { useAuthStore } from "@store/useStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from '../../lib/protectedapi';
import "./onboarding.css";

export default function Onboarding() {
  const router = useRouter();
  const { user, updateVehicleOwnerStatus } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleVehicleOwnerStatus = async (status) => {
    setIsLoading(true);
    try {
      const response = await api.post('/api/v1/auth/account/vehicle-owner-status', {
        is_vehicle_owner: status
      });

      if (response) {
        // Update local storage
        updateVehicleOwnerStatus(status);
        
        // If they have a vehicle, route to vehicle profile
        if (status) {
          router.push("/vehicleprofile");
        } else {
          router.push("/chat"); // or wherever non-vehicle owners should go
        }
      }
    } catch (error) {
      console.error("Error updating vehicle owner status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthProvider>
      <ProtectedRoute>
        <div>
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
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}