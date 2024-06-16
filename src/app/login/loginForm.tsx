import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

const LogInForm: React.FC = () => {
  return (
    <div className="bg-black min-h-screen"> {/* Apply black background to the entire component */}
      <Navbar />
      <section className="flex flex-col items-center justify-center py-8 px-6 mx-auto h-screen lg:py-0">
        <div className="w-full bg-black rounded-lg shadow border border-white sm:max-w-md xl:p-0"> {/* Black background and white border */}
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 font-medium rounded-lg text-sm px-4 py-2 text-center dark:focus:ring-blue-800">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-800 border border-white text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="your-email@domain.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-800 border border-white text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 font-semibold text-white bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-400">
                Don&apos;t have an account? <Link href="/signup" className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 font-medium rounded-lg text-sm px-1 py-2 text-center dark:focus:ring-blue-800">Signup</Link>
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
