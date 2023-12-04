import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

import { db } from "./firebaseInit.js";

import { error } from "./toast.js";

async function getRoles() {
  try {
    const roles = [];
    const rolesQuery = await getDocs(collection(db, "roles"));

    rolesQuery.forEach((doc) => {
      const roleData = { ...doc.data() };

      const data = {
        ...roleData,
      };

      roles.push(data);
    });

    return roles;
  } catch (err) {
    error("Ocorreu um erro ao buscar os cargos");
    return null;
  }
}

export { getRoles };