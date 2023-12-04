import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

import { db } from "./firebaseInit.js";

import { error } from "./toast.js";

async function getPosts() {
  try {
    const posts = [];
    const categories = [];
    const postsQuery = await getDocs(collection(db, "posts"));
    const categoriesQuery = await getDocs(collection(db, "categories"));

    categoriesQuery.forEach((doc) => {
      const data = {
        id: doc.id,
        ...doc.data()
      };

      categories.push(data);
    });

    postsQuery.forEach((doc) => {
      const postData = { ...doc.data() };
      const postCategory = categories.find(c => c.id === postData.category);

      const data = {
        id: doc.id,
        ...postData,
        categoryName: postCategory?.name ?? ""
      };

      posts.push(data);
    });

    return posts;
  } catch (err) {
    error("Ocorreu um erro ao buscar os posts");
    return null;
  }
}

export { getPosts };