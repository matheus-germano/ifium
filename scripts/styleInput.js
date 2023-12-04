document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.getElementsByTagName("input");
  
  for (const input of inputs) {
    input.classList.add("h-[40px]");
    input.classList.add("w-full");
    input.classList.add("bg-white");
    input.classList.add("rounded-lg");
    input.classList.add("border");
    input.classList.add("border-zinc-500");
    input.classList.add("px-4");
    input.classList.add("text-zinc-700");
    input.classList.add("focus:border-green-500");
    input.classList.add("outline-none");
    input.classList.add("transition-all");
  }
});
