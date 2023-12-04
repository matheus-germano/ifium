import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

import { db } from "../../scripts/firebaseInit.js";

import { storage } from "../../scripts/storage.js";

import { error, success } from "../../scripts/toast.js";
import { getCategories } from "../../scripts/getCategories.js";

const form = {
  title: () => document.getElementById("title"),
  content: () => document.getElementById("content"),
  categories: () => document.getElementById("categories"),
  createPostBtn: () => document.getElementById("createPostBtn")
}

createPostBtn.addEventListener("click", handleCreatePost);

async function handleCreatePost() {
  createPostBtn.setAttribute("disabled", "true");

  const title = form.title().value;
  const content = form.content().value;
  const category = form.categories().value;
  const createdAt = new Date().getTime();
  const authorId = storage.get("user")?.uid;
  const authorName = storage.get("user")?.displayName;


  if(title.trim() === "" || content.trim() === "") {
    createPostBtn.removeAttribute("disabled");
    error("Preencha o post corretamente");
    return;
  }

  if (category.trim() === "") {
    createPostBtn.removeAttribute("disabled");
    error("Selecione a categoria");
    return;
  }

  try {
    await addDoc(collection(db, "posts"), {
      title,
      content,
      category,
      createdAt,
      authorId,
      authorName
    });

    form.title().value = "";
    form.content().value = "";

    success("Post criado com sucesso");
    // window.location.href = `/post/${firebasePost.key}`;
  } catch(err) {
    console.log(err);
    error("Ocorreu um erro ao criar o post");
  };

  createPostBtn.removeAttribute("disabled");
}

document.addEventListener("DOMContentLoaded", async () => {
  const categories = await getCategories();

  categories.forEach(category => {
    const categoryOption = document.createElement("option");
    categoryOption.value = category.id;
    categoryOption.innerHTML = `${category.name}`;

    form.categories().appendChild(categoryOption);
  });
})