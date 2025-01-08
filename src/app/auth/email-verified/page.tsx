import EmailVerified from "@components/Auth/EmailVerification/EmailVerified";
import { AuthProvider } from "@components/guards/AuthProvider";
import { ProtectedRoute } from "@components/guards/ProtectedRoute";
import React from "react";

const page = () => {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <main>
          <EmailVerified />
        </main>
      </ProtectedRoute>
    </AuthProvider>
  );
};

export default page;
