"use client";
import LogInPage from "@components/Auth/LogIn/LogInPage";
import { AuthProvider } from "@components/guards/AuthProvider";
import { ProtectedRoute } from "@components/guards/ProtectedRoute";
import React from "react";

const LogIn = () => {
  return (
        <main>
          <LogInPage />
        </main>
  );
};

export default LogIn;
