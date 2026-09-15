// ── PRODUCT DATA ──────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "Apple MacBook Pro 14-inch M3 Chip, 16GB RAM, 512GB SSD",
    category: "Electronics",
    price: 1599.99,
    originalPrice: 1999.99,
    rating: 4.8,
    reviews: 3241,
    image: "/images/macbook-pro-m3.jpg",
    images: [
      "/images/macbook-pro-m3.jpg",
      "/images/macbook-pro-m3-side.jpg",
      "/images/macbook-pro-m3-open.jpg"
    ],
    prime: true,
    badge: "Best Seller",
    delivery: "FREE delivery Tomorrow",
    brand: "Apple",
    features: [
      "Apple M3 chip with 8-core CPU and 10-core GPU",
      "16GB unified memory, 512GB SSD storage",
      "14.2-inch Liquid Retina XDR display",
      "Up to 18 hours battery life",
      "Compatible with Thunderbolt / USB 4 ports"
    ],
    description: "The most powerful MacBook Pro ever. With M3, you get incredible performance and battery life for pros on the go."
  },
  {
    id: 2,
    name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    category: "Electronics",
    price: 279.99,
    originalPrice: 399.99,
    rating: 4.7,
    reviews: 18742,
    image: "/images/sony-wh1000xm5.jpg",
    images: [
      "/images/sony-wh1000xm5.jpg",
      "/images/sony-wh1000xm5-folded.jpg"
    ],
    prime: true,
    badge: "Deal",
    delivery: "FREE delivery Tomorrow",
    brand: "Sony",
    features: [
      "Industry-leading noise canceling",
      "30-hour battery life",
      "Speak-to-Chat technology",
      "Multipoint connection — pair with 2 devices",
      "Lightweight design at 250g"
    ],
    description: "Experience the next level of noise canceling with the WH-1000XM5."
  },
  {
    id: 3,
    name: "Samsung 65-inch QLED 4K Smart TV QN90C",
    category: "Electronics",
    price: 1097.99,
    originalPrice: 1499.99,
    rating: 4.6,
    reviews: 5921,
    image: "/images/samsung-qled-tv.jpg",
    images: [
      "/images/samsung-qled-tv.jpg"
    ],
    prime: true,
    badge: "Best Seller",
    delivery: "FREE delivery in 2 days",
    brand: "Samsung",
    features: [
      "Quantum HDR 32x, Neo Quantum Processor 4K",
      "Anti-Glare with Ultra Viewing Angle",
      "Object Tracking Sound+",
      "Built-in Alexa and Google Assistant",
      "4 HDMI ports, 2 USB ports"
    ],
    description: "Brilliant Neo QLED picture with unmatched smart TV capabilities."
  },
  {
    id: 4,
    name: "Nike Air Max 270 Men's Running Shoes",
    category: "Clothing",
    price: 89.99,
    originalPrice: 150.00,
    rating: 4.5,
    reviews: 22105,
    image: "/images/nike-air-max-270.jpg",
    images: [
      "/images/nike-air-max-270.jpg",
      "/images/nike-air-max-270-side.jpg"
    ],
    prime: true,
    badge: "Deal",
    delivery: "FREE delivery Tomorrow",
    brand: "Nike",
    features: [
      "Max Air unit in the heel for cushioning",
      "Lightweight mesh upper",
      "Foam midsole for step-in comfort",
      "Rubber outsole for durability",
      "Available in multiple colorways"
    ],
    description: "Style meets comfort with the iconic Air Max 270."
  },
  {
    id: 5,
    name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart",
    category: "Home & Kitchen",
    price: 59.99,
    originalPrice: 99.95,
    rating: 4.7,
    reviews: 145832,
    image: "/images/instant-pot-duo.jpg",
    images: [
      "/images/instant-pot-duo.jpg"
    ],
    prime: true,
    badge: "Best Seller",
    delivery: "FREE delivery Tomorrow",
    brand: "Instant Pot",
    features: [
      "7-in-1: Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Sauté, Yogurt Maker, Warmer",
      "6 quart capacity",
      "14 one-touch smart programs",
      "Stainless steel inner pot",
      "Dishwasher-safe parts"
    ],
    description: "The world's best-selling multi-cooker. Cook up to 70% faster than traditional methods."
  },
  {
    id: 6,
    name: "Kindle Paperwhite 16GB, 6.8-inch display, Adjustable warm light",
    category: "Books",
    price: 139.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviews: 87341,
    image: "/images/kindle-paperwhite.jpg",
    images: [
      "/images/kindle-paperwhite.jpg"
    ],
    prime: true,
    badge: "Amazon's Choice",
    delivery: "FREE delivery Tomorrow",
    brand: "Amazon",
    features: [
      "6.8-inch 300 ppi display",
      "Adjustable warm light",
      "Up to 10 weeks battery life",
      "IPX8 waterproof rating",
      "16GB storage"
    ],
    description: "Our best Paperwhite yet — even better for reading, everywhere."
  },
  {
    id: 7,
    name: "Dyson V15 Detect Cordless Vacuum Cleaner",
    category: "Home & Kitchen",
    price: 649.99,
    originalPrice: 749.99,
    rating: 4.6,
    reviews: 9823,
    image: "/images/dyson-v15.jpg",
    images: [
      "/images/dyson-v15.jpg"
    ],
    prime: false,
    badge: null,
    delivery: "FREE delivery in 2 days",
    brand: "Dyson",
    features: [
      "Laser reveals invisible dust",
      "Automatically optimizes suction",
      "Up to 60 minutes run time",
      "HEPA filtration",
      "LCD screen shows performance in real time"
    ],
    description: "The most intelligent, powerful Dyson cordless vacuum."
  },
  {
    id: 8,
    name: "LEGO Creator 3-in-1 Tropical Parrot Building Set 755 Pieces",
    category: "Toys",
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.9,
    reviews: 6512,
    image: "/images/lego-tropical-parrot.jpg",
    images: [
      "/images/lego-tropical-parrot.jpg"
    ],
    prime: true,
    badge: "Deal",
    delivery: "FREE delivery Tomorrow",
    brand: "LEGO",
    features: [
      "3-in-1 building set",
      "755 pieces",
      "Suitable for ages 9 and up",
      "Build a parrot, crab, or frog",
      "Great display model"
    ],
    description: "Build, rebuild, and display this beautiful 3-in-1 tropical set."
  },
  {
    id: 9,
    name: "Adidas Ultraboost 22 Running Shoes Women's",
    category: "Clothing",
    price: 119.99,
    originalPrice: 190.00,
    rating: 4.6,
    reviews: 11432,
    image: "/images/adidas-ultraboost-22.jpg",
    images: [
      "/images/adidas-ultraboost-22.jpg"
    ],
    prime: true,
    badge: null,
    delivery: "FREE delivery Tomorrow",
    brand: "Adidas",
    features: [
      "Boost midsole for energy return",
      "Primeknit upper",
      "Continental rubber outsole",
      "Lightstrike cushioning",
      "Available in 8 colors"
    ],
    description: "Built to perform from the streets to the track."
  },
  {
    id: 10,
    name: "The Psychology of Money: Timeless lessons on wealth",
    category: "Books",
    price: 14.99,
    originalPrice: 24.99,
    rating: 4.8,
    reviews: 54210,
    image: "/images/psychology-of-money.jpg",
    images: [
      "/images/psychology-of-money.jpg"
    ],
    prime: true,
    badge: "Best Seller",
    delivery: "FREE delivery Tomorrow",
    brand: "Harriman House",
    features: [
      "Paperback, 256 pages",
      "Author: Morgan Housel",
      "Bestselling personal finance book",
      "Available in Kindle, Audible, and Hardcover",
      "Translated into 50+ languages"
    ],
    description: "Doing well with money isn't necessarily about what you know. It's about how you behave."
  },
  {
    id: 11,
    name: "Apple iPhone 15 Pro, 256GB, Natural Titanium",
    category: "Electronics",
    price: 999.00,
    originalPrice: 1099.00,
    rating: 4.7,
    reviews: 32187,
    image: "/images/iphone-15-pro.jpg",
    images: [
      "/images/iphone-15-pro.jpg"
    ],
    prime: true,
    badge: "Best Seller",
    delivery: "FREE delivery Tomorrow",
    brand: "Apple",
    features: [
      "A17 Pro chip, 6-core GPU",
      "Pro camera system: 48MP Main, 12MP Ultra Wide, 12MP 3x Telephoto",
      "USB 3 speeds with USB-C",
      "All-day battery life",
      "Titanium design, ceramic shield front"
    ],
    description: "iPhone 15 Pro. Titanium. So strong. So light. So pro."
  },
  {
    id: 12,
    name: "Organic Green Tea 100 Tea Bags USDA Certified",
    category: "Grocery",
    price: 12.99,
    originalPrice: 18.99,
    rating: 4.5,
    reviews: 7821,
    image: "/images/organic-green-tea.jpg",
    images: [
      "/images/organic-green-tea.jpg"
    ],
    prime: true,
    badge: null,
    delivery: "FREE delivery Tomorrow",
    brand: "Bigelow",
    features: [
      "USDA Organic certified",
      "100 individually wrapped tea bags",
      "Rich in antioxidants",
      "Gluten-free, non-GMO",
      "Sustainably sourced"
    ],
    description: "A clean, refreshing green tea with a delicate flavor and natural goodness."
  }
];

