import { auth } from "../../scripts/firebaseInit.js";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

import { storage } from "../../scripts/storage.js";
import { error } from "../../scripts/toast.js";
import { getRoles } from "../../scripts/getAdmin.js";
import { getUserFavorites } from "../../scripts/getUserFavorites.js";

const form = {
  signInBtn: () => document.getElementById("signInBtn"),
  signInWithGoogleBtn: () => document.getElementById("signInWithGoogleBtn"),
  name: () => document.getElementById("name"),
  email: () => document.getElementById("email"),
  password: () => document.getElementById("password"),
}

form.signInBtn().addEventListener("click", signIn);

form.signInWithGoogleBtn().addEventListener("click", signInWithGoogle);

function validateFormFields() {
  const email = form.email().value;
  const password = form.password().value;

  if (email === "" || password === "") {
    return false;
  }

  return true;
}

function signIn() {
  const email = form.email().value;
  const password = form.password().value;

  if (!validateFormFields()) {
    error("Preencha os campos corretamente");

    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(async (result) => {
      const roles = await getRoles();
      const userRole = roles.find(r => r.userId === result.user.uid)?.role ?? "common";

      const user = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        role: userRole
      }

      const userFavorites = getUserFavorites(result.user.uid);

      storage.set("user", user);
      storage.set("favorites", userFavorites);

      window.location.href = "/pages/home/home.html";
    })
    .catch((err) => {
      console.log(err);
      error("Ocorreu um erro ao entrar na sua conta");
    });
}

function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const roles = await getRoles();
      const userRole = roles.find(r => r.userId === result.user.uid)?.role ?? "common";

      const user = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        role: userRole
      }

      const userFavorites = getUserFavorites(result.user.uid);

      storage.set("user", user);
      storage.set("favorites", userFavorites);

      window.location.href = "/pages/home/home.html";
    })
    .catch((err) => {
      console.log(err);
      error("Ocorreu um erro ao entrar na sua conta");
    });
}
