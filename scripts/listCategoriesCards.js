import { categories } from "../../config/constants.js";
import { createAdminCategoryCard } from "./createAdminCategoryCard.js";

document.addEventListener("DOMContentLoaded", async () => {
  const categoriesList = document.getElementById("categories-list");

  for (const category of categories) {
    if (category.name.trim() !== "") {
      categoriesList.insertAdjacentHTML('beforeend', createAdminCategoryCard(category));
    }
  }
});