// Script Filter, Search & Pagination (Tema Bakerins Baru)

const searchInput = document.getElementById("searchInput");
const filterBtns = document.querySelectorAll(".filter-btn");
// Mengambil semua elemen dengan class 'produk' yang ada di dalam grid
const produkCards = Array.from(document.querySelectorAll(".produk")); 
const pagination = document.getElementById("pagination");

const produkPerPage = 8; // Kita ubah jadi 8 biar pas grid 4 kolom
let currentPage = 1;

// state
let activeCategory = "all";
let searchQuery = "";

// 🔹 Fungsi util: cek match kategori + search
function isMatch(card) {
  const categoryMatch = activeCategory === "all" || card.dataset.category === activeCategory;
  
  // Ambil nama produk dari elemen h4
  const namaElement = card.querySelector(".nama-produk");
  const nama = namaElement ? namaElement.textContent.toLowerCase() : "";
  const searchMatch = nama.includes(searchQuery);

  return categoryMatch && searchMatch;
}

// 🔹 Terapkan filter ke setiap card → set dataset.show
function applyFilters() {
  produkCards.forEach((card) => {
    // Cari elemen pembungkus <a> terdekat agar yang di-hide satu blok link-nya
    const wrapper = card.closest("a"); 
    if(wrapper) {
        wrapper.dataset.show = isMatch(card) ? "1" : "0";
    }
  });
}

// 🔹 Urutkan produk secara alfabet (A–Z)
// Note: Kita mengurutkan wrapper <a> nya, bukan div .produk-nya saja
function sortAndGetVisible() {
    const wrappers = Array.from(document.querySelectorAll("#produkGrid > a"));
    
    // Filter hanya yang show = 1
    const visible = wrappers.filter(el => el.dataset.show === "1");

    return visible.sort((a, b) => {
        const nameA = a.querySelector(".nama-produk").innerText.toLowerCase();
        const nameB = b.querySelector(".nama-produk").innerText.toLowerCase();
        return nameA.localeCompare(nameB);
    });
}

// 🔹 Render produk sesuai halaman & filter
function renderProduk() {
  // Ambil list wrapper <a> yang visible
  const visibleWrappers = sortAndGetVisible();
  const allWrappers = document.querySelectorAll("#produkGrid > a");

  // Sembunyikan SEMUA dulu
  allWrappers.forEach((el) => {
    el.style.display = "none";
  });

  // Hitung paging
  const start = (currentPage - 1) * produkPerPage;
  const end = start + produkPerPage;

  // Tampilkan hanya yang masuk range halaman ini
  visibleWrappers.slice(start, end).forEach((el) => {
    el.style.display = "block"; // Atau 'block' tergantung layout, grid item biasanya block
    // Tambahkan animasi fade-in
    el.classList.add("aos-animate"); 
  });

  renderPagination(visibleWrappers.length);
}

// 🔹 Render tombol pagination (Desain Pink)
function renderPagination(totalVisible) {
  const totalPages = Math.max(1, Math.ceil(totalVisible / produkPerPage));
  if (currentPage > totalPages) currentPage = 1;

  pagination.innerHTML = "";
  
  // Jika tidak ada produk, jangan tampilkan pagination
  if(totalVisible === 0) {
      pagination.innerHTML = "<span class='text-gray-500'>Produk tidak ditemukan 😔</span>";
      return;
  }

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    
    // Logic warna tombol pagination baru
    if (i === currentPage) {
        btn.className = "px-4 py-2 rounded-xl bg-pink-500 text-white shadow-lg font-bold transform scale-110 transition";
    } else {
        btn.className = "px-4 py-2 rounded-xl bg-white text-gray-600 border border-gray-200 hover:bg-pink-100 hover:text-pink-500 transition";
    }

    btn.addEventListener("click", () => {
      currentPage = i;
      renderProduk();
      // Scroll sedikit ke atas agar user sadar halaman berubah
      document.getElementById("produk").scrollIntoView({ behavior: 'smooth' });
    });
    pagination.appendChild(btn);
  }
}

// 🔹 Handler kategori (Update Warna Tombol Filter)
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Reset semua tombol ke style default (pastel/gray)
    filterBtns.forEach((b) => {
        // Hapus kelas aktif pink
        b.classList.remove("bg-pink-500", "text-white", "shadow-md", "scale-105");
        
        // Kembalikan ke warna default masing-masing (opsional, atau set gray)
        // Disini kita pakai logic simpel: kasih background gray lembut saat tidak aktif
        b.classList.add("bg-gray-100", "text-gray-600");
        
        // Hapus specific pastel colors agar seragam saat inactive (opsional)
        b.classList.remove("bg-blue-100", "text-blue-600", "bg-yellow-100", "text-yellow-700", "bg-green-100", "text-green-700", "bg-red-100", "text-red-600");
    });

    // Set tombol yang diklik jadi Pink Active
    btn.classList.remove("bg-gray-100", "text-gray-600");
    btn.classList.add("bg-pink-500", "text-white", "shadow-md", "scale-105");

    activeCategory = btn.dataset.category || "all";
    currentPage = 1;
    applyFilters();
    renderProduk();
  });
});

// 🔹 Handler search
searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value.toLowerCase();
  currentPage = 1;
  applyFilters();
  renderProduk();
});

// 🔹 Init pertama
document.addEventListener("DOMContentLoaded", () => {
    applyFilters();
    renderProduk();
});