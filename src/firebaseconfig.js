import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjgQRz0vR3KQ92mnHiKniFATote72_zQI",
  authDomain: "major1-14516.firebaseapp.com",
  projectId: "major1-14516",
  storageBucket: "major1-14516.firebasestorage.app",
  messagingSenderId: "151379071013",
  appId: "1:151379071013:web:110663fbf12682cce6efcc",
  measurementId: "G-B6N51G28EY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services for use in the app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