// ── CART LOGIC ──────────────────────────────────────────────
function getCart() {
  return JSON.parse(localStorage.getItem('ss_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('ss_cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart(cart);
  showToast('Added to cart');
}

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
  });
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

// ── UTILITIES ──────────────────────────────────────────────
function formatPrice(price) {
  return price.toFixed(2);
}

function starsHTML(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < full; i++) html += '★';
  if (half) html += '½';
  while (html.replace('½','*').length < 5) html += '☆';
  return html;
}

function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

function searchProducts(query, category) {
  const q = query.toLowerCase();
  return PRODUCTS.filter(p => {
    const matchQ = !q || p.name.toLowerCase().includes(q) ||
                   p.brand.toLowerCase().includes(q) ||
                   p.category.toLowerCase().includes(q);
    const matchC = !category || category === 'All' || p.category === category;
    return matchQ && matchC;
  });
}

// ── SHARED NAVBAR HTML ──────────────────────────────────────
function navbarHTML(searchValue = '', categoryValue = 'All') {
  const categories = ['All', 'Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Toys', 'Grocery'];
  const opts = categories.map(c =>
    `<option value="${c}" ${c === categoryValue ? 'selected' : ''}>${c}</option>`
  ).join('');

  return `
  <nav class="navbar">
    <a href="#" onclick="navigate('home');return false;" class="logo">supershop</a>
    <div class="deliver">
      <div>Deliver to</div>
      <span>United States</span>
    </div>
    <form class="search-bar" onsubmit="handleSearch(event)">
      <select id="search-category" aria-label="Search category">${opts}</select>
      <input type="text" id="search-input" placeholder="Search Supershop" value="${searchValue}" aria-label="Search Supershop" />
      <button type="submit" aria-label="Search">
        <svg viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2.5">
          <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </button>
    </form>
    <div class="nav-links">
      <a href="#" class="nav-item">
        <div class="top">Returns</div>
        <div class="bot">& Orders</div>
      </a>
      <a href="#" onclick="navigate('cart');return false;" class="nav-item">
        <div class="cart-count">0</div>
        <div class="bot">Cart 🛒</div>
      </a>
    </div>
  </nav>
  <nav class="subnav">
    <a href="#" class="all" onclick="navigate('home');return false;">☰ All</a>
    <a href="#" onclick="navigate('search',{category:'Electronics'});return false;">Electronics</a>
    <a href="#" onclick="navigate('search',{category:'Clothing'});return false;">Clothing</a>
    <a href="#" onclick="navigate('search',{category:'Home & Kitchen'});return false;">Home &amp; Kitchen</a>
    <a href="#" onclick="navigate('search',{category:'Books'});return false;">Books</a>
    <a href="#" onclick="navigate('search',{category:'Toys'});return false;">Toys</a>
    <a href="#" onclick="navigate('search',{category:'Grocery'});return false;">Grocery</a>
    <a href="#" onclick="navigate('search',{});return false;">Today's Deals</a>
  </nav>`;
}

function footerHTML() {
  return `
  <div class="footer-back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})">Back to top</div>
  <footer class="footer-main">
    <div class="footer-col">
      <h4>Get to Know Us</h4>
      <ul>
        <li>About Supershop</li><li>Careers</li><li>Press Releases</li>
        <li>Supershop Science</li><li>Investor Relations</li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Make Money with Us</h4>
      <ul>
        <li>Sell products</li><li>Sell on Supershop Business</li>
        <li>Become an Affiliate</li><li>Advertise Your Products</li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Payment Products</h4>
      <ul>
        <li>Supershop Business Card</li><li>Shop with Points</li>
        <li>Reload Your Balance</li><li>Currency Converter</li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Let Us Help You</h4>
      <ul>
        <li>Your Account</li><li>Your Orders</li>
        <li>Shipping Rates & Policies</li><li>Returns & Replacements</li>
        <li>Help</li>
      </ul>
    </div>
  </footer>
  <div class="footer-bottom">
    <div class="logo">supershop</div>
    <p style="margin-top:8px">© 2026 Supershop. All rights reserved.</p>
  </div>`;
}

// handleSearch is defined in index.html to use the SPA router

