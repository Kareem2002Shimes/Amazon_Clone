import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBnGW3gauWoKmtnTNBTT5DotWFRvelujh0",
  authDomain: "clone-dffaf.firebaseapp.com",
  databaseURL: "https://clone-dffaf-default-rtdb.firebaseio.com",
  projectId: "clone-dffaf",
  storageBucket: "clone-dffaf.appspot.com",
  messagingSenderId: "714357375548",
  appId: "1:714357375548:web:5dbc351c3b7b77a7a23939",
  measurementId: "G-K0V8BQQ0GT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
