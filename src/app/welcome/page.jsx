"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; 
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@components/navbar/navbar";
import './Welcome.css'

export default function Welcome() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "password" && value.length <= 12) {
      setError(""); // Reset error when password is valid
    } else if (name === "password" && value.length > 12) {
      setError("Password should be at least 12 characters.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      setError("Please fill in all fields.");
      // Clear the error message after 3 seconds
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (password.length <= 12) {
      // Show success message with Toastify
      toast.success("Login successfully!");

      // Clear form fields
      setForm({
        email: "",
        password: "",
      });

      // Redirect after 2 seconds and ensure error is cleared
      setTimeout(() => {
        router.push("/onboarding");
        setError("");
      }, 2000);
    } else {
      setError("Password should be at least 12 characters.");
      // Clear the error message after 3 seconds
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
    <Navbar link="/signin" text="Sign in" icon='/assets/icons/logout.png' />
      <div className="welcome-page">
        <div className="welcome-left">
          <div className="splide">
            <Splide
              options={{
                type: "loop",
                perPage: 1,
                autoplay: true,
                interval: 3000,
                arrows: false,
                pagination: true,
              }}
              aria-label="My Favorite Images"
            >
              <SplideSlide>
                <Image
                  src="/assets/images/bg-welcome.png"
                  alt="welcome image"
                  width={470}
                  height={500}
                  className="welcome-image"
                />
              </SplideSlide>
              <SplideSlide>
                <Image
                  src="/assets/images/bg-signin.png"
                  alt="welcome image"
                  width={470}
                  height={500}
                  className="welcome-image"
                />
              </SplideSlide>
              <SplideSlide>
                <Image
                  src="/assets/images/bg-welcome.png"
                  alt="welcome image"
                  width={470}
                  height={500}
                  className="welcome-image"
                />
              </SplideSlide>
            </Splide>
          </div>
          <div className="welcome-left-text">
            The potential to enhance customer service and improve business
            efficiency
          </div>
        </div>
        <div className="welcome-right">
          <div className="welcome-right-content">
            <h1>Welcome to Docvantage</h1>
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
              <button type="submit">Join Docvantage</button>
              <p className="policy">
                By creating an account, you agree to our Terms of Service and
                Privacy & Cookie Statement.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Toastify container */}
      <ToastContainer autoClose={2000} pauseOnHover={false} />
    </>
  );
}
