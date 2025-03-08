const products = document.querySelectorAll(".product");
const categoryFilter = document.getElementById("categoryFilter");
const sortOptions = document.getElementById("sortOptions");
const productList = document.getElementById("productList");

// Filter function
categoryFilter.addEventListener("change", filterAndSort);
sortOptions.addEventListener("change", filterAndSort);

function filterAndSort() {
  const category = categoryFilter.value;
  const sort = sortOptions.value;

  // Filter
  let filtered = Array.from(products);
  if (category !== "all") {
    filtered = filtered.filter(p => p.dataset.category === category);
  }

  // Sort
  filtered.sort((a, b) => {
    if (sort === "price-asc") return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
    if (sort === "price-desc") return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
    if (sort === "rating-desc") return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
    return 0;
  });

  // Update display
  products.forEach(p => p.classList.add("hidden"));
  filtered.forEach(p => {
    p.classList.remove("hidden");
    productList.appendChild(p); // Reorder DOM
  });
}

filterAndSort();
