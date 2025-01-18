

import SignUpPages from "@components/Auth/SignUp/SignUpPages";
import { AuthProvider } from "@components/guards/AuthProvider";
import { ProtectedRoute } from "@components/guards/ProtectedRoute";
import React from "react";

const SignUp = () => {
  return (
        <main>
          <SignUpPages />
        </main>
  );
};

export default SignUp;
