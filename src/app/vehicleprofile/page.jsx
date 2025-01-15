"use client";

import { AuthProvider } from "@components/guards/AuthProvider";
import VehicleProfile from "../../components/Onboarding/VehicleProfile";
import { ProtectedRoute } from "@components/guards/ProtectedRoute";

export default function VehicleProfiles() {
  {
    return (
      <div>
        <AuthProvider>
          <ProtectedRoute>
            <VehicleProfile />
          </ProtectedRoute>
        </AuthProvider>
      </div>
    );
  }
}
