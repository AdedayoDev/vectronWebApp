"use client";
import { AuthProvider } from "@components/guards/AuthProvider";
import { ProtectedRoute } from "@components/guards/ProtectedRoute";
import VehicleProfile from "@components/Onboarding/VehicleProfile";
export default function VehicleProfiles() {
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
