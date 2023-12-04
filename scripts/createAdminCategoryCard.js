import { collection, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { db } from "./firebaseInit.js";

import { listCategories } from "../pages/categories/categories.js";

import { error, success } from "./toast.js";

function createAdminCategoryCard(category) {
  const { id, name } = category;

  const categoriesList = document.getElementById("categories-list");

  const handleDeleteCategory = async (id) => {
    try {
      const categoriesRef = collection(db, "categories");

      const docRefToDelete = doc(categoriesRef, id);

      await deleteDoc(docRefToDelete);

      success("Categoria deletada com sucesso");

      await listCategories();
    } catch (err) {
      console.error(err);
      error("Ocorreu um erro ao deletar a categoria");
    }
  }

  const categoryCard = document.createElement("article");
  categoryCard.className = "w-full bg-white flex items-center justify-between gap-1 overflow-hidden border-b border-gray-300 py-8 last:border-b-0";
  categoryCard.innerHTML = `
    <p>${name}</p>
    <button type="button" title="Remover categoria">
      <i class="ph ph-x"></i>
    </button>
  `;

  const deleteButton = categoryCard.querySelector("button");
  deleteButton.addEventListener("click", () => handleDeleteCategory(id));

  categoriesList.appendChild(categoryCard);
}

export { createAdminCategoryCard };