let currentStream = null;

// Mengambil daftar webcam
export async function getWebcamList() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === "videoinput");
}

// Memulai kamera dengan deviceId tertentu
export async function startCamera(videoElement, deviceId) {
  // Hentikan stream sebelumnya jika ada
  if (currentStream) {
    currentStream.getTracks().forEach((track) => track.stop());
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: deviceId ? { deviceId: { exact: deviceId } } : true,
    });
    videoElement.srcObject = stream;
    currentStream = stream;
    console.log("Kamera berhasil dijalankan:", deviceId);
  } catch (err) {
    console.error("Gagal mengakses kamera:", err);
  }
}

// Menangkap frame dari video dan konversi ke blob
export function captureFrame(
  videoElement,
  canvasElement,
  targetWidth = 320,
  targetHeight = 240
) {
  // Sesuaikan ukuran canvas dengan target
  canvasElement.width = targetWidth;
  canvasElement.height = targetHeight;

  const ctx = canvasElement.getContext("2d");
  ctx.drawImage(videoElement, 0, 0, targetWidth, targetHeight);

  return new Promise((resolve) => {
    canvasElement.toBlob((blob) => {
      resolve(blob);
    }, "image/jpeg");
  });
}
