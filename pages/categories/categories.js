import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

import { db } from "../../scripts/firebaseInit.js";

import { getCategories } from "../../scripts/getCategories.js";

import { error, success } from "../../scripts/toast.js";
import { createAdminCategoryCard } from "../../scripts/createAdminCategoryCard.js";

const createCategoryBtn = document.getElementById("createCategoryBtn");
createCategoryBtn.addEventListener("click", handleCreateCategory);

export async function listCategories() {
  const categories = await getCategories();

  const categoriesList = document.getElementById("categories-list");
  categoriesList.innerHTML = "";

  if (categories && categories.length > 0) {
    for (const category of categories) {
      if (category.name.trim() !== "") {
        createAdminCategoryCard(category);
      }
    }
  } else {
    categoriesList.insertAdjacentHTML('beforeend', `
      <p>Nenhuma categoria criada no momento</p>
    `);
  }
}

async function handleCreateCategory() {
  createCategoryBtn.setAttribute("disabled", "true");
  const category = document.getElementById("category").value;

  if (category.trim() === "") {
    createCategoryBtn.removeAttribute("disabled");
    error("Preencha o nome da categoria");
    return;
  }

  try {
    await addDoc(collection(db, "categories"), {
      name: category
    });

    document.getElementById("category").value = "";
    success("Categoria criada com sucesso");

    await listCategories();
  } catch(err) {
    error("Ocorreu um erro ao criar a categoria");
  };

  createCategoryBtn.removeAttribute("disabled");
}

document.addEventListener("DOMContentLoaded", async () => {
  await listCategories();
})