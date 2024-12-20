"use client";
import React, { useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./SignIn.css";

export default function SignIn() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      setError("Please fill in all fields.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const response = await fetch("https://api-staging.vechtron.com/api/v1/auth/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        toast.success(data.message || "Login successful!");
        localStorage.setItem("access_token", data.access_token); // Store access token
        localStorage.setItem("refresh_token", data.refresh_token); // Store refresh token
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user info

        setForm({ email: "", password: "" }); // Clear form

        setTimeout(() => router.push("/onboarding"), 2000); // Redirect to dashboard
      } else {
        // Handle login error
        setError(data.message || "Invalid email or password.");
        setTimeout(() => setError(""), 3000);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Network error. Please try again later.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div>
      <div className="signin-page">
      <div className="welcome-left">
        <div className="onboarding-left">
          <Image
            src="/assets/images/signin-img.png"
            alt="Vectron car"
            width={200}
            height={200}
            className="vech2-image"
          />
        </div>
          <h1 className="welcome-left-header">We’ve been using In-Drive AI to stay connected while driving - couldn’t imagine hitting the road without it!</h1>
          {/* <p className="welcome-left-text">Access your AI-powered in-car assistant to navigate smarter, stay connected, and get real-time support on the go. No sign-up hassle. Trusted by drivers worldwide.</p> */}
        </div>

        <div className="welcome-right">
          <div className="welcome-right-content">
            <h1>Sign in</h1>
            <div className="welcome-links">
              <Link href="/" className="welcome-right-link">
                <Image
                  src="/assets/icons/google.png"
                  alt="icon"
                  width={20}
                  height={20}
                />
                Continue with Google
              </Link>
              <Link href="/" className="welcome-right-link">
                <Image
                  src="/assets/icons/apple.png"
                  alt="icon"
                  width={20}
                  height={20}
                />
                Continue with Apple
              </Link>
            </div>
            <div className="line-container">
              <div className="line"></div>
              <span className="or-text">Or</span>
              <div className="line"></div>
            </div>

            <form onSubmit={handleSubmit} className="sigin-form">
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="hi@email.com"
                id="email"
              />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                id="password"
                maxLength={12}
              />
              {error && (
                <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
              )}
              <button type="submit">Sign in</button>
              <span>Have no account? <Link href="/">Sign Up</Link></span>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} pauseOnHover={false} />
    </div>
  );
}
