import React from "react";
import InputToken from "../../../components/Auth/EmailVerification/InputToken";
import { ProtectedRoute } from "@components/guards/ProtectedRoute";
import { AuthProvider } from "@components/guards/AuthProvider";

const Token = () => {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <main>
          <InputToken />
        </main>
      </ProtectedRoute>
    </AuthProvider>
  );
};

export default Token;
