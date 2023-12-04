import { createAdminPostCard } from "../../scripts/createAdminPostCard.js";
import { getPosts } from "../../scripts/getPosts.js";

export async function listPosts() {
  const posts = await getPosts();
  const postsList = document.getElementById("posts-list");
  postsList.innerHTML = "";

  if (posts && posts.length > 0) {
    for (const post of posts) {
      createAdminPostCard(post);
    }
  } else {
    postsList.insertAdjacentHTML('beforeend', `
      <p>Nenhuma postagem criada no momento</p>
    `);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await listPosts();
});