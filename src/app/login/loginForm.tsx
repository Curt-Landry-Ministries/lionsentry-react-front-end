"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Global/Navbar";
import Footer from "../../components/Global/Footer";
import { login } from "@/lib/auth/actions";

const LogInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // State to handle login errors
  const [loading, setLoading] = useState(false); // State to handle loading state

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); // Start loading
    try {
      await login({ email, password });
    } catch (error) {
      setError("Invalid credentials or login failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen page-gradient-bg dark:page-gradient-bg-dark flex flex-col">
      <Navbar />
      <section className="flex items-center justify-center flex-1">
        <div className="w-full rounded-lg shadow border sm:max-w-md xl:p-0 bg-white dark:bg-black my-48">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="leading-tight tracking-tight md:text-2xl text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 font-medium rounded-lg text-sm px-4 py-2 text-center dark:focus:ring-blue-800">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="your-email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="border sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="main-btn"
                disabled={loading} // Disable button while loading
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
              <p className="text-sm font-light text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 font-medium rounded-lg text-sm px-1 py-2 text-center dark:focus:ring-blue-800"
                >
                  Signup
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LogInForm;
