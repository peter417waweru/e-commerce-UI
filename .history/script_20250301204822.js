const products = document.querySelectorAll(".product");
const categoryFilter = document.getElementById("categoryFilter");
const sortOptions = document.getElementById("sortOptions");
const productList = document.getElementById("productList");

console.log("Products found:", products.length);
console.log("Category filter:", categoryFilter);
console.log("Sort options:", sortOptions);
console.log("Product list:", productList);

categoryFilter.addEventListener("change", filterAndSort);
sortOptions.addEventListener("change", filterAndSort);

function filterAndSort() {
  const category = categoryFilter.value;
  const sort = sortOptions.value;
  console.log(`Filtering by category: ${category}, sorting by: ${sort}`);

  let filtered = Array.from(products);
  if (category !== "all") {
    filtered = filtered.filter(p => p.dataset.category === category);
  }
  console.log("Filtered products count:", filtered.length);

  filtered.sort((a, b) => {
    if (sort === "price-asc") return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
    if (sort === "price-desc") return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
    if (sort === "rating-desc") return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
    return 0;
  });
  console.log("Sorted order:", filtered.map(p => p.textContent.trim()));

  products.forEach(p => p.classList.add("hidden"));
  filtered.forEach(p => {
    p.classList.remove("hidden");
    productList.appendChild(p);
  });
  console.log("Display updated, visible products:", filtered.length);
}

filterAndSort();

document.addEventListener("DOMContentLoaded", () => {
    const pagination = document.querySelector(".pagination");
    const pageItems = pagination.querySelectorAll(".page-item");
    const totalPages = pageItems.length - 2;
  
    const currentPageItem = pagination.querySelector(".page-item.active");
    const currentPage = parseInt(currentPageItem.textContent);
  
    const previous = pageItems[0]; 
    if (currentPage === 1) {
      previous.classList.add("disabled");
      previous.querySelector(".page-link").removeAttribute("href");
    } else {
      previous.querySelector(".page-link").href = `?page=${currentPage - 1}`;
    }
  
    const next = pageItems[pageItems.length - 1]; 
    if (currentPage === totalPages) {
      next.classList.add("disabled");
      next.querySelector(".page-link").removeAttribute("href");
    } else {
      next.querySelector(".page-link").href = `?page=${currentPage + 1}`;
    }
  });