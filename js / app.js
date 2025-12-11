// Tadla Bio E-commerce Application
class TadlaBioStore {
  constructor() {
    this.products = [];
    this.cart = this.loadCart();
    this.filter = "all";
    this.isCartOpen = false;
    this.init();
  }

  async init() {
    await this.loadProducts();
    this.renderProducts();
    this.updateCartCount();
    this.setupEventListeners();
  }

  // Load products from JSON file
  async loadProducts() {
    try {
      const response = await fetch("/data/products.json");
      if (!response.ok) {
        throw new Error("Failed to load products");
      }
      this.products = await response.json();
      console.log("Products loaded:", this.products.length);
    } catch (error) {
      console.error("Error loading products:", error);
      this.products = this.getSampleProducts();
    }
  }

  getSampleProducts() {
    return [
      {
        id: 1,
        name: "زيت زيتون بكر ممتاز",
        slug: "zit-baldia",
        price_mad: 65,
        weight: " لتر 1",
        short_desc: "معصور على البارد من أول قطفة الزيتون",
        long_desc:
          "زيت زيتون بكر ممتاز عالي الجودة، مستخلص من أجود ثمار الزيتون المزروعة في أراضي قصبة تادلة المعروفة بتربتها الخصبة ومناخها الذي يمنح الزيتون مذاقًا ونكهة فريدة. يتم قطف الثمار بعناية خلال موسمها الطبيعي، ثم تُعصر على البارد للحفاظ على قيمتها الغذائية ورائحتها الأصلية دون أي إضافات أو مواد حافظة.",
        ingredients: ["100% زيتون عضوي"],
        is_organic: true,
        category: "oil",
        image: "assets/images/zit-baldia.png",
      },
      {
        id: 2,
        name: "زبدة بلدية",
        slug: "zabda-baldia",
        price_mad: 120,
        weight: " كيلو 1",
        short_desc: "زبدة مغربية تقليدية مخضوضة يدوياً",
        long_desc:
          "زبدة بلدية طبيعية محضّرة بالطريقة التقليدية من حليب طازج من قصبة تادلة، تتميّز بنكهة قروية أصيلة وقوام كريمي غني. منتج طبيعي 100% دون أي مواد مضافة.",
        ingredients: ["حليب بقر طازج", "ملح بحري"],
        is_organic: false,
        category: "dairy",
        image: "assets/images/zabda-baldia.png",
      },
      {
        id: 3,
        name: "سمن الحار",
        slug: "smen-har",
        price_mad: 150,
        weight: " كيلو 1",
        short_desc: "سمن الحار ",
        long_desc:
          "مصنوعة باستخدام الطرق التقليدية التي توارثتها الأجيال، زبدتنا الزبدة مخضوضة يدوياً من حليب البقر الطازج المغذى على العشب. تتميز بقوام كريمي غني ونكهة مميزة تعزز أي طبق.",
        ingredients: ["حليب بقر طازج", "ملح بحري"],
        is_organic: false,
        category: "dairy",
        image: "assets/images/smen-har.png",
      },
      {
        id: 4,
        name: "عسل الليمون",
        slug: "pure-asal-laymon",
        price_mad: 85,
        weight: " كيلو 1",
        short_desc: "عسل حر بالليمون",
        long_desc:
          "زيت الأركان النقي لدينا مستخلص باستخدام طرق العصر على البارد التقليدية من قبل تعاونيات النساء المحليات. هذا الزيت الذهبي غني بفيتامين E والأحماض الدهنية الأساسية، مناسب للاستخدام الطهي والعناية بالبشرة.",
        ingredients: ["100% لوز أركان نقي"],
        is_organic: true,
        category: "oil",
        image: "assets/images/pure-asal-laymon.png",
      },
      {
        id: 5,
        name: "عسل الخروب",
        slug: "pure-asal-kharob",
        price_mad: 110,
        weight: " كيلو 1",
        short_desc: "عسل حر بالخروب",
        long_desc:
          "يزرع في سهول تادلة المشمسة، يتم حصاد تمر المجهول لدينا يدوياً عند ذروة النضج. هذه التمور الحلوة طبيعياً بنكهة الكراميل غنية بالألياف والبوتاسيوم والعناصر الغذائية الأساسية.",
        ingredients: ["100% تمر طبيعي"],
        is_organic: true,
        category: "pantry",
        image: "assets/images/pure-asal-kharob.png",
      },
      {
        id: 6,
        name: "عسل اعشاب",
        slug: "pure-asal-achab",
        price_mad: 110,
        weight: " كيلو 1",
        short_desc: "عسل حر بالاعشاب",
        long_desc:
          "عسلنا الخام يحصد من خلايا النحل الموضوعة في المناظر الطبيعية المتنوعة للزهور في منطقة تادلة. هذا العسل غير المعالج يحتفظ بجميع إنزيماته الطبيعية ومضادات الأكسدة والملاحظات الزهرية الدقيقة.",
        ingredients: ["100% عسل خام"],
        is_organic: true,
        category: "pantry",
        image: "assets/images/pure-asal-achab.png",
      },
      {
        id: 7,
        name: "زيتون مرقد",
        slug: "zayton-mra9ad",
        price_mad: 35,
        weight: "5 كيلو",
        short_desc: "زيتون مرقد منزلي من منطقة تادلة",
        long_desc:
          "يزرع في التربة الغنية بالمعادن لبساتين عائلتنا، يتم تحميص هذا اللوز بشكل خفيف لتعزيز نكهته الطبيعية وقرمشته. غني بالبروتين والدهون الصحية وفيتامين E.",
        ingredients: ["100% لوز طبيعي", "ملح بحري"],
        is_organic: true,
        category: "pantry",
        image: "assets/images/zayton-mra9ad.png",
      },
      {
        id: 8,
        name: "زيتون مرقد",
        slug: "zayton-mra9add",
        price_mad: 20,
        weight: "2 كيلو",
        short_desc: "زيتون مرقد منزلي من منطقة تادلة",
        long_desc:
          "يزرع في التربة الغنية بالمعادن لبساتين عائلتنا، يتم تحميص هذا اللوز بشكل خفيف لتعزيز نكهته الطبيعية وقرمشته. غني بالبروتين والدهون الصحية وفيتامين E.",
        ingredients: ["100% لوز طبيعي", "ملح بحري"],
        is_organic: true,
        category: "pantry",
        image: "assets/images/zayton-mra9add.png",
      },
    ];
  }

