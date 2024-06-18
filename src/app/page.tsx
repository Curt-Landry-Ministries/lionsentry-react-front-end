// src/app/pages/HomePage.tsx
import React from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import RootLayout from './layout';

const Home: React.FC = () => {
  return (
    <RootLayout>
      <div>
        <Navbar />
        {/* Main Content */}
        <section className="mx-auto grid min-h-[calc(100vh-300px)] max-w-5xl flex-col items-center justify-center gap-4 py-10 text-center md:py-12">
          <div className="p-4">
            <h1
              className="text-balance bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-blue-500/70 dark:via-purple-500/70 dark:to-pink-500/70 sm:text-5xl md:text-6xl lg:text-7xl"
              style={{
                WebkitTextStroke: '1px white', // Apply a 1px white text stroke around the gradient text
                WebkitTextFillColor: 'transparent', // Ensure the text fill color does not override the gradient
              }}
            >
              Divine Mission Generator
            </h1>
            <p className="text-balance mb-10 mt-4 text-center text-muted-foreground md:text-lg lg:text-xl justify-center ">
            Friends, embark on a journey to uncover your Divine Purpose and Faith Vision with the Divine Mission app. Reflect on your strengths, acknowledge your weaknesses, and take a step toward the unique mission that God has designed just for you. Embrace the extraordinary purpose He has planned for your life, and let the Divine Mission app be your guide in discovering and living out your true calling.
            </p>
            <div className="flex justify-center gap-4">
              <button>
                <Link href="/login">Get Started</Link>
              </button>
            </div>
          </div>
        </section>
        <div className="h-20"></div>
        <Footer />
      </div>
    </RootLayout>
  );
};

export default Home;
