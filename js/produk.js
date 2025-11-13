// Script Filter, Search & Pagination

const searchInput = document.getElementById("searchInput");
const filterBtns = document.querySelectorAll(".filter-btn");
const produkCards = Array.from(document.querySelectorAll(".produk")); // div di dalam <a>
const pagination = document.getElementById("pagination");

const produkPerPage = 9;
let currentPage = 1;

// state
let activeCategory = "all";
let searchQuery = "";

// 🔹 Fungsi util: cek match kategori + search
function isMatch(card) {
  const matchCategory =
    activeCategory === "all" || card.dataset.category === activeCategory;

  const nama = card.querySelector(".nama-produk").textContent.toLowerCase();
  const matchSearch = nama.includes(searchQuery);

  return matchCategory && matchSearch;
}

// 🔹 Terapkan filter ke setiap card → set dataset.show
function applyFilters() {
  produkCards.forEach((card) => {
    card.dataset.show = isMatch(card) ? "1" : "0";
  });
}

// 🔹 Urutkan produk secara alfabet (A–Z)
function sortByName(list) {
  return list.sort((a, b) => {
    const nameA = a.querySelector(".nama-produk").textContent.toLowerCase();
    const nameB = b.querySelector(".nama-produk").textContent.toLowerCase();
    return nameA.localeCompare(nameB);
  });
}

// 🔹 Render produk sesuai halaman & filter
function renderProduk() {
  // filter produk yang tampil
  const visible = sortByName(
    Array.from(produkCards).filter((c) => c.dataset.show === "1")
  );

  // sembunyikan semuanya dulu
  produkCards.forEach((card) => {
    const wrapper = card.closest("a");
    if (wrapper) wrapper.style.display = "none";
  });

  // hitung paging
  const start = (currentPage - 1) * produkPerPage;
  const end = start + produkPerPage;

  // tampilkan yang sesuai halaman
  visible.slice(start, end).forEach((card) => {
    const wrapper = card.closest("a");
    if (wrapper) wrapper.style.display = "block";
  });

  renderPagination(visible.length);

  // 🔹 scroll ke atas saat render (misal pindah halaman)
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// 🔹 Render tombol pagination
function renderPagination(totalVisible) {
  const totalPages = Math.max(1, Math.ceil(totalVisible / produkPerPage));
  if (currentPage > totalPages) currentPage = 1;

  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = `px-3 py-1 rounded border ${
      i === currentPage ? "bg-sky-600 text-white" : "bg-gray-200"
    }`;
    btn.addEventListener("click", () => {
      currentPage = i;
      renderProduk();
    });
    pagination.appendChild(btn);
  }
}

// 🔹 Handler kategori
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => {
      b.classList.remove("bg-sky-600", "text-white");
      b.classList.add("bg-gray-200");
    });
    btn.classList.add("bg-sky-600", "text-white");
    btn.classList.remove("bg-gray-200");

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
applyFilters();
renderProduk();
