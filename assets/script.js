async function loadPartial(targetId, filePath) {
  const target = document.getElementById(targetId);
  if (!target) return;

  try {
    const response = await fetch(filePath, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}: ${response.status}`);
    }

    const html = await response.text();
    target.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

function activateCurrentMenu() {
  const headerRoot = document.getElementById("site-header-placeholder");
  if (!headerRoot) return;

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = headerRoot.querySelectorAll(".nav a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });
}

function bindMobileMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("is-open")) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 920) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadPartial("site-header-placeholder", "assets/header.html");
  await loadPartial("site-footer-placeholder", "assets/footer.html");
  activateCurrentMenu();
  bindMobileMenu();
});
