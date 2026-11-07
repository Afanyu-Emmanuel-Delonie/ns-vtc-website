import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

let analyticsPromise: Promise<Analytics | undefined> | undefined;

// Analytics needs the browser; this resolves to undefined during SSR or when unsupported.
export function getFirebaseAnalytics() {
  if (typeof window === "undefined") return Promise.resolve(undefined);
  if (!analyticsPromise) {
    analyticsPromise = isSupported().then((supported) =>
      supported ? getAnalytics(app) : undefined
    );
  }
  return analyticsPromise;
}

export default app;
