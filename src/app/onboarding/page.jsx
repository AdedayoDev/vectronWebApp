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
        <UserOnboarding/>
      </ProtectedRoute>
    </AuthProvider>
  );
}