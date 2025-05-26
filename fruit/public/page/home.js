import { getWebcamList, startCamera, captureFrame } from "../utils/camera.js";

export function renderHomePage(container) {
  container.innerHTML = `
    <div class="welcome-section with-bg">
      <div class="welcome-text position-absolute top-50 start-50 translate-middle text-black text-center">
        <h3>Selamat Datang</h3>
      </div>
    </div>

    <div class="camera-container text-center" style="padding: 100px 20px 20px;">
      <h2 class="mb-3">Camera Page</h2>
      <select id="cameraSelect" class="form-select mb-3" style="max-width: 400px; margin: 0 auto;"></select>
      <video id="video" autoplay playsinline class="video-preview mb-3"></video>
      <button id="captureBtn" class="capture btn btn-success mb-3">Capture</button>
      <canvas id="canvas" style="display: none;"></canvas>
      <div id="result" class="mt-3 text-center fw-bold"></div>
    </div>

    <footer class="text-center text-white bg-dark py-5 mt-5" style="font-size: 1.5rem;">
      <div>© 2025 Aplikasi Kamera | Dibuat dengan ❤️</div>
    </footer>
  `;

  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const result = document.getElementById("result");
  const cameraSelect = document.getElementById("cameraSelect");
  const captureBtn = document.getElementById("captureBtn");

  // Ambil daftar kamera dan isi ke dropdown
  getWebcamList().then((cameras) => {
    if (cameras.length === 0) {
      result.textContent = "Tidak ada kamera yang ditemukan.";
      return;
    }

    cameras.forEach((cam, i) => {
      const opt = document.createElement("option");
      opt.value = cam.deviceId;
      opt.text = cam.label || `Camera ${i + 1}`;
      cameraSelect.appendChild(opt);
    });

    // Start kamera pertama
    startCamera(video, cameras[0].deviceId);
  });

  // Ganti kamera jika user memilih dari dropdown
  cameraSelect.addEventListener("change", () => {
    startCamera(video, cameraSelect.value);
  });

  // Tombol capture ditekan
  captureBtn.addEventListener("click", async () => {
    if (!video.videoWidth || !video.videoHeight) {
      result.textContent = "Kamera belum siap. Silakan tunggu sebentar.";
      return;
    }

    try {
      const blob = await captureFrame(
        video,
        canvas,
        video.videoWidth,
        video.videoHeight
      );

      const formData = new FormData();
      formData.append("photo", blob, "capture.jpg");

      const res = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      result.textContent = "Hasil: " + data.prediction;
    } catch (error) {
      console.error("Gagal mengirim gambar:", error);
      result.textContent = "Terjadi kesalahan saat mengirim gambar.";
    }
  });
}
