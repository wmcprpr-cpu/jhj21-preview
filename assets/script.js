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

    // 현재 페이지 메뉴 활성화
    if (targetId === "site-header-placeholder") {
      const currentPage = window.location.pathname.split("/").pop() || "index.html";
      const navLinks = target.querySelectorAll(".nav a");

      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === currentPage) {
          link.style.background = "var(--surface)";
          link.style.color = "var(--primary)";
          link.style.fontWeight = "800";
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadPartial("site-header-placeholder", "assets/header.html");
  await loadPartial("site-footer-placeholder", "assets/footer.html");
});
