// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import configData from './firebaseConfigData';

// Initialize Firebase
const app = !getApps().length ? initializeApp(configData) : getApp();

const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth, app };
