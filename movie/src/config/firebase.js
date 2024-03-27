import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCMH0mD5HCfiuqv9tDvWu4QO33pZ2TpOYs",
  authDomain: "movies-2b6fd.firebaseapp.com",
  projectId: "movies-2b6fd",
  storageBucket: "movies-2b6fd.appspot.com",
  messagingSenderId: "562919022414",
  appId: "1:562919022414:web:137889a590b3a0cdfa081f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();