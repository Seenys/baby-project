// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt0FIOEShkGWgL9aAcVGdcW5MyO5MDizs",
  authDomain: "crud-react-7477c.firebaseapp.com",
  databaseURL: "https://crud-react-7477c.firebaseio.com",
  projectId: "crud-react-7477c",
  storageBucket: "crud-react-7477c.appspot.com",
  messagingSenderId: "121884803161",
  appId: "1:121884803161:web:65982fded821748e28f148"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize FireStore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

export { db, auth };