import SetNewPassword from "@components/Auth/FogetPassword/SetNewPassword";
import { AuthProvider } from "@components/guards/AuthProvider";
import { ProtectedRoute } from "@components/guards/ProtectedRoute";
import React from "react";

const NewPassword = () => {
  return (
    <main>
      <AuthProvider>
        <ProtectedRoute>
          <SetNewPassword />
        </ProtectedRoute>
      </AuthProvider>
    </main>
  );
};

export default NewPassword;
