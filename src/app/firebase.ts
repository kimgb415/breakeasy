// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLxgqW1MnvCLlIFtJp-qLwzRA9V4gjdfc",
  authDomain: "breakeasy.firebaseapp.com",
  databaseURL: "https://breakeasy-default-rtdb.firebaseio.com",
  projectId: "breakeasy",
  storageBucket: "breakeasy.appspot.com",
  messagingSenderId: "980688965508",
  appId: "1:980688965508:web:b8cee31ad41704475e17d1",
  measurementId: "G-FPDDW7R92R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);