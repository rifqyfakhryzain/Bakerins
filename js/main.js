// Filter & Search
  const searchInput = document.getElementById('searchInput');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const produkCards = document.querySelectorAll('.produk');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-sky-500', 'text-white');
        b.classList.add('bg-gray-200', 'text-gray-800');
      });

      btn.classList.remove('bg-gray-200', 'text-gray-800');
      btn.classList.add('bg-sky-500', 'text-white');

      const category = btn.dataset.category;
      produkCards.forEach(card => {
        card.style.display = (category === 'all' || card.dataset.category === category)
          ? 'block'
          : 'none';
      });

      AOS.refresh();
    });
  });

  searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    produkCards.forEach(card => {
      const nama = card.querySelector('.nama-produk').textContent.toLowerCase();
      card.style.display = nama.includes(searchValue) ? 'block' : 'none';
    });
  });