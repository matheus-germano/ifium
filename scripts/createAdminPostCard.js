import { collection, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { db } from "./firebaseInit.js";

import { listPosts } from "../pages/posts/posts.js";

import { error, success } from "./toast.js";

function createAdminPostCard(post) {
  const { id, title, content, authorName, createdAt } = post;

  const postsList = document.getElementById("posts-list");

  const handleDeletePost = async (id) => {
    try {
      const postsRef = collection(db, "posts");

      const docRefToDelete = doc(postsRef, id);

      await deleteDoc(docRefToDelete);

      success("Postagem deletada com sucesso");

      await listPosts();
    } catch (err) {
      console.error(err);
      error("Ocorreu um erro ao deletar a postagem");
    }
  }

  const postCard = document.createElement("article");
  
  postCard.className = "w-full bg-white flex gap-1 overflow-hidden border-b border-gray-300 py-8 first:pt-4 last:border-b-0";
  postCard.innerHTML = `
    <section class="w-full flex flex-col gap-4">
      <header class="flex gap-1 items-center">
        <h4>Por ${authorName ?? "Sem nome"}</h4>
        <span class="float-right text-zinc-400 text-sm">&#x2022 Postado em ${new Date(createdAt).toLocaleDateString()}</span>
      </header>
      <main class="flex flex-col gap-1">
        <h2 class="text-xl font-bold text-zinc-800">${title}</h2>
        <p class="text-zinc-700 line-clamp-3">${content}</p>
      </main>
    </section>
    <button type="button" title="Remover postagem">
      <i class="ph ph-x"></i>
    </button>
  `;

  const deleteButton = postCard.querySelector("button");
  deleteButton.addEventListener("click", () => handleDeletePost(id));

  postsList.appendChild(postCard);
}

export { createAdminPostCard };