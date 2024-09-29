// src/app/providers/analyticsProvider.tsx
'use client';

import { useEffect } from 'react';
import { getAnalytics } from 'firebase/analytics';
import { app } from '@/lib/firebase/firebaseConfig'; // Adjust the import path as needed

const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      getAnalytics(app);
    }
  }, []);

  return <>{children}</>;
};

export default AnalyticsProvider;
