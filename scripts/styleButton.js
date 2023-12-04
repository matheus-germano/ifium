document.addEventListener("DOMContentLoaded", () => {
  const commonButtons = document.querySelectorAll("[aria-label=commonBtn]");
  
  for (const button of commonButtons) {
    button.classList.add("w-full");
    button.classList.add("bg-green-500");
    button.classList.add("hover:bg-green-700");
    button.classList.add("disabled:bg-gray-100");
    button.classList.add("px-6");
    button.classList.add("h-10");
    button.classList.add("rounded-lg");
    button.classList.add("text-white");
    button.classList.add("font-bold");
    button.classList.add("disabled:text-zinc-400");
    button.classList.add("disabled:cursor-not-allowed");
    button.classList.add("transition-all");
    button.classList.add("flex");
    button.classList.add("items-center");
    button.classList.add("justify-center");
  }

  const googleButtons = document.querySelectorAll("[aria-label=googleBtn]");

  for (const button of googleButtons) {
    button.classList.add("w-full");
    button.classList.add("bg-red-500");
    button.classList.add("hover:bg-red-700");
    button.classList.add("disabled:bg-gray-100");
    button.classList.add("px-6");
    button.classList.add("h-10");
    button.classList.add("rounded-lg");
    button.classList.add("text-white");
    button.classList.add("font-bold");
    button.classList.add("disabled:text-zinc-400");
    button.classList.add("disabled:cursor-not-allowed");
    button.classList.add("transition-all");
    button.classList.add("flex");
    button.classList.add("items-center");
    button.classList.add("justify-center");
  }
});
