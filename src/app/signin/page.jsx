"use client";
import React, { useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useRouter } from "next/navigation";
import Navbar from "@components/navbar/navbar";
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
    if (name === "password" && value.length <= 12) {
      setError("");
    } else if (name === "password" && value.length > 12) {
      setError("Password should be at least 12 characters.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      setError("Please fill in all fields.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (password.length > 12) {
      setError("Password should be at least 12 characters.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    try {
      // Make API call
      const response = await fetch("https://api-staging.vechtron.com/apispec_1.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to sign in. Please try again.");
      }

      const data = await response.json();

      toast.success("Login successfully!");

      // Clear form
      setForm({
        email: "",
        password: "",
      });

      // Redirect to the onboarding page
      setTimeout(() => {
        router.push("/onboarding");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div>
      <Navbar link="/" text="New account" icon="/assets/icons/logout.png" />
      <div className="signin-page">
        <div className="welcome-left">
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
          <div className="welcome-left-text">
            Revolutionize your chats with AI-powered conversations.
          </div>
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
            </form>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} pauseOnHover={false} />
    </div>
  );
}
