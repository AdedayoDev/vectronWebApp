"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@components/navbar/navbar";
import "./welcome.css";

export default function Welcome() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { email, username, firstname, lastname, password, confirmPassword } = form;
  
    // Validation checks
    if (!email || !username || !firstname || !lastname || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
  
    if (password.length < 8) {
      setError("Password should be at least 8 characters.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
  
    try {
      const response = await fetch("https://api-staging.vechtron.com/api/v1/auth/account/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          firstname,
          lastname,
          password,
          confirm_password: confirmPassword, // Fixing the field name
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Success: Show a success message
        toast.success(data.message || "Registration successful!");
  
        // Reset the form
        setForm({
          email: "",
          username: "",
          firstname: "",
          lastname: "",
          password: "",
          confirmPassword: "",
        });
  
        // Redirect after a short delay
        setTimeout(() => router.push("/signin"), 2000);
      } else {
        // Handle errors based on API response
        if (data.message?.toLowerCase().includes("user already exists")) {
          setError("A user with this email or username already exists.");
        } else {
          setError(data.message || "Something went wrong.");
        }
        setTimeout(() => setError(""), 3000);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Network error. Please try again later.");
      setTimeout(() => setError(""), 3000);
    }
  };
  
  

  return (
    <>
      {/* <Navbar link="/signin" text="Sign in" icon="/assets/icons/logout.png" /> */}
      <div className="welcome-page">
        <div className="welcome-left">
        <div className="onboarding-left">
          <Image
            src="/assets/images/vech2.png"
            alt="Vectron car"
            width={200}
            height={200}
            className="vech2-image"
          />
        </div>
          <h1 className="welcome-left-header">Turn Every Drive Into a Smarter Journey.</h1>
          <p className="welcome-left-text">Access your AI-powered in-car assistant to navigate smarter, stay connected, and get real-time support on the go. No sign-up hassle. Trusted by drivers worldwide.</p>
        </div>

        <div className="welcome-right">
          <div className="welcome-right-content">
            <h1>Sign Up</h1>
            <p>Start Driving with AI</p>
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

            <form onSubmit={handleSubmit} className="welcome-form">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="hi@email.com"
                id="email"
              />
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                id="username"
              />
              <input
                type="text"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                placeholder="Firstname"
                id="firstname"
              />
              <input
                type="text"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                placeholder="Lastname"
                id="lastname"
              />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                id="password"
              />
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                id="confirmPassword"
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button type="submit">Sign Up</button>
              <span>Already have an account? <Link href="/signin">Signin</Link></span>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} pauseOnHover={false} />
    </>
  );
}
