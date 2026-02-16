// ==========================================
// 1. DATA PRODUK (DATABASE MINI)
// ==========================================
const productsData = [
  // Kategori: ES
  { name: "Es Jeruk", category: "es", price: "Rp 1.000", img: "img/jeruk.jpg" },
  { name: "Es Matcha", category: "es", price: "Rp 1.000", img: "img/matcha.jpg" },
  { name: "Es Vanilla", category: "es", price: "Rp 1.000", img: "img/vanilla.jpg" },
  { name: "Es Cappucino", category: "es", price: "Rp 1.000", img: "img/cappucino.jpg" },
  { name: "Es ChocoCream", category: "es", price: "Rp 1.000", img: "img/choco_cream.jpg" },
  { name: "Es Alpukat", category: "es", price: "Rp 1.000", img: "img/alpukat.jpg" },
  { name: "Es Mangga", category: "es", price: "Rp 1.000", img: "img/mangga.jpg" },
  { name: "Es Coklat", category: "es", price: "Rp 1.000", img: "img/coklat.jpg" },
  { name: "Es Jambu", category: "es", price: "Rp 1.000", img: "img/jambu.jpg" },
  { name: "Milo", category: "es", price: "Rp 1.000", img: "img/milo.jpg" },
  { name: "Bubur Kacang", category: "es", price: "Rp 1.000", img: "img/buburkacang.jpg" }, 
  
  // Kategori: KUE
  { name: "Bolu Pisang", category: "kue", price: "Rp 50.000", img: "img/bolupisang.jpg" },
  { name: "Brownies", category: "kue", price: "Rp 50.000", img: "img/brownies.jpg" },
];

// ==========================================
// 2. CONFIG & STATE
// ==========================================
const produkGrid = document.getElementById("produkGrid");
const pagination = document.getElementById("pagination");
const searchInput = document.getElementById("searchInput");
const filterBtns = document.querySelectorAll(".filter-btn");

const itemsPerPage = 8;
let currentPage = 1;
let currentCategory = "all";
let searchQuery = "";

// ==========================================
// 3. LOGIC FILTER & SORT
// ==========================================

function getFilteredData() {
  return productsData.filter(product => {
    const categoryMatch = currentCategory === "all" || product.category === currentCategory;
    const nameMatch = product.name.toLowerCase().includes(searchQuery);
    return categoryMatch && nameMatch;
  }).sort((a, b) => a.name.localeCompare(b.name));
}

// ==========================================
// 4. LOGIC RENDER (TAMPILKAN KE LAYAR)
// ==========================================

function renderGrid() {
  const filtered = getFilteredData();
  produkGrid.innerHTML = "";

  if (filtered.length === 0) {
    produkGrid.innerHTML = `
      <div class="col-span-full text-center py-10">
        <p class="text-xl text-gray-500 font-medium">Yah, produknya nggak ketemu 😔</p>
        <p class="text-gray-400">Coba kata kunci lain ya.</p>
      </div>
    `;
    pagination.innerHTML = "";
    return;
  }

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  if (currentPage > totalPages) currentPage = 1;

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = filtered.slice(start, end);

  paginatedItems.forEach((product, index) => {
    let borderColor = "border-pink-100 hover:border-pink-300";
    if (product.category === 'kue') borderColor = "border-yellow-100 hover:border-yellow-300";
    if (product.category === 'snack') borderColor = "border-red-100 hover:border-red-300";
    if (product.category === 'es') borderColor = "border-blue-100 hover:border-blue-300";

    // PERBAIKAN DI SINI: href mengarah ke 'detail-produk.html'
    const cardHTML = `
      <a href="detail-produk.html?produk=${encodeURIComponent(product.name)}" 
         class="produk-card block bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition transform hover:-translate-y-1 border ${borderColor}"
         data-aos="fade-up" data-aos-delay="${index * 50}">
         
         <div class="h-48 bg-gray-100 rounded-xl mb-4 overflow-hidden relative group">
            <img src="${product.img}" alt="${product.name}" 
                 class="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                 onerror="this.src='https://placehold.co/400x400?text=No+Image'"> 
            <span class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold shadow text-gray-700">
                ${product.price}
            </span>
         </div>

         <div class="text-center md:text-left">
            <h4 class="text-xl font-bold text-gray-800 mb-1 line-clamp-1">${product.name}</h4>
            <p class="text-gray-500 text-sm capitalize">${product.category}</p>
         </div>
      </a>
    `;
    produkGrid.insertAdjacentHTML('beforeend', cardHTML);
  });

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  pagination.innerHTML = "";
  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    
    if (i === currentPage) {
      btn.className = "w-10 h-10 rounded-xl bg-pink-500 text-white shadow-lg font-bold transform scale-110 transition";
    } else {
      btn.className = "w-10 h-10 rounded-xl bg-white text-gray-600 border border-gray-200 hover:bg-pink-100 hover:text-pink-500 transition";
    }

    btn.addEventListener("click", () => {
      currentPage = i;
      renderGrid();
      document.querySelector("section").scrollIntoView({ behavior: 'smooth' });
    });

    pagination.appendChild(btn);
  }
}

// ==========================================
// 5. EVENT LISTENERS
// ==========================================

searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.toLowerCase();
  currentPage = 1;
  renderGrid();
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => {
      b.classList.remove("bg-pink-500", "text-white", "shadow-md", "scale-105");
      b.classList.add("bg-gray-100", "text-gray-600");
    });

    btn.classList.remove("bg-gray-100", "text-gray-600");
    btn.classList.add("bg-pink-500", "text-white", "shadow-md", "scale-105");

    currentCategory = btn.dataset.category;
    currentPage = 1;
    renderGrid();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  renderGrid();
});