// src/lib/app/analytics.ts
"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import configData from './firebaseConfigData';

export const initAnalytics = async (): Promise<void> => {
    try {

        // Initialize Firebase app
        const app = !getApps().length ? initializeApp(configData) : getApp();

        // Initialize Firebase Analytics
        getAnalytics(app);

    } catch (error) {
        // Logging any errors that occur during initialization
        console.error("Error initializing Firebase Analytics:", error);
    }
};
