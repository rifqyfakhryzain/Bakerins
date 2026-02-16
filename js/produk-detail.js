// js/produk-detail.js

// Data produk Lengkap
const dataProduk = {
  "Es Jeruk": {
    harga: "Rp 1.000",
    deskripsi: "Kesegaran jeruk peras asli dengan manis yang pas. Cocok banget buat ngilangin dahaga di siang bolong!",
    gambar: "img/jeruk.jpg"
  },
  "Es Matcha": {
    harga: "Rp 1.000",
    deskripsi: "Nikmatnya es matcha creamy dengan aroma khas teh hijau Jepang yang menenangkan. Rasa premium harga kawan.",
    gambar: "img/matcha.jpg"
  },
  "Es Vanilla": {
    harga: "Rp 1.000",
    deskripsi: "Aroma vanilla yang lembut berpadu dengan susu creamy. Manisnya bikin mood balik lagi!",
    gambar: "img/vanilla.jpg"
  },
  "Es Cappucino": {
    harga: "Rp 1.000",
    deskripsi: "Kopi Cappucino yang strong tapi tetap creamy. Penambah semangat buat ngerjain tugas.",
    gambar: "img/cappucino.jpg"
  },
  "Es ChocoCream": {
    harga: "Rp 1.000",
    deskripsi: "Perpaduan coklat pekat dan krim lembut. Leleh di mulut, nyess di tenggorokan.",
    gambar: "img/choco_cream.jpg"
  },
  "Es Alpukat": {
    harga: "Rp 1.000",
    deskripsi: "Rasa alpukat mentega yang gurih manis. Teksturnya kental dan bikin kenyang.",
    gambar: "img/alpukat.jpg"
  },
  "Es Mangga": {
    harga: "Rp 1.000",
    deskripsi: "Sensasi mangga harum manis yang tropical banget. Berasa lagi liburan di pantai.",
    gambar: "img/mangga.jpg"
  },
  "Bubur Kacang": {
    harga: "Rp 1.000",
    deskripsi: "Bubur kacang hijau legendaris yang dibekukan. Sehat, enak, dan nostalgik!",
    gambar: "img/buburkacang.jpg"
  },
  "Es Coklat": {
    harga: "Rp 1.000",
    deskripsi: "Es coklat klasik yang nyoklat banget. Favorit sejuta umat dari masa ke masa.",
    gambar: "img/coklat.jpg"
  },
  "Es Jambu": {
    harga: "Rp 1.000",
    deskripsi: "Jus jambu merah asli yang kaya vitamin C. Sehat dan menyegarkan.",
    gambar: "img/jambu.jpg"
  },
  "Milo": {
    harga: "Rp 1.000",
    deskripsi: "Rasa Milo original yang khas malt dan coklatnya. Energi untuk aktivitasmu!",
    gambar: "img/milo.jpg"
  },
  "Bolu Pisang": {
    harga: "Rp 50.000",
    deskripsi: "Bolu pisang (Banana Cake) premium. Tekstur super lembut, aroma pisang alami yang wangi semerbak.",
    gambar: "img/bolupisang.jpg"
  },
  "Brownies": {
    harga: "Rp 50.000",
    deskripsi: "Brownies panggang dengan tekstur fudgy di dalam, crunchy di luar. Nyoklat abis!",
    gambar: "img/brownies.jpg"
  }
};

// Fungsi Membuat Popup Secara Otomatis (Inject HTML)
function createPopupElement() {
    if (!document.getElementById("popupGambar")) {
        const popupHTML = `
            <div id="popupGambar" class="fixed inset-0 bg-black/80 hidden items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300">
                <div class="relative max-w-4xl w-full p-4 flex justify-center">
                    <button id="closePopup" class="absolute top-4 right-4 bg-white text-pink-500 rounded-full w-10 h-10 font-bold shadow-lg hover:bg-pink-500 hover:text-white transition">X</button>
                    <img id="gambarPopupSrc" src="" alt="Preview" class="max-h-[85vh] rounded-2xl shadow-2xl border-4 border-white object-contain">
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', popupHTML);
    }
}

// Fungsi utama untuk menampilkan detail produk
function loadDetailProduk() {
  const urlParams = new URLSearchParams(window.location.search);
  const namaProduk = urlParams.get('produk');

  // Pastikan elemen popup tersedia
  createPopupElement();

  if (namaProduk && dataProduk[namaProduk]) {
    const produk = dataProduk[namaProduk];

    // Isi Data ke Elemen HTML
    const elNama = document.getElementById('produkNama');
    const elHarga = document.getElementById('produkHarga');
    const elDeskripsi = document.getElementById('produkDeskripsi');
    const elGambar = document.getElementById('produkGambar');
    const elWA = document.getElementById('whatsappLink');

    if(elNama) elNama.textContent = namaProduk;
    if(elHarga) elHarga.textContent = produk.harga;
    if(elDeskripsi) elDeskripsi.textContent = produk.deskripsi;
    if(elGambar) elGambar.src = produk.gambar;

    if(elWA) {
        // Pesan WA otomatis
        const jam = new Date().getHours();
        const sapaan = jam < 11 ? "Pagi" : jam < 15 ? "Siang" : jam < 19 ? "Sore" : "Malam";
        const pesan = `Halo kak, selamat ${sapaan}! Saya mau pesan *${namaProduk}* nih. Masih ada?`;
        elWA.href = `https://wa.me/6282115842517?text=${encodeURIComponent(pesan)}`;
    }
  }

  // --- Logic Popup Gambar ---
  const produkGambar = document.getElementById("produkGambar");
  const popup = document.getElementById("popupGambar");
  const gambarPopupSrc = document.getElementById("gambarPopupSrc");
  const closeBtn = document.getElementById("closePopup");

  if (produkGambar && popup && gambarPopupSrc) {
      // Buka Popup
      produkGambar.addEventListener("click", () => {
        gambarPopupSrc.src = produkGambar.src;
        popup.classList.remove("hidden");
        popup.classList.add("flex");
      });

      // Tutup Popup (Klik Background / Tombol X)
      const closeAction = () => {
        popup.classList.remove("flex");
        popup.classList.add("hidden");
      };

      popup.addEventListener("click", (e) => {
        if (e.target === popup) closeAction();
      });

      if(closeBtn) closeBtn.addEventListener("click", closeAction);

      // Tutup pakai ESC
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeAction();
      });
  }
}

// Jalankan fungsi setelah halaman siap
document.addEventListener("DOMContentLoaded", loadDetailProduk);