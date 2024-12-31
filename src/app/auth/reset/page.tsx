import PassowordReset from "@components/Auth/FogetPassword/PassowordReset";
import { AuthProvider } from "@components/guards/AuthProvider";
import { ProtectedRoute } from "@components/guards/ProtectedRoute";
import React from "react";

const Reset = () => {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <main>
          <PassowordReset />
        </main>
      </ProtectedRoute>
    </AuthProvider>
  );
};

export default Reset;
