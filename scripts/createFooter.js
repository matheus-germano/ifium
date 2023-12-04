function createFooter() {
  const currentYear = new Date().getFullYear();

  return `
    <footer class="w-full h-[60px] border-t-[1px] border-zinc-300 flex items-center justify-center">
      <p class="text-zinc-700 text-sm">
        &copy; ${currentYear} Matheus Germano da Costa. Todos os direitos Reservados
      </p>
    </footer>
  `
}

const body = document.getElementsByTagName("body")[0];

body.insertAdjacentHTML('beforeend', createFooter());