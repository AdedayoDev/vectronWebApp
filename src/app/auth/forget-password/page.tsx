import React from "react";
import ForgetPassword from "@components/Auth/FogetPassword/ForgetPassword";
import { ProtectedRoute } from "@components/guards/ProtectedRoute";
import { AuthProvider } from "@components/guards/AuthProvider";

const ForgetPasswords = () => {
  return (
    <main>
          <ForgetPassword />
    </main>
  );
};

export default ForgetPasswords;
