"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import LoadingScreen from "../../components/loading"; // Import the existing loader component
import { login, signup } from "@/lib/auth/actions";
import { useRouter } from "next/navigation";
import { Paths } from "@/lib/constants";
import { saveUserDataPoint } from "@/lib/app/actions";

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    setIsLoading(true); // Show the loading screen

    try {
      const signupResp = await signup({ email, password }); // create account
      console.log("Create account", signupResp);

      try {
        await login({ email, password }, false).then(async (resp) => {
          const nameParts = name.trim().split(/\s+/);
          let firstName = "";
          let lastName = "";

          if (nameParts.length > 1) {
            lastName = nameParts.pop() || "";
            firstName = nameParts.join(" ");
          } else {
            firstName = name;
          }

          await saveUserDataPoint("firstName", firstName, "replace");

          if (lastName) {
            await saveUserDataPoint("lastName", lastName, "replace");
          }

          console.log("Name saved successfully");
          // Redirect to the questionnaire or any other appropriate page
          router.push(Paths.Questionnaire);
        });
      } catch (err) {
        console.error("Login error:", err);
      }
    } catch (err) {
      console.error("Sign up or login error:", err);
    } finally {
      setIsLoading(false); // Hide the loading screen
    }
  };

  return (
    <div className="page-gradient-bg dark:page-gradient-bg-dark min-h-screen flex flex-col">
      {" "}
      <Navbar />
      <section className="flex items-center justify-center flex-1">
        {isLoading ? (
          <LoadingScreen message="Creating your account" /> // Show the loading screen
        ) : (
          <div className="w-full rounded-lg shadow border sm:max-w-md xl:p-0 bg-white dark:bg-black my-48">
            {" "}
            {/* Form with white border */}
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="leading-tight tracking-tight md:text-2xl text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 font-medium rounded-lg text-sm px-4 py-2 text-center dark:focus:ring-blue-800">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSignUp}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium"
                  >
                    {" "}
                    {/* White text */}
                    Email
                  </label>
                  <input
                    type="email"
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
                    {" "}
                    {/* White text */}
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="border sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium"
                  >
                    {" "}
                    {/* White text */}
                    Confirm password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="border sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium"
                  >
                    {" "}
                    {/* White text */}
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    className="border sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border rounded dark:bg-gray-800 focus:ring-3 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light dark:text-gray-300"
                    >
                      I accept the
                      <a
                        className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 font-medium rounded-lg text-sm px-1 py-2 text-center dark:focus:ring-blue-800"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button type="submit" className="main-btn">
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 font-medium rounded-lg text-sm px-4 py-2 text-center dark:focus:ring-blue-800"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default SignUpForm;
