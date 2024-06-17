"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { createAccount, loginUser } from '../../api/auth'; 
import { saveUserDataPoint } from '../../api/app';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import LoadingScreen from '../../components/loading'; // Import the existing loader component

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    setIsLoading(true); // Show the loading screen

    try {
      const createAccountResponse = await createAccount(email, password);
      console.log('Account created:', createAccountResponse);

      try {
        const loginUserResponse = await loginUser({ email, password });
        console.log('Login successful:', loginUserResponse);

        const nameParts = name.trim().split(/\s+/);
        let firstName = '';
        let lastName = '';

        if (nameParts.length > 1) {
          lastName = nameParts.pop() || '';
          firstName = nameParts.join(' ');
        } else {
          firstName = name;
        }

        try {
          const userID = localStorage.getItem('userID');
          if (!userID) {
            throw new Error('User ID not found in local storage');
          }
          console.log("userID", userID);
          await saveUserDataPoint("firstName", firstName, 'replace');

          if (lastName) {
            await saveUserDataPoint("lastName", lastName, 'replace');
          }

          console.log('Name saved successfully');
          // Redirect to the questionnaire or any other appropriate page
          window.location.href = '/questionnaire';
        } catch (error) {
          console.error('Error saving name or redirecting:', error);
        }
      } catch (loginError) {
        console.error("Login failed:", loginError);
      }
    } catch (error) {
      console.error('Sign up or login error:', error);
    } finally {
      setIsLoading(false); // Hide the loading screen
    }
  };

  return (
    <div className="bg-black min-h-screen"> {/* Apply black background to the entire component */}
      <Navbar />
      {isLoading ? (
        <LoadingScreen message="Creating your account" /> // Show the loading screen
      ) : (
        <section className="bg-black min-h-screen flex items-center justify-center"> {/* Black background for the entire component */}
          <div className="w-full bg-black rounded-lg shadow border border-white sm:max-w-md xl:p-0"> {/* Form with white border */}
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 font-medium rounded-lg text-sm px-4 py-2 text-center dark:focus:ring-blue-800">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSignUp}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-white"> {/* White text */}
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-black border border-white text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="your-email@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-white"> {/* White text */}
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-black border border-white text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-white"> {/* White text */}
                    Confirm password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-black border border-white text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-white"> {/* White text */}
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    className="bg-black border border-white text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                      className="w-4 h-4 border border-white rounded bg-gray-800 focus:ring-3 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-300">
                      I accept the<a className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 font-medium rounded-lg text-sm px-1 py-2 text-center dark:focus:ring-blue-800" href="#">Terms and Conditions</a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-400">
                  Already have an account? <Link href="/login" className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 font-medium rounded-lg text-sm px-4 py-2 text-center dark:focus:ring-blue-800">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
};

export default SignUpForm;
