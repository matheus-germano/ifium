import { storage } from "./storage.js";

import { signOut } from "./signOut.js";

function createNavbar() {
  const isUserAdmin = storage.get("user")?.role === "admin";
  const adminMenu = isUserAdmin ? `
    <ul class="flex">
      <li class="px-2 font-bold hover:text-green-500 transition-all">
        <a href="/pages/posts/posts.html">Posts</a>
      </li>
      <li class="px-2 font-bold hover:text-green-500 transition-all">
        <a href="/pages/categories/categories.html">Categorias</a>
      </li>
    </ul>
  ` : ``;

  return `
    <nav class="w-full h-[60px] border-t-[1px] px-4 border-zinc-300 flex items-center justify-between border-b border-zinc-300">
      <a href="/pages/home/home.html" class="flex gap-4">
        <img
          src="../../assets/if-logo.png"
          alt="IF logo"
          width="32px"
        />
        <h1 class="text-3xl font-black">IFIUM</h1>
      </a>
      <section class="flex gap-4">
        ${adminMenu}
        <button
          id="signOutBtn"
        >
          <i class="ph-bold ph-sign-out text-xl"></i>
        </button>
      </section>
    </nav>
  `
}

const body = document.getElementsByTagName("body")[0];
body.insertAdjacentHTML('afterbegin', createNavbar());

const signOutBtn = document.getElementById("signOutBtn");
signOutBtn.addEventListener("click", signOut);