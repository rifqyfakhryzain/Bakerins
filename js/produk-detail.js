// ==========================================
// 1. DATA PRODUK (Harus sama dengan produk.js)
// ==========================================
const productsData = [
  // Kategori: ES
  { 
    name: "Es Jeruk", 
    price: "Rp 1.000", 
    img: "img/jeruk.jpg",
    desc: "Kesegaran jeruk peras asli dengan manis yang pas. Cocok banget buat ngilangin dahaga di siang bolong!"
  },
  { 
    name: "Es Matcha", 
    price: "Rp 1.000", 
    img: "img/matcha.jpg",
    desc: "Nikmatnya es matcha creamy dengan aroma khas teh hijau Jepang yang menenangkan."
  },
  { 
    name: "Es Vanilla", 
    price: "Rp 1.000", 
    img: "img/vanilla.jpg",
    desc: "Aroma vanilla yang lembut berpadu dengan susu creamy. Manisnya bikin mood balik lagi!"
  },
  { 
    name: "Es Cappucino", 
    price: "Rp 1.000", 
    img: "img/cappucino.jpg",
    desc: "Kopi Cappucino yang strong tapi tetap creamy. Penambah semangat buat ngerjain tugas."
  },
  { 
    name: "Es ChocoCream", 
    price: "Rp 1.000", 
    img: "img/choco_cream.jpg",
    desc: "Perpaduan coklat pekat dan krim lembut. Leleh di mulut, nyess di tenggorokan."
  },
  { 
    name: "Es Alpukat", 
    price: "Rp 1.000", 
    img: "img/alpukat.jpg",
    desc: "Rasa alpukat mentega yang gurih manis. Teksturnya kental dan bikin kenyang."
  },
  { 
    name: "Es Mangga", 
    price: "Rp 1.000", 
    img: "img/mangga.jpg",
    desc: "Sensasi mangga harum manis yang tropical banget. Berasa lagi liburan di pantai."
  },
  { 
    name: "Es Coklat", 
    price: "Rp 1.000", 
    img: "img/coklat.jpg",
    desc: "Es coklat klasik yang nyoklat banget. Favorit sejuta umat dari masa ke masa."
  },
  { 
    name: "Es Jambu", 
    price: "Rp 1.000", 
    img: "img/jambu.jpg",
    desc: "Jus jambu merah asli yang kaya vitamin C. Sehat dan menyegarkan."
  },
  { 
    name: "Milo", 
    price: "Rp 1.000", 
    img: "img/milo.jpg",
    desc: "Rasa Milo original yang khas malt dan coklatnya. Energi untuk aktivitasmu!"
  },
  { 
    name: "Bubur Kacang", 
    price: "Rp 1.000", 
    img: "img/buburkacang.jpg",
    desc: "Bubur kacang hijau legendaris yang dibekukan. Sehat, enak, dan nostalgik!"
  },
  
  // Kategori: KUE
  { 
    name: "Bolu Pisang", 
    price: "Rp 50.000", 
    img: "img/bolupisang.jpg",
    desc: "Bolu pisang (Banana Cake) premium. Tekstur super lembut, aroma pisang alami wangi semerbak."
  },
  { 
    name: "Brownies", 
    price: "Rp 50.000", 
    img: "img/brownies.jpg",
    desc: "Brownies panggang dengan tekstur fudgy di dalam, crunchy di luar. Nyoklat abis!"
  }
];

// ==========================================
// 2. LOGIC TAMPILKAN DETAIL
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Ambil Parameter URL (contoh: ?produk=Es%20Jeruk)
  const urlParams = new URLSearchParams(window.location.search);
  const productName = urlParams.get('produk');

  // 2. Cari Data Produk yang Sesuai
  const product = productsData.find(p => p.name === productName);

  if (product) {
    // 3. Jika ketemu, isi ke HTML
    document.getElementById('produkNama').textContent = product.name;
    document.getElementById('produkHarga').textContent = product.price;
    document.getElementById('produkDeskripsi').textContent = product.desc;
    
    // Handle Gambar
    const imgEl = document.getElementById('produkGambar');
    imgEl.src = product.img;
    imgEl.onerror = () => { imgEl.src = 'https://placehold.co/600x600?text=No+Image'; };

    // Update Link WhatsApp Otomatis
    const jam = new Date().getHours();
    const sapaan = jam < 11 ? "Pagi" : jam < 15 ? "Siang" : jam < 19 ? "Sore" : "Malam";
    const pesan = `Halo kak, selamat ${sapaan}! Saya mau pesan *${product.name}* nih. Masih ada?`;
    
    // Ganti nomor WA di sini
    const noHP = "6282115842517"; 
    document.getElementById('whatsappLink').href = `https://wa.me/${noHP}?text=${encodeURIComponent(pesan)}`;

    // Update Title Halaman Browser
    document.title = `${product.name} - Bakerins`;
  } else {
    // 4. Jika produk tidak ditemukan (atau user buka file langsung tanpa klik)
    document.querySelector('section').innerHTML = `
        <div class="text-center w-full py-20">
            <h2 class="text-4xl font-bold text-gray-300 mb-4">Produk Tidak Ditemukan 😭</h2>
            <a href="produk.html" class="text-pink-500 font-bold underline">Kembali ke Menu</a>
        </div>
    `;
  }
});