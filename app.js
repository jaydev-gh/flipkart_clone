/* ============================================
   FLIPKART CLONE – app.js
   Handles: Carousel, Flash Sale Timer, Products, Cart, Wishlist, Toast
============================================ */

/* ─────────────── PRODUCT DATA ─────────────── */
const flashProducts = [
  { id: 1, name: "Samsung Galaxy S24 Ultra 5G", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/mobile/s/d/u/-original-imaghx9qkumdydfn.jpeg?q=70", price: 74999, original: 134999, off: 44, rating: 4.5, reviews: "12,482", badge: "BESTSELLER" },
  { id: 2, name: "Apple iPhone 15 Pro Max 256GB", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/mobile/g/t/a/-original-imagufhfpzxsrzgv.jpeg?q=70", price: 159999, original: 189900, off: 16, rating: 4.7, reviews: "8,920", badge: "HOT" },
  { id: 3, name: "OnePlus 12R 5G (256GB)", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/mobile/d/g/i/-original-imaghs7dczpf3fwg.jpeg?q=70", price: 39999, original: 49999, off: 20, rating: 4.3, reviews: "6,100" },
  { id: 4, name: "Redmi Note 13 Pro+ 5G", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/mobile/t/k/u/-original-imagtfgegh9kfmfe.jpeg?q=70", price: 29999, original: 44999, off: 33, rating: 4.4, reviews: "9,831", badge: "TRENDING" },
  { id: 5, name: "Poco X6 Pro 5G (12GB RAM)", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/mobile/a/w/l/-original-imags2ghz6ruzfmx.jpeg?q=70", price: 26999, original: 34999, off: 23, rating: 4.2, reviews: "5,412" },
  { id: 6, name: "realme Narzo 70 Pro 5G", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/mobile/r/u/v/-original-imagt4qzyzzr49hf.jpeg?q=70", price: 19999, original: 27999, off: 29, rating: 4.1, reviews: "3,870", badge: "NEW" },
];

const mobileProducts = [
  { id: 7, name: "Google Pixel 8 Pro 256GB", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/mobile/k/t/b/-original-imags6y5zzshkbcm.jpeg?q=70", price: 84999, original: 106999, off: 21, rating: 4.6, reviews: "4,211" },
  { id: 8, name: "Motorola Edge 50 Fusion 5G", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/mobile/n/f/z/-original-imahcq5ggdbzgf5z.jpeg?q=70", price: 24999, original: 32999, off: 24, rating: 4.3, reviews: "7,532", badge: "HOT" },
  { id: 9, name: "iQOO Neo 9 Pro 5G (256GB)", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/mobile/a/c/s/-original-imagsm5jghf2nfpn.jpeg?q=70", price: 36999, original: 44999, off: 18, rating: 4.4, reviews: "2,988" },
  { id: 10, name: "Nothing Phone 2a 5G", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/mobile/o/s/w/-original-imagqqjkfmggcfqt.jpeg?q=70", price: 23999, original: 30999, off: 23, rating: 4.5, reviews: "11,442", badge: "TRENDING" },
  { id: 11, name: "Vivo V30 Pro 5G (256GB)", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/mobile/8/n/k/-original-imagq3gyrb5yjhza.jpeg?q=70", price: 49999, original: 64999, off: 23, rating: 4.2, reviews: "1,850" },
  { id: 12, name: "OPPO Reno 12 Pro 5G", img: "https://rukminim2.flixcart.com/image/612/612/xif0q/mobile/j/d/k/-original-imah48jmzfkbhfhy.jpeg?q=70", price: 36999, original: 45999, off: 20, rating: 4.1, reviews: "2,640", badge: "NEW" },
];

/* ─────────────── CART STATE ─────────────── */
let cartItems = [
  { id: 1, name: "Samsung Galaxy S24", price: 74999, qty: 1, img: "https://rukminim2.flixcart.com/image/612/612/xif0q/mobile/s/d/u/-original-imaghx9qkumdydfn.jpeg?q=70" },
  { id: 2, name: "iPhone 15 Pro Max", price: 159999, qty: 1, img: "https://rukminim2.flixcart.com/image/612/612/xif0q/mobile/g/t/a/-original-imagufhfpzxsrzgv.jpeg?q=70" },
  { id: 3, name: "OnePlus 12R 5G", price: 39999, qty: 1, img: "https://rukminim2.flixcart.com/image/612/612/xif0q/mobile/d/g/i/-original-imaghs7dczpf3fwg.jpeg?q=70" },
];
let wishlist = new Set();

/* ─────────────── HELPERS ─────────────── */
const fmt = n => "₹" + Number(n).toLocaleString("en-IN");

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2500);
}

/* ─────────────── RENDER PRODUCTS ─────────────── */
function renderProducts(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = data.map(p => `
    <div class="product-card" data-id="${p.id}">
      ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ""}
      <button class="product-wish ${wishlist.has(p.id) ? "active" : ""}" onclick="toggleWish(event, ${p.id})">
        <i class="fa-${wishlist.has(p.id) ? "solid" : "regular"} fa-heart"></i>
      </button>
      <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/150'" />
      <div class="product-name">${p.name}</div>
      <div class="product-rating">
        <span class="rating-pill"><i class="fa-solid fa-star fa-xs"></i> ${p.rating}</span>
        <span class="rating-count">(${p.reviews})</span>
      </div>
      <div class="product-price">
        <span class="price-current">${fmt(p.price)}</span>
        <span class="price-original">${fmt(p.original)}</span>
        <span class="price-off">${p.off}% off</span>
      </div>
      <button class="add-cart-btn" onclick="addToCart(event, ${p.id})">
        <i class="fa-solid fa-cart-shopping"></i> Add to Cart
      </button>
    </div>
  `).join("");
}

/* ─────────────── WISHLIST ─────────────── */
function toggleWish(e, id) {
  e.stopPropagation();
  if (wishlist.has(id)) {
    wishlist.delete(id);
    showToast("Removed from Wishlist");
  } else {
    wishlist.add(id);
    showToast("❤️ Added to Wishlist!");
  }
  renderProducts(flashProducts, "flashProducts");
  renderProducts(mobileProducts, "mobileProducts");
}

/* ─────────────── CART ADD ─────────────── */
function addToCart(e, id) {
  e.stopPropagation();
  const all = [...flashProducts, ...mobileProducts];
  const p = all.find(x => x.id === id);
  if (!p) return;

  const existing = cartItems.find(x => x.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cartItems.push({ id: p.id, name: p.name, price: p.price, qty: 1, img: p.img });
  }
  updateCartUI();
  showToast("🛒 Added to Cart!");
}

/* ─────────────── CART UI ─────────────── */
function updateCartUI() {
  const totalQty = cartItems.reduce((s, i) => s + i.qty, 0);
  document.getElementById("cartBadge").textContent = totalQty;
  document.getElementById("cartCount").textContent = totalQty;

  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById("cartTotal").textContent = fmt(total);

  const container = document.getElementById("cartItems");
  container.innerHTML = cartItems.map((item, idx) => `
    <div class="cart-item" data-idx="${idx}">
      <img src="${item.img}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/70'" />
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${fmt(item.price)}</p>
        <div class="cart-qty">
          <button onclick="changeQty(${idx}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${idx}, 1)">+</button>
        </div>
      </div>
      <button class="remove-item" onclick="removeItem(${idx})">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `).join("") || `<div style="text-align:center;color:#878787;padding:40px 0">
      <i class="fa-solid fa-cart-shopping" style="font-size:42px;opacity:0.3;display:block;margin-bottom:12px"></i>
      Your cart is empty
    </div>`;
}

function changeQty(idx, delta) {
  cartItems[idx].qty = Math.max(1, cartItems[idx].qty + delta);
  updateCartUI();
}
function removeItem(idx) {
  cartItems.splice(idx, 1);
  updateCartUI();
  showToast("Item removed from cart");
}

/* ─────────────── CART DRAWER ─────────────── */
function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

/* ─────────────── CAROUSEL ─────────────── */
let currentSlide = 0;
let autoSlideTimer;
const slides = document.querySelectorAll(".carousel-slide");
const track = document.getElementById("carouselTrack");
const dotsContainer = document.getElementById("carouselDots");

function buildDots() {
  slides.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.onclick = () => goToSlide(i);
    dotsContainer.appendChild(d);
  });
}

function goToSlide(n) {
  currentSlide = (n + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("active", i === currentSlide));
  resetTimer();
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function startTimer() { autoSlideTimer = setInterval(nextSlide, 4000); }
function resetTimer() { clearInterval(autoSlideTimer); startTimer(); }

/* ─────────────── COUNTDOWN TIMER ─────────────── */
let saleEnd = Date.now() + (8 * 3600 + 34 * 60 + 21) * 1000;

function updateCountdown() {
  const diff = Math.max(0, saleEnd - Date.now());
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById("hours").textContent = String(h).padStart(2, "0");
  document.getElementById("mins").textContent = String(m).padStart(2, "0");
  document.getElementById("secs").textContent = String(s).padStart(2, "0");
}

/* ─────────────── SEARCH ─────────────── */
document.getElementById("searchInput").addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const q = e.target.value.trim();
    if (q) showToast(`🔍 Searching for "${q}"…`);
  }
});

document.querySelector(".search-btn").addEventListener("click", () => {
  const q = document.getElementById("searchInput").value.trim();
  if (q) showToast(`🔍 Searching for "${q}"…`);
});

/* ─────────────── CATEGORY TABS ─────────────── */
document.querySelectorAll(".cat-item").forEach(item => {
  item.addEventListener("click", e => {
    e.preventDefault();
    document.querySelectorAll(".cat-item").forEach(c => c.classList.remove("active"));
    item.classList.add("active");
  });
});

/* ─────────────── INIT ─────────────── */
document.addEventListener("DOMContentLoaded", () => {
  // Render products
  renderProducts(flashProducts, "flashProducts");
  renderProducts(mobileProducts, "mobileProducts");

  // Carousel
  buildDots();
  startTimer();
  document.getElementById("nextBtn").addEventListener("click", () => goToSlide(currentSlide + 1));
  document.getElementById("prevBtn").addEventListener("click", () => goToSlide(currentSlide - 1));

  // Touch swipe support
  let touchStartX = 0;
  const carousel = document.getElementById("carousel");
  carousel.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) dx < 0 ? nextSlide() : prevSlide();
  }, { passive: true });

  // Cart
  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("closeCart").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);

  // Login btn
  document.getElementById("loginBtn").addEventListener("click", () => showToast("Login modal coming soon!"));

  // Countdown
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Place order
  document.querySelector(".place-order-btn").addEventListener("click", () => {
    if (cartItems.length === 0) { showToast("Your cart is empty!"); return; }
    showToast("🎉 Order Placed Successfully!");
    cartItems = [];
    updateCartUI();
    setTimeout(closeCart, 800);
  });

  // Initial cart render
  updateCartUI();
});
