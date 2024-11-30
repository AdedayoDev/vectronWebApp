"use client";
import React, { useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'src/app/welcome/welcome.css';
import Link from "next/link";

export default function Welcome() {
  
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

      // Clear error message after 3 seconds
      setTimeout(() => {
        setError(""); // This should clear the error message
      }, 3000);
    } else {
      setError("Password should be at least 12 characters.");
      // Reset the error after 3 seconds if the password doesn't meet the criteria
      setTimeout(() => {
        setError(""); // This clears the error after 3 seconds
      }, 3000);
    }
  };

  return (
    <>
      <div className="welcome-page">
        <div className="welcome-left">
          <Image
            src="/assets/images/bg-welcome.png"
            alt="welcome image"
            width={470}
            height={500}
            className="welcome-image"
          />
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
            <div class="line-container">
              <div class="line"></div>
              <span class="or-text">OR</span>
              <div class="line"></div>
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
