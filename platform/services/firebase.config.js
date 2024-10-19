// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByJYnXljTnjt4xgh3Hn_FBb3nTtwKobTk",
  authDomain: "asset-hq.firebaseapp.com",
  projectId: "asset-hq",
  storageBucket: "asset-hq.appspot.com",
  messagingSenderId: "575101845163",
  appId: "1:575101845163:web:177618990bd32ef8fc01ee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
