import { type App, getApp, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBagjDQ1frkQH_t3OAM27vYuKk4qmjDUXw",
  authDomain: "learn-36505.firebaseapp.com",
  projectId: "learn-36505",
  storageBucket: "learn-36505.appspot.com",
  messagingSenderId: "971930272636",
  appId: "1:971930272636:web:b6df722ceccf69a70e9af9",
  measurementId: "G-6ZTTPVH51T",
};

const appName = "firebase-admin";
let app: App;
try {
  app = getApp(appName);
} catch {
  app = initializeApp(firebaseConfig, appName);
}

const auth = getAuth(app);
export { auth };
