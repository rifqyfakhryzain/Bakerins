// Script Filter, Search & Pagination

const searchInput = document.getElementById("searchInput");
const filterBtns = document.querySelectorAll(".filter-btn");
const produkCards = document.querySelectorAll(".produk"); // div di dalam <a>
const pagination = document.getElementById("pagination");

const produkPerPage = 9;
let currentPage = 1;

// state
let activeCategory = "all";
let searchQuery = "";

// util: cek match kategori + search
function isMatch(card) {
  const matchCategory =
    activeCategory === "all" || card.dataset.category === activeCategory;

  const nama = card.querySelector(".nama-produk").textContent.toLowerCase();
  const matchSearch = nama.includes(searchQuery);

  return matchCategory && matchSearch;
}

// terapkan filter ke setiap card → set dataset.show
function applyFilters() {
  produkCards.forEach((card) => {
    card.dataset.show = isMatch(card) ? "1" : "0";
  });
}

// render produk sesuai halaman & filter
function renderProduk() {
  const visible = Array.from(produkCards).filter((c) => c.dataset.show === "1");

  // sembunyikan semuanya dulu (sembunyikan <a> pembungkus)
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
}

// render tombol pagination
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

// handler kategori (sekaligus urus style aktif)
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // style aktif
    filterBtns.forEach((b) => {
      b.classList.remove("bg-sky-600", "text-white");
      b.classList.add("bg-gray-200");
    });
    btn.classList.add("bg-sky-600", "text-white");
    btn.classList.remove("bg-gray-200");

    // set state + render
    activeCategory = btn.dataset.category || "all";
    currentPage = 1;
    applyFilters();
    renderProduk();
  });
});

// handler search
searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value.toLowerCase();
  currentPage = 1;
  applyFilters();
  renderProduk();
});

// init
applyFilters();
renderProduk();
