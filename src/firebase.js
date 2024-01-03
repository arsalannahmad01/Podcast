import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDhfqItNrIhMqfUmb3r6fzU2I2biJ0QKe0",
  authDomain: "podcast-fc912.firebaseapp.com",
  projectId: "podcast-fc912",
  storageBucket: "podcast-fc912.appspot.com",
  messagingSenderId: "388932061864",
  appId: "1:388932061864:web:4aa5ccff71bc8babf6d09d",
  measurementId: "G-0BGJBSSCJ4"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)