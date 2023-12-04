import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

import { db } from "./firebaseInit.js";

import { error } from "./toast.js";

async function getCategories() {
  try {
    const categories = [];
    const querySnapshot = await getDocs(collection(db, "categories"));

    querySnapshot.forEach((doc) => {
      const data = {
        id: doc.id,
        ...doc.data()
      };

      categories.push(data);
    });

    return categories.sort((a, b) =>  b.name - a.name);
  } catch (err) {
    error("Ocorreu um erro ao buscar as categorias");
    return null;
  }
}

export { getCategories };