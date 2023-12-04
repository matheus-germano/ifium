import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

import { db } from "./firebaseInit.js";

import { error } from "./toast.js";

async function getFavorites() {
  try {
    const favorites = [];
    const favoritesQuery = await getDocs(collection(db, "favorites"));

    favoritesQuery.forEach((doc) => {
      const favoriteData = { ...doc.data() };

      const data = {
        id: doc.id,
        ...favoriteData,
      };

      favorites.push(data);
    });

    return favorites;
  } catch (err) {
    error("Ocorreu um erro ao buscar os favoritos");
    return null;
  }
}

export { getFavorites };