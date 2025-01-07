import EmailVerification from "@components/Auth/EmailVerification/EmailVerification";
import { AuthProvider } from "@components/guards/AuthProvider";
import { ProtectedRoute } from "@components/guards/ProtectedRoute";
import React from "react";

const EmailVerfication = () => {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <main>
          <EmailVerification />
        </main>
      </ProtectedRoute>
    </AuthProvider>
  );
};

export default EmailVerfication;
