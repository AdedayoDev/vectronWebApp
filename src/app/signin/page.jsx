"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./SignIn.css";
import Link from "next/link";

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (form.password.length <= 12) {
      setError("");
    } else {
      setError("Password should be at least 12 characters");
    }
  };

  const handleSubmit = (e) => {
    if (password.length <= 12) {
      alert("Logged in");
    }
    e.preventDefault();
  };

  return (
    <div>
      <div className="welcome-page">
        <div className="welcome-left">
          <Image
            src="/assets/images/bg-signin.png"
            alt="signin image"
            width={500}
            height={500}
            objectFit="cover"
          />
          <div className="welcome-left-text">
            Revolutionize your chats with AI-powered conversations.
          </div>
        </div>
        <div className="welcome-right">
          <Link href="/">
            {" "}
            New account
            <Image
              src="/assets/icons/logout.png"
              alt="icon"
              width={30}
              height={30}
            />
          </Link>
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
            <div className="welcome-line">
                <hr />
                <span>Or</span>
                <hr />
              </div>
            <form onSubmit={handleSubmit} className="welcome-form">
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="hi@email.com"
                id="email"
              />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                name={form.password}
                onChange={handleChange}
                placeholder="Password"
                id="password"
                maxLength={12}
              />
              {error && (
                <p style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                  {error}
                </p>
              )}
              <button type="submit">Sign in</button>
              <p className="policy">
                By creating an account, you agree to our Terms of Service and
                Privacy & Cookie Statement.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
