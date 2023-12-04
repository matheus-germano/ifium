import { auth } from "./firebaseInit.js";
import { success } from "./toast.js";

function signOut() {
  auth.signOut().then(() => {
    localStorage.clear();

    window.location.href = "/pages/signIn/sign-in.html";

    success("Sucesso ao sair da conta");
  }).catch((error) => {
    error("Ocorreu um erro ao tentar sair da sua conta");
  });
}

export { signOut };