export function renderAboutPage(container) {
  container.innerHTML = `
    <div class="about-card">
      <img src="img/pesangon.jpg" alt="Ilustrasi Buah" class="about-image" />
      <h2 class="about-title">Tentang Aplikasi</h2>
      <p class="about-text">
        Aplikasi ini dirancang khusus untuk membantu anak-anak belajar mengenali berbagai jenis buah-buahan
        dengan cara yang menyenangkan dan interaktif. Dengan bantuan kamera dan teknologi pengenalan gambar,
        anak-anak dapat langsung melihat dan mengetahui nama buah yang mereka temukan.
      </p>
      <p class="about-text">
        Selain belajar, anak-anak juga diajak bermain sambil mengenal warna, bentuk, dan nama buah dalam suasana yang seru.
        Antarmuka aplikasi dibuat sesederhana mungkin agar mudah digunakan, bahkan oleh anak usia dini.
      </p>
      <p class="about-text">
        Aplikasi ini dibangun menggunakan teknologi web modern seperti 
        <span>JavaScript modular</span>, <span>SPA (Single Page Application)</span>, dan 
        <span>integrasi kamera langsung di browser</span> untuk pengalaman belajar yang maksimal.
      </p>
      <div class="about-footer">
        <strong>Developer:</strong> Tim Sop Buah 🍓🍇🍍
      </div>
    </div>
  `;
}
