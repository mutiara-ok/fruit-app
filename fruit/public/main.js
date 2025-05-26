import { renderHomePage } from "./page/home.js";
import { renderAboutPage } from "./page/about.js"; // pastikan file ini ada
import { renderHeader } from "./utils/header.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  app.classList.add("body-offset");

  // Render dan tempatkan header sekali di awal
  const header = renderHeader();
  document.body.insertBefore(header, app);

  // Jalankan router saat halaman pertama kali dimuat
  router();

  // Dengarkan perubahan hash (navigasi SPA)
  window.addEventListener("hashchange", router);
});

function router() {
  const app = document.getElementById("app");
  const hash = location.hash || "#";

  switch (hash) {
    case "#about":
      renderAboutPage(app);
      break;
    case "#":
    default:
      renderHomePage(app);
      break;
  }
}
