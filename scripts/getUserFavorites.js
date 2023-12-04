import { getFavorites } from "./getFavorites.js";

async function getUserFavorites(id) {
  const favorites = await getFavorites();
  const userFavorites = favorites.filter(f => f.userId === id);

  return userFavorites;
}

export { getUserFavorites };