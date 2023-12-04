import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDhIK7Ct05_DaE8swkRUjudpJrwnHc2Ug4",
  authDomain: "ifium-2e32c.firebaseapp.com",
  projectId: "ifium-2e32c",
  storageBucket: "ifium-2e32c.appspot.com",
  messagingSenderId: "121811950268",
  appId: "1:121811950268:web:30f15080ebb4d99e750eb9",
  measurementId: "G-QSC5E40VEQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };