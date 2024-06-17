// src/components/loading.tsx

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  message: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <motion.div
        className="flex space-x-4"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        <motion.div
          className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: 0.3,
          }}
        />
      </motion.div>
      <p className="mt-14 text-white text-lg">{message}</p>
    </div>
  );
};

export default LoadingScreen;
