import { auth } from "../../scripts/firebaseInit.js";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

import { storage } from "../../scripts/storage.js";
import { error, success } from "../../scripts/toast.js";
import { getRoles } from "../../scripts/getAdmin.js";

const form = {
  signUpBtn: () => document.getElementById("signUpBtn"),
  signUpWithGoogleBtn: () => document.getElementById("signUpWithGoogleBtn"),
  name: () => document.getElementById("name"),
  email: () => document.getElementById("email"),
  password: () => document.getElementById("password"),
}

form.signUpBtn().addEventListener("click", signUp);

form.signUpWithGoogleBtn().addEventListener("click", signUpWithGoogle);

function validateFormFields() {
  const name = form.name().value;
  const email = form.email().value;
  const password = form.password().value;

  if (name === "" || email === "" || password === "") {
    return false;
  }

  return true;
}

function signUp() {
  const email = form.email().value;
  const password = form.password().value;

  if (!validateFormFields()) {
    error("Preencha os campos corretamente");

    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
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

      storage.set("user", user);

      window.location.href = "/pages/home/home.html";

      success("Cadastro realizado com sucesso");
    })
    .catch((err) => {
      console.error(err);
      error("Ocorreu um erro ao realizar o cadastro");
    });
}

function signUpWithGoogle() {
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

      storage.set("user", user);

      window.location.href = "/pages/home/home.html";

      success("Cadastro realizado com sucesso");
    })
    .catch((error) => {
      error("Ocorreu um erro ao realizar o cadastro");
    });
}