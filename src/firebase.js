import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnGW3gauWoKmtnTNBTT5DotWFRvelujh0",
  authDomain: "clone-dffaf.firebaseapp.com",
  projectId: "clone-dffaf",
  storageBucket: "clone-dffaf.appspot.com",
  messagingSenderId: "714357375548",
  appId: "1:714357375548:web:5dbc351c3b7b77a7a23939",
  measurementId: "G-K0V8BQQ0GT",
};
// Use this to initialize the firebase App
const app = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const auth = firebase.auth();
const db = app.firestore();

export { auth, db };
