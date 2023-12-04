import { storage } from "./storage.js";

const user = storage.get("user");
const userRole = user.role;

if (userRole !== "admin") {
  window.location.href = "/pages/home/home.html";
}