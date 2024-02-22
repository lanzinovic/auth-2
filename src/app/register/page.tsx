"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) => {
    // Basic email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    setError("");

    try {
      const response = await axios.post("/api/register", {
        email,
        password,
        username,
      });

      if (response.status === 200) {
        console.log("User registered successfully");
        // Redirect to login page or show success message
      } else {
        console.error("Error registering user:", response.statusText);
        setError("Error registering user");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Error registering user");
    }
  };
  return (
    <div className="flex flex-col max-h-screen items-center justify-between p-24">
      <div className="bg-[#212121] p-8 rounded shadow-md w-96">
        <h1 className="text-4xl text-center font-semibold mb-8">Register</h1>
        <form onSubmit={handleSubmit} action="/api/register" method="POST">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 text-black"
            placeholder="Username"
            required
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 text-black"
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 text-black"
            placeholder="Password"
            required
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            type="submit"
          >
            Register
          </button>
        </form>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link
          href="/login"
          className="block text-center text-blue-500 hover:underline mt-2"
        >
          Login with an existing account
        </Link>
      </div>
    </div>
  );
}
