import { storage } from "./storage.js";

function createPostCard(post) {
  const { id, title, content, categoryName, createdAt, authorName } = post;

  const userFavorites = storage.get("favorites"); 
  const isFavorited = userFavorites && userFavorites.length > 0 && !!userFavorites.find(f => f.postId === id) ? (
    `<i class="ph-fill ph-heart text-xl"></i>`
  ) : `<i class="ph ph-heart text-xl"></i>`;

  return `
    <article id="${id}" class="w-full bg-white flex flex-col gap-1 overflow-hidden border-b border-gray-300 py-8 first:pt-4 last:border-b-0">
      <header class="flex gap-1 items-center">
        <h4>Por ${authorName ?? "Sem nome"}</h4>
        <span class="float-right text-zinc-400 text-sm">&#x2022 Postado em ${new Date(createdAt).toLocaleDateString()}</span>
      </header>
      <main class="flex flex-col gap-1">
        <h2 class="text-xl font-bold text-zinc-800">${title}</h2>
        <p class="text-zinc-700 line-clamp-3">${content}</p>
      </main>
      <footer class="flex items-center justify-between mt-4">
        <section
          id="post-categories"
        >
          <a
            href="/pages/home/home.html?category=${categoryName}"
            class="text-zinc-600 py-2 px-4 bg-zinc-200 rounded-full no-underline hover:bg-zinc-300"
          >
            ${categoryName}
          </a>
        </section>
        <button id="${id}-favoriteBtn" title="Favoritar post">
          ${isFavorited}
        </button>
      </footer>
    </article>
  `
}

export { createPostCard };