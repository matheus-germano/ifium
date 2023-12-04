import { collection, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { db } from "../../scripts/firebaseInit.js";

import { getCategories } from "../../scripts/getCategories.js";
import { getPosts } from "../../scripts/getPosts.js";

import { createPostCard } from "../../scripts/createPostCard.js";
import { createCategoryBean } from "../../scripts/createCategoryBean.js";
import { storage } from "../../scripts/storage.js";
import { getUserFavorites } from "../../scripts/getUserFavorites.js";

async function listCategories() {
  const categories = await getCategories();

  const categoriesList = document.getElementById("categories-list");
  categoriesList.innerHTML = "";

  if (categories && categories.length > 0) {
    for (const category of categories) {
      if (category.name.trim() !== "") {
        createCategoryBean(category);
      }
    }
  } else {
    categoriesList.insertAdjacentHTML('beforeend', `
      <p>Nenhuma categoria criada no momento</p>
    `);
  }
}

async function listPosts() {
  const postsList = document.getElementById("posts-list");
  const posts = await getPosts();
  const filterValue = document.getElementById("filter").value; // newest | biggest
  const filteredPosts = filterValue === "biggest" ? posts.sort((a, b) => b.content.length - a.content.length) : posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const category = urlParams.get("category");

  postsList.innerHTML = "";

  if (!!category) {
    const categoryPosts = filteredPosts.filter(post => post.categoryName.toLowerCase().includes(decodeURIComponent(category).toLowerCase()));

    if (categoryPosts.length > 0) {
      categoryPosts.forEach(post => {
        postsList.insertAdjacentHTML('beforeend', createPostCard(post));
        const favoriteBtn = document.getElementById(`${post.id}-favoriteBtn`);

        favoriteBtn.addEventListener("click", () => handleFavoritePost(post.id));
      });
    } else {
      postsList.insertAdjacentHTML('beforeend', `
        <p>Nenhuma postagem criada com essa categoria</p>
      `);
    }
  } else {
    if (filteredPosts.length > 0) {
      filteredPosts.forEach(post => {
        postsList.insertAdjacentHTML('beforeend', createPostCard(post));

        const favoriteBtn = document.getElementById(`${post.id}-favoriteBtn`);

        favoriteBtn.addEventListener("click", () => handleFavoritePost(post.id));
      });
    } else {
      postsList.insertAdjacentHTML('beforeend', `
        <p>Nenhuma postagem criada no momento</p>
      `);
    }
  }
}

async function handleFavoritePost(postId) {
  const userId = storage.get("user")?.uid;
  const favoritedPosts = await getUserFavorites(userId);
  const isPostAlreadyFavorited = favoritedPosts && favoritedPosts.length > 0 ? !!favoritedPosts.find(f => f.postId === postId) : false;
  const favoriteBtn = document.getElementById(`${postId}-favoriteBtn`)

  if (isPostAlreadyFavorited) {
    const favoriteId = favoritedPosts.find(f => f.postId === postId).id;
    const favoritesRef = collection(db, "favorites");

    const docRefToDelete = doc(favoritesRef, favoriteId);

    await deleteDoc(docRefToDelete);

    const userFavorites = await getUserFavorites(userId);
    storage.set("favorites", userFavorites);

    favoriteBtn.innerHTML = "";
    favoriteBtn.innerHTML = `<i class="ph ph-heart text-xl"></i>`

    return;
  }

  await addDoc(collection(db, "favorites"), {
    postId,
    userId
  });

  const userFavorites = await getUserFavorites(userId);
  storage.set("favorites", userFavorites);

  favoriteBtn.innerHTML = "";
    favoriteBtn.innerHTML = `<i class="ph-fill ph-heart text-xl"></i>`
}

document.addEventListener("DOMContentLoaded", async () => {
  const filterSelect = document.getElementById("filter");
  filterSelect.addEventListener("change", async () => await listPosts());

  await listPosts();
  await listCategories();
});