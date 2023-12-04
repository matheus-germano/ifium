function createCategoryBean(category) {
  const { id, name } = category;

  const categoriesList = document.getElementById("categories-list");

  const categoryBean = document.createElement("a");

  categoryBean.className = "text-zinc-600 py-2 px-4 bg-zinc-200 rounded-full no-underline hover:bg-zinc-300";
  categoryBean.href =`/pages/home/home.html?category=${category.name}`
  categoryBean.innerHTML = `${name}`;

  categoriesList.appendChild(categoryBean);
}

export { createCategoryBean };