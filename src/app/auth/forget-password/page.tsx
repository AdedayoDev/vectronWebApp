import React from "react";
import ForgetPassword from "@components/Auth/FogetPassword/ForgetPassword";
import { ProtectedRoute } from "@components/guards/ProtectedRoute";
import { AuthProvider } from "@components/guards/AuthProvider";

const ForgetPasswords = () => {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <main>
          <ForgetPassword />
        </main>
      </ProtectedRoute>
    </AuthProvider>
  );
};

export default ForgetPasswords;
