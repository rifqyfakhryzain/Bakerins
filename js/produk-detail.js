// js/produk-detail.js

// Data produk (bisa kamu tambah sesuka hati)
const dataProduk = {
  
  // Produk 1
  "Es Jeruk": {
    harga: "Rp 1.000",
    deskripsi: "Es coklat lezat dengan rasa autentik, dibuat dari coklat pilihan terbaik.",
    gambar: "img/jeruk.jpg"
  },

  // PProduk 2
  "Es Matcha": {
    harga: "Rp 1.000",
    deskripsi: "Nikmatnya es matcha dengan aroma khas teh hijau yang menyegarkan.",
    gambar: "img/matcha.jpg"
  },

  // Produk 3
  "Es Vanilla": {
    harga: "Rp 1.000",
    deskripsi: "Nikmatnya es matcha dengan aroma khas teh hijau yang menyegarkan.",
    gambar: "img/vanilla.jpg"
  },

  // Produk 4
  "Es Cappucino": {
    harga: "Rp 1.000",
    deskripsi: "Nikmatnya es matcha dengan aroma khas teh hijau yang menyegarkan.",
    gambar: "img/cappucino.jpg"
  },
  
  // Produk 5
  "Es ChocoCream": {
    harga: "Rp 1.000",
    deskripsi: "Nikmatnya es matcha dengan aroma khas teh hijau yang menyegarkan.",
    gambar: "img/choco_cream.jpg"
  },
  
  // Produk 6
  "Es Alpukat": {
    harga: "Rp 1.000",
    deskripsi: "Nikmatnya es matcha dengan aroma khas teh hijau yang menyegarkan.",
    gambar: "img/alpukat.jpg"
  },

  // Produk 7
  "Es Mangga": {
    harga: "Rp 1.000",
    deskripsi: "Nikmatnya es matcha dengan aroma khas teh hijau yang menyegarkan.",
    gambar: "img/mangga.jpg"
  },

  // Produk 8
  "Bubur Kacang": {
    harga: "Rp 1.000",
    deskripsi: "Nikmatnya es matcha dengan aroma khas teh hijau yang menyegarkan.",
    gambar: "img/buburkacang.jpg"
  },

  // Produk 9
  "Es Coklat": {
    harga: "Rp 1.000",
    deskripsi: "Nikmatnya es matcha dengan aroma khas teh hijau yang menyegarkan.",
    gambar: "img/coklat.jpg"
  },

  // Produk 10
  "Es Jambu": {
    harga: "Rp 1.000",
    deskripsi: "Nikmatnya es matcha dengan aroma khas teh hijau yang menyegarkan.",
    gambar: "img/jambu.jpg"
  },

  "Bolu Pisang": {
    harga: "Rp45.000",
    deskripsi: "Bolu pisang lembut dengan aroma manis alami, cocok untuk teman minum teh.",
    gambar: "https://images.unsplash.com/photo-1610878180933-1234567890ab"
  },
  "Kue Lapis": {
    harga: "Rp30.000",
    deskripsi: "Kue lapis tradisional dengan lapisan warna cantik dan rasa manis lembut.",
    gambar: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f"
  }
};

// Fungsi utama untuk menampilkan detail produk
function loadDetailProduk() {
  const urlParams = new URLSearchParams(window.location.search);
  const namaProduk = urlParams.get('produk');

  if (namaProduk && dataProduk[namaProduk]) {
    const produk = dataProduk[namaProduk];

    document.getElementById('produkNama').textContent = namaProduk;
    document.getElementById('produkHarga').textContent = produk.harga;
    document.getElementById('produkDeskripsi').textContent = produk.deskripsi;
    document.getElementById('produkGambar').src = produk.gambar;

    document.getElementById('whatsappLink').href =
      `https://wa.me/6282115842517?text=Halo%20saya%20mau%20pesan%20${encodeURIComponent(namaProduk)}`;
  }

  // Popup gambar
  const produkGambar = document.getElementById("produkGambar");
  const popup = document.getElementById("popupGambar");
  const gambarPopupSrc = document.getElementById("gambarPopupSrc");

  produkGambar.addEventListener("click", () => {
    gambarPopupSrc.src = produkGambar.src;
    popup.classList.remove("hidden");
    popup.classList.add("flex");
  });

  // Tutup popup jika klik di luar gambar
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("flex");
      popup.classList.add("hidden");
    }
  });

  // Tutup popup pakai tombol ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      popup.classList.remove("flex");
      popup.classList.add("hidden");
    }
  });
}

// Jalankan fungsi setelah halaman siap
document.addEventListener("DOMContentLoaded", loadDetailProduk);
