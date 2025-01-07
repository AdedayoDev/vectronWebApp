import React from "react";
import ResetPassword from "@components/Auth/FogetPassword/ResetPassword";
import { ProtectedRoute } from "@components/guards/ProtectedRoute";
import { AuthProvider } from "@components/guards/AuthProvider";

const ResetPasswords = () => {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <main>
          <ResetPassword />
        </main>
      </ProtectedRoute>
    </AuthProvider>
  );
};

export default ResetPasswords;