  // Cart management
  loadCart() {
    try {
      const cart = localStorage.getItem("tadla_bio_cart");
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem("tadla_bio_cart", JSON.stringify(this.cart));
      this.updateCartCount();
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.renderCart();
  }

  addToCart(product, quantity = 1) {
    const existingItem = this.cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price_mad: product.price_mad,
        weight: product.weight,
        image: product.image,
        quantity: quantity,
      });
    }

    this.saveCart();
    this.renderCart();
    this.showNotification(`تم إضافة ${product.name} إلى السلة`);
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.saveCart();
    this.renderCart();
  }

  updateQuantity(productId, change) {
    const item = this.cart.find((item) => item.id === productId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.saveCart();
        this.renderCart();
      }
    }
  }

  // WhatsApp Order Generation in Arabic
  // WhatsApp Order Generation in Arabic - FIXED VERSION
  generateWhatsAppOrderMessage() {
    if (this.cart.length === 0) {
      return "مرحباً! أنا مهتم/مهتمة بمنتجات تادلة بيو. هل يمكنكم إخباري بالمزيد؟";
    }

    const items = this.cart
      .map(
        (item) =>
          `${item.quantity} × ${item.name} (${
            item.weight
          }) = ${this.formatPrice(item.price_mad * item.quantity)}`
      )
      .join("\n");

    const total = this.cart.reduce(
      (sum, item) => sum + item.price_mad * item.quantity,
      0
    );

    return `مرحباً، أود تقديم طلب من تادلة بيو 🫒

🛒 *المنتجات المطلوبة:*
${items}

💰 *المجموع الكلي:* ${this.formatPrice(total)}



🚚 *ملاحظة:* التوصيل مجاني داخل قصبة تادلة. خارج المنطقة تختلف الرسوم حسب المسافة.

شكراً لكم! 😊`;
  }

  sendOrderToWhatsApp() {
    if (this.cart.length === 0) {
      // If cart is empty, send inquiry message
      const inquiryMessage = encodeURIComponent(
        "مرحباً، أنا مهتم بمنتجات تادلة بيو. هل يمكنكم إرسال قائمة المنتجات والأسعار؟"
      );
      const phoneNumber = "212705675426";
      window.open(
        `https://wa.me/${phoneNumber}?text=${inquiryMessage}`,
        "_blank"
      );
      this.showNotification("جاري فتح واتساب للاستفسار...");
      return;
    }

    const message = this.generateWhatsAppOrderMessage();
    const phoneNumber = "212705675426";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    this.showNotification("جاري فتح واتساب مع طلبك...");
    this.hideCart();
  }

  // Rendering methods
  renderProducts() {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;

    grid.innerHTML =
      '<div class="loading" style="grid-column: 1/-1; text-align: center; padding: 2rem;">جاري تحميل المنتجات...</div>';

    setTimeout(() => {
      const filteredProducts =
        this.filter === "all"
          ? this.products
          : this.products.filter((product) =>
              this.filter === "organic"
                ? product.is_organic
                : this.filter === "oil"
                ? product.category === "oil"
                : this.filter === "dairy"
                ? product.category === "dairy"
                : true
            );

      if (filteredProducts.length === 0) {
        grid.innerHTML =
          '<div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--color-text-light);">لم يتم العثور على منتجات تطابق معاييرك.</div>';
        return;
      }

      grid.innerHTML = filteredProducts
        .map(
          (product) => `
                <div class="product-card" data-product-id="${product.id}">
                    <img src="${product.image}" alt="${
            product.name
          }" class="product-image" loading="lazy" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjVGREIzIi8+CjxwYXRoIGQ9Ik0xMDAgMTUwSDE1ME0yNTAgMTUwSDMwME0xNzUgMTAwVjIwME0yMjUgMTAwVjIwMCIgc3Ryb2tlPSIjNkI4RTIzIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+'">
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-price">${this.formatPrice(
                          product.price_mad
                        )}</div>
                        <div class="product-weight">${product.weight}</div>
                        <p class="product-desc">${product.short_desc}</p>
                        <div class="product-actions">
                            <button class="btn-add-cart" onclick="store.addToCart(${this.escapeProduct(
                              product
                            )})">
                                أضف إلى السلة
                            </button>
                            <button class="btn-view-details" onclick="store.showProductDetail(${
                              product.id
                            })">
                                التفاصيل
                            </button>
                        </div>
                    </div>
                </div>
            `
        )
        .join("");
    }, 100);
  }

  renderCart() {
    const cartContent = document.getElementById("cartContent");
    if (!cartContent) return;

    if (this.cart.length === 0) {
      cartContent.innerHTML = `
                <div class="empty-cart">
                    🛒 سلة التسوق فارغة
                    <button class="btn btn-primary" onclick="store.hideCart(); scrollToProducts();" style="margin-top: 1rem;">
                        ابدأ التسوق
                    </button>
                </div>
            `;
      this.updateTotals();
      return;
    }

    cartContent.innerHTML = this.cart
      .map(
        (item) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${
          item.name
        }" class="cart-item-image" loading="lazy" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjVGREIzIi8+CjxwYXRoIGQ9Ik0zMCA0MEg1ME00MCAzMFY1MCIgc3Ryb2tlPSIjNkI4RTIzIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+'">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${this.formatPrice(
                      item.price_mad
                    )}</div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn" onclick="store.updateQuantity(${
                          item.id
                        }, -1)">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="store.updateQuantity(${
                          item.id
                        }, 1)">+</button>
                        <button class="remove-btn" onclick="store.removeFromCart(${
                          item.id
                        })">
                            ×
                        </button>
                    </div>
                </div>
            </div>
        `
      )
      .join("");

    this.updateTotals();
  }

  updateTotals() {
    const total = this.cart.reduce(
      (sum, item) => sum + item.price_mad * item.quantity,
      0
    );
    document.getElementById("cartTotal").textContent = this.formatPrice(total);
    this.updateShippingMessage(total);
  }

  updateShippingMessage(total) {
    const shippingMessage = document.getElementById("shippingMessage");
    if (!shippingMessage) return;

    if (total === 0) {
      shippingMessage.style.display = "none";
    } else {
      shippingMessage.style.display = "block";
    }
  }

  updateCartCount() {
    const countElement = document.getElementById("cartCount");
    if (countElement) {
      const totalItems = this.cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      countElement.textContent = totalItems;
      countElement.style.display = totalItems > 0 ? "flex" : "none";
    }
  }

  showProductDetail(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (!product) return;

    const modalBody = document.getElementById("productModalBody");
    modalBody.innerHTML = `
            <div class="product-detail">
                <img src="${product.image}" alt="${
      product.name
    }" class="product-detail-image" loading="lazy" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGREIzIi8+CjxwYXRoIGQ9Ik0xMDAgMTUwSDE1ME0yNTAgMTUwSDMwME0xNzUgMTAwVjIwME0yMjUgMTAwVjIwMCIgc3Ryb2tlPSIjNkI4RTIzIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+'">
                <div class="product-detail-info">
                    <h2>${product.name}</h2>
                    <div class="product-detail-price">${this.formatPrice(
                      product.price_mad
                    )}</div>
                    <div class="product-weight">${product.weight}</div>
                    <p class="product-detail-description">${
                      product.long_desc
                    }</p>
                    
                    ${
                      product.ingredients && product.ingredients.length
                        ? `
                        <div class="product-detail-ingredients">
                            <h4>المكونات</h4>
                            <p>${product.ingredients.join(", ")}</p>
                        </div>
                    `
                        : ""
                    }
                    
                    ${
                      product.is_organic
                        ? '<div class="organic-badge">🌿 عضوي معتمد</div>'
                        : ""
                    }
                    
                    <div class="product-actions" style="margin-top: 2rem;">
                        <button class="btn btn-primary" onclick="store.addToCart(${this.escapeProduct(
                          product
                        )})">
                            أضف إلى السلة
                        </button>
                        <button class="btn btn-secondary" onclick="store.closeProductModal()">
                            متابعة التسوق
                        </button>
                    </div>
                </div>
            </div>
        `;

    this.showModal("productModal");
  }

  closeProductModal() {
    this.hideModal("productModal");
  }

  // Modal and cart management
  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }

  showCart() {
    const cart = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");

    if (cart && overlay) {
      cart.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
      this.isCartOpen = true;
      this.renderCart();
    }
  }

  hideCart() {
    const cart = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");

    if (cart && overlay) {
      cart.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "auto";
      this.isCartOpen = false;
    }
  }

  toggleCart() {
    if (this.isCartOpen) {
      this.hideCart();
    } else {
      this.showCart();
    }
  }

  showMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    if (menu) {
      menu.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  hideMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    if (menu) {
      menu.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }

  toggleMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    if (menu.classList.contains("active")) {
      this.hideMobileMenu();
    } else {
      this.showMobileMenu();
    }
  }

  // Utilities
  formatPrice(price) {
    return new Intl.NumberFormat("fr-MA", {
      style: "currency",
      currency: "MAD",
    }).format(price);
  }

  escapeProduct(product) {
    const safeProduct = {
      id: product.id,
      name: product.name,
      price_mad: product.price_mad,
      weight: product.weight,
      image: product.image,
    };
    return JSON.stringify(safeProduct).replace(/"/g, "&quot;");
  }

  showNotification(message) {
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement("div");
    notification.className = "notification";
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            left: 20px;
            background: var(--color-olive);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow-lg);
            z-index: 5000;
            transform: translateX(-400px);
            transition: transform 0.3s ease;
            max-width: calc(100vw - 40px);
        `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => (notification.style.transform = "translateX(0)"), 100);

    setTimeout(() => {
      notification.style.transform = "translateX(-400px)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 3000);
  }

  // Event listeners
  setupEventListeners() {
    // Filter buttons
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document
          .querySelectorAll(".filter-btn")
          .forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");
        this.filter = e.target.dataset.filter;
        this.renderProducts();
      });
    });

    // Cart overlay click
    const cartOverlay = document.getElementById("cartOverlay");
    if (cartOverlay) {
      cartOverlay.addEventListener("click", () => {
        this.hideCart();
      });
    }

    // Escape key to close modals
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.hideCart();
        this.hideMobileMenu();
        this.hideModal("productModal");
      }
    });

    // Close modals on backdrop click
    document.querySelectorAll(".product-modal").forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          this.hideModal(modal.id);
        }
      });
    });
  }
}

// Global functions
function toggleCart() {
  store.toggleCart();
}

function toggleMobileMenu() {
  store.toggleMobileMenu();
}

function scrollToProducts() {
  document.getElementById("products").scrollIntoView({
    behavior: "smooth",
  });
}

function sendOrderToWhatsApp() {
  store.sendOrderToWhatsApp();
}

// Initialize store
let store;
document.addEventListener("DOMContentLoaded", () => {
  store = new TadlaBioStore();
});

