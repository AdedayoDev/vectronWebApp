"use client";

import { AuthProvider } from "@components/guards/AuthProvider";
import { ProtectedRoute } from "@components/guards/ProtectedRoute";

import "./onboarding.css";
import UserOnboarding from "@components/Onboarding/UserOnboarding";

export default function Onboarding() {
  return (
    <AuthProvider>
      {" "}
      <ProtectedRoute>
        {" "}
        <UserOnboarding />
      </ProtectedRoute>
    </AuthProvider>
  );
}
