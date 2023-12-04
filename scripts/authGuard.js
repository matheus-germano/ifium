import { auth } from "./firebaseInit.js";

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "../../index.html";
  }
})