/* ==========================================================================
   APLICACIÓN JS - CHIC ROSE (LOGICA, BASE DE DATOS LOCAL & FUNCIONALIDADES)
   ========================================================================== */

// ==========================================================================
// 1. SEMILLA DE DATOS E INICIALIZACIÓN
// ==========================================================================

const DEFAULT_PRODUCTS = [
    {
        id: "prod-1",
        code: "VEST-01",
        title: "Vestido Romantic Pink Plisado",
        description: "Delicado vestido confeccionado en gasa plisada premium de tono rosa pastel. Diseño de cuello en V y espalda descubierta con lazo ajustable, ideal para salidas románticas o eventos de día.",
        category: "Vestidos",
        price: 8500,
        stock: 8,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80",
        salesCount: 14
    },
    {
        id: "prod-2",
        code: "ABRI-01",
        title: "Saco Clásico Blush Wool",
        description: "Elegante abrigo largo confeccionado en mezcla de lana soft. Textura ultrasuave con forro interior de satén, botones cruzados en tono carey y solapas estructuradas para un estilo sofisticado en días fríos.",
        category: "Abrigos",
        price: 12900,
        stock: 5,
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
        salesCount: 8
    },
    {
        id: "prod-3",
        code: "BLUS-01",
        title: "Top Floral Garden Silk",
        description: "Blusa delicada de mangas caídas y escote corazón, estampada con un sutil patrón de flores silvestres. Confeccionada en seda fría con terminaciones elásticas para un ajuste cómodo y favorecedor.",
        category: "Blusas",
        price: 4200,
        stock: 12,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
        salesCount: 22
    },
    {
        id: "prod-4",
        code: "POLL-01",
        title: "Falda Midi Romántica de Tul",
        description: "Falda midi vaporosa estructurada en tres capas de tul plisado rosa pastel. Cintura elastizada de satén brillante que se adapta perfectamente, ideal para lograr un look de bailarina chic moderno.",
        category: "Polleras",
        price: 5800,
        stock: 3, // Stock crítico para probar alarmas
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
        salesCount: 11
    },
    {
        id: "prod-5",
        code: "ACCE-01",
        title: "Sombrero Pamela Algodón Soft",
        description: "Sombrero de ala ancha flexible, confeccionado en fibras de algodón y rafia color crema-rubor. Detalle de cinta de grosgrain rosa en contraste. Protege del sol aportando una elegancia campestre.",
        category: "Accesorios",
        price: 3100,
        stock: 15,
        image: "https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?w=600&auto=format&fit=crop&q=80",
        salesCount: 4
    },
    {
        id: "prod-6",
        code: "BLUS-02",
        title: "Blusa Gasa Encaje Vintage",
        description: "Camisa de gasa semitransparente con mangas abullonadas e intrincados apliques de encaje floral en el pecho y cuello. Un clásico atemporal del guardarropa romántico y sofisticado.",
        category: "Blusas",
        price: 4900,
        stock: 7,
        image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80",
        salesCount: 9
    },
    {
        id: "prod-7",
        code: "VEST-02",
        title: "Vestido Gala Rose Gold",
        description: "Exclusivo vestido de noche entallado en satén premium de gramaje pesado en tono oro rosa. Escote lencero con tiras cruzadas en la espalda abierta y un tajo lateral que aporta movimiento y sensualidad.",
        category: "Vestidos",
        price: 15500,
        stock: 4,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80",
        salesCount: 18
    },
    {
        id: "prod-8",
        code: "ABRI-02",
        title: "Sweater Cachemira Pastel Sweet",
        description: "Sweater de punto trenzado confeccionado en mezcla de cachemira y lana fina. Cuello redondo clásico, puños acanalados y un fit relajado muy acogedor en una tonalidad rosa rubor sumamente delicada.",
        category: "Abrigos",
        price: 9200,
        stock: 2, // Stock crítico
        image: "https://images.unsplash.com/photo-1574164904299-3a102b110380?w=600&auto=format&fit=crop&q=80",
        salesCount: 15
    }
];

const DEFAULT_USERS = [
    {
        name: "Administradora Chic",
        email: "admin@chic.com",
        password: "admin123",
        role: "admin"
    },
    {
        name: "Sofia Rodriguez",
        email: "cliente@chic.com",
        password: "cliente123",
        role: "customer"
    }
];

// Semilla de ventas de los últimos 5 días
const getSeedSales = () => {
    const today = new Date();
    const sales = [];
    
    // Generamos ventas para los últimos 5 días
    for (let i = 4; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = date.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
        
        // Cantidades simuladas e ingresos por día
        let revenue = 0;
        let ordersCount = 0;
        
        if (i === 4) { revenue = 18500; ordersCount = 2; }
        else if (i === 3) { revenue = 24300; ordersCount = 3; }
        else if (i === 2) { revenue = 12900; ordersCount = 1; }
        else if (i === 1) { revenue = 38400; ordersCount = 4; }
        else if (i === 0) { revenue = 15500; ordersCount = 1; }
        
        sales.push({
            date: dateStr,
            revenue: revenue,
            count: ordersCount,
            rawDate: date.toISOString().split('T')[0]
        });
    }
    return sales;
};

const DEFAULT_ORDERS = [
    {
        id: "ORD-9801",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString('es-AR'), // Hace 3 días
        customerName: "Sofia Rodriguez",
        customerEmail: "cliente@chic.com",
        items: [
            { id: "prod-3", title: "Top Floral Garden Silk", price: 4200, qty: 2, size: "M", color: "Rosa Delicado" },
            { id: "prod-6", title: "Blusa Gasa Encaje Vintage", price: 4900, qty: 1, size: "S", color: "Blanco Puro" }
        ],
        total: 13300,
        status: "Entregado",
        address: "Av. Santa Fe 1234, CABA"
    },
    {
        id: "ORD-9802",
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString('es-AR'), // Ayer
        customerName: "Sofia Rodriguez",
        customerEmail: "cliente@chic.com",
        items: [
            { id: "prod-2", title: "Saco Clásico Blush Wool", price: 12900, qty: 1, size: "L", color: "Rosa Rubor" }
        ],
        total: 12900,
        status: "En camino",
        address: "Av. Santa Fe 1234, CABA"
    }
];

// ==========================================================================
// 2. GESTOR DE ESTADO (LOCALSTORAGE COHERENTE)
// ==========================================================================

const state = {
    products: [],
    users: [],
    orders: [],
    sales: [],
    currentSession: null,
    cart: [],
    favorites: []
};

// Load initial data from API
(async () => {
    try {
        const [prodRes, userRes, orderRes, salesRes] = await Promise.all([
            fetch('/api/products').then(r => r.json()),
            fetch('/api/users').then(r => r.json()),
            fetch('/api/orders').then(r => r.json()),
            fetch('/api/sales').then(r => r.json())
        ]);
        state.products = prodRes;
        state.users = userRes;
        state.orders = orderRes;
        state.sales = salesRes;
        // Persist to localStorage for offline fallback
        saveState.products();
        saveState.users();
        saveState.orders();
        saveState.sales();
    } catch (e) {
        console.error('Error loading initial data:', e);
        // Fallback to defaults if API fails
        state.products = DEFAULT_PRODUCTS;
        state.users = DEFAULT_USERS;
        state.orders = DEFAULT_ORDERS;
        state.sales = getSeedSales();
    }
})();

const saveState = {
    products: () => localStorage.setItem("chic_rose_products", JSON.stringify(state.products)),
    users: () => localStorage.setItem("chic_rose_users", JSON.stringify(state.users)),
    orders: () => localStorage.setItem("chic_rose_orders", JSON.stringify(state.orders)),
    sales: () => localStorage.setItem("chic_rose_sales", JSON.stringify(state.sales)),
    session: () => localStorage.setItem("chic_rose_session", JSON.stringify(state.currentSession)),
    cart: () => localStorage.setItem("chic_rose_cart", JSON.stringify(state.cart)),
    favorites: () => localStorage.setItem("chic_rose_favorites", JSON.stringify(state.favorites))
};

// ==========================================================================
// 3. ENRUTADOR VIRTUAL DE SPA
// ==========================================================================

const navigateToView = (viewId) => {
    // Escondemos todas las vistas
    document.querySelectorAll(".view-section").forEach(section => {
        section.classList.add("hidden");
    });
    
    // Mostramos la vista deseada
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.remove("hidden");
        // Animamos una entrada sutil
        targetView.style.opacity = "0";
        setTimeout(() => {
            targetView.style.opacity = "1";
        }, 50);
    }
    
    // Actualizamos navegación en Header
    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("data-view") === viewId) {
            item.classList.add("active");
        }
    });

    // Cargar estadísticas si el admin entra a su panel
    if (viewId === "admin-view") {
        renderAdminDashboard();
    }
    
    // Cargar historial de cuenta si el usuario entra a perfil
    if (viewId === "profile-view") {
        renderUserProfile();
    }
    
    // Hacemos scroll hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ==========================================================================
// 4. NOTIFICACIONES TOAST PREMIUM
// ==========================================================================

const showToast = (message, type = 'success') => {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    
    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        toast.style.transform = "translateX(120%)";
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// ==========================================================================
// 5. COMPORTAMIENTO DEL CATÁLOGO & RENDERS
// ==========================================================================

let activeCategoryFilter = "all";
let searchQuery = "";
let maxPriceFilter = 30000;
let sortOption = "default";
let onlyInStock = true;

const renderProductsCatalog = () => {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";
    
    // Aplicamos filtros de catálogo
    let filtered = state.products.filter(product => {
        const matchesCategory = activeCategoryFilter === "all" || product.category === activeCategoryFilter;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              product.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = product.price <= maxPriceFilter;
        const matchesStock = !onlyInStock || product.stock > 0;
        
        return matchesCategory && matchesSearch && matchesPrice && matchesStock;
    });
    
    // Aplicamos ordenamiento
    if (sortOption === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name-asc") {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    // Actualizar contador
    document.getElementById("results-count").textContent = `Mostrando ${filtered.length} productos`;
    
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="cart-empty-state" style="grid-column: 1/-1; padding: 60px 0;">
                <i class="fa-solid fa-cloud-moon"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta cambiar los filtros o tu palabra clave de búsqueda.</p>
            </div>
        `;
        return;
    }
    
    // Renderizamos las tarjetas
    filtered.forEach(p => {
        const isFav = state.favorites.includes(p.id);
        const card = document.createElement("div");
        card.className = "product-card";
        
        const hasCriticalStock = p.stock > 0 && p.stock <= 3;
        const outOfStock = p.stock === 0;
        
        let stockIndicatorHTML = "";
        if (outOfStock) {
            stockIndicatorHTML = `<span class="product-card-stock-warning text-danger">Sin Stock</span>`;
        } else if (hasCriticalStock) {
            stockIndicatorHTML = `<span class="product-card-stock-warning">¡Últimas ${p.stock} u.!</span>`;
        } else {
            stockIndicatorHTML = `<span class="text-success" style="font-size: 0.75rem; font-weight:700;"><i class="fa-solid fa-check"></i> Disponible</span>`;
        }
        
        // Un 30% simulado de descuento en algunos productos estrella para el aire de e-commerce
        const hasPromo = p.id === "prod-1" || p.id === "prod-7";
        const badgeHTML = hasPromo ? `<div class="card-badge-discount">HOT DEAL</div>` : "";
        
        card.innerHTML = `
            ${badgeHTML}
            <div class="product-card-img-wrapper">
                <img class="product-card-img" src="${p.image}" alt="${p.title}" loading="lazy">
                <button class="card-btn-fav ${isFav ? 'active' : ''}" data-id="${p.id}" title="Favorito">
                    <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
                </button>
            </div>
            <div class="product-card-details">
                <span class="product-card-cat">${p.category}</span>
                <h3 class="product-card-title">${p.title}</h3>
                <div class="product-card-price-row">
                    <span class="product-card-price">$${p.price.toLocaleString('es-AR')}</span>
                    ${stockIndicatorHTML}
                </div>
                ${outOfStock ? 
                    `<div class="product-card-out-of-stock">Agotado Temporalmente</div>` : 
                    `<button class="product-card-btn-add" data-id="${p.id}"><i class="fa-solid fa-bag-shopping"></i> Añadir</button>`
                }
            </div>
        `;
        
        // Listener para abrir detalles de producto en imagen/título
        card.querySelector(".product-card-img").addEventListener("click", () => openProductDetailModal(p));
        card.querySelector(".product-card-title").addEventListener("click", () => openProductDetailModal(p));
        
        // Listener añadir rápido
        if (!outOfStock) {
            card.querySelector(".product-card-btn-add").addEventListener("click", (e) => {
                e.stopPropagation();
                addToCart(p, 1, "M", "Rosa Delicado");
            });
        }
        
        // Listener favoritos
        card.querySelector(".card-btn-fav").addEventListener("click", (e) => {
            e.stopPropagation();
            toggleFavorite(p.id, e.currentTarget);
        });
        
        grid.appendChild(card);
    });
};

const toggleFavorite = (productId, element) => {
    const index = state.favorites.indexOf(productId);
    if (index > -1) {
        state.favorites.splice(index, 1);
        element.classList.remove("active");
        element.innerHTML = `<i class="fa-regular fa-heart"></i>`;
        showToast("Eliminado de favoritos", "success");
    } else {
        state.favorites.push(productId);
        element.classList.add("active");
        element.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        showToast("¡Guardado en tus favoritos!", "success");
    }
    saveState.favorites();
};

// ==========================================================================
// 6. DETALLE DE PRODUCTO EN MODAL
// ==========================================================================

let activeModalProduct = null;
let selectedSize = "M";
let selectedColor = "Rosa Delicado";

const openProductDetailModal = (product) => {
    activeModalProduct = product;
    
    // Rellenamos datos en HTML
    document.getElementById("modal-product-img").src = product.image;
    document.getElementById("modal-product-cat").textContent = product.category;
    document.getElementById("modal-product-title").textContent = product.title;
    document.getElementById("modal-product-price").textContent = `$${product.price.toLocaleString('es-AR')}`;
    document.getElementById("modal-product-desc").textContent = product.description;
    
    const stockBadge = document.getElementById("modal-product-stock-badge");
    if (product.stock === 0) {
        stockBadge.textContent = "Agotado";
        stockBadge.className = "modal-product-stock-badge out-stock";
        document.getElementById("modal-add-to-cart-btn").disabled = true;
        document.getElementById("modal-add-to-cart-btn").textContent = "Sin Stock Disponible";
    } else {
        stockBadge.textContent = `En Stock (${product.stock} unidades)`;
        stockBadge.className = "modal-product-stock-badge";
        document.getElementById("modal-add-to-cart-btn").disabled = false;
        document.getElementById("modal-add-to-cart-btn").innerHTML = `<i class="fa-solid fa-bag-shopping"></i> Añadir a la Bolsa`;
    }
    
    // Reiniciar valores modal
    selectedSize = "M";
    selectedColor = "Rosa Delicado";
    document.getElementById("modal-qty-input").value = 1;
    
    // Seleccionar por defecto Sabor Tallas y Colores en UI
    document.querySelectorAll(".size-pill").forEach(p => {
        p.classList.remove("active");
        if (p.getAttribute("data-size") === "M") p.classList.add("active");
    });
    
    document.querySelectorAll(".color-dot").forEach(d => {
        d.classList.remove("active");
        if (d.getAttribute("data-color") === "Rosa Delicado") d.classList.add("active");
    });
    
    // Favorito en modal
    const modalFavBtn = document.getElementById("modal-fav-btn");
    const isFav = state.favorites.includes(product.id);
    if (isFav) {
        modalFavBtn.classList.add("active");
        modalFavBtn.innerHTML = `<i class="fa-solid fa-heart"></i>`;
    } else {
        modalFavBtn.classList.remove("active");
        modalFavBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
    }
    
    // Abrir Modal
    document.getElementById("product-detail-modal").classList.add("active");
};

const closeProductDetailModal = () => {
    document.getElementById("product-detail-modal").classList.remove("active");
    activeModalProduct = null;
};

// ==========================================================================
// 7. BOLSA DE COMPRAS (CARRITO DE COMPRAS)
// ==========================================================================

const addToCart = (product, quantity, size, color) => {
    const qtyToAdd = parseInt(quantity);
    
    // Validar disponibilidad de stock
    const cartItemIndex = state.cart.findIndex(item => item.id === product.id && item.size === size && item.color === color);
    let currentInCart = 0;
    if (cartItemIndex > -1) {
        currentInCart = state.cart[cartItemIndex].qty;
    }
    
    if (currentInCart + qtyToAdd > product.stock) {
        showToast(`Lo sentimos, no hay suficiente stock disponible. Stock máximo: ${product.stock}`, "error");
        return;
    }
    
    if (cartItemIndex > -1) {
        state.cart[cartItemIndex].qty += qtyToAdd;
    } else {
        state.cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            qty: qtyToAdd,
            size: size,
            color: color
        });
    }
    
    saveState.cart();
    updateCartBadge();
    renderCart();
    
    // Animación visual del botón flotante del carrito
    const cartBtn = document.getElementById("open-cart-btn");
    cartBtn.style.transform = "scale(1.2)";
    setTimeout(() => {
        cartBtn.style.transform = "scale(1)";
    }, 300);
    
    showToast(`¡${product.title} (${size}) añadido a la bolsa!`, "success");
    closeProductDetailModal();
    
    // Abrir sidebar del carrito automáticamente
    openCartSidebar();
};

const openCartSidebar = () => {
    document.getElementById("cart-backdrop").classList.add("active");
    document.getElementById("cart-sidebar").classList.add("active");
};

const closeCartSidebar = () => {
    document.getElementById("cart-backdrop").classList.remove("active");
    document.getElementById("cart-sidebar").classList.remove("active");
};

const updateCartBadge = () => {
    const totalItems = state.cart.reduce((total, item) => total + item.qty, 0);
    document.getElementById("cart-count").textContent = totalItems;
};

const renderCart = () => {
    const container = document.getElementById("cart-items-container");
    container.innerHTML = "";
    
    if (state.cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty-state">
                <i class="fa-solid fa-bag-shopping"></i>
                <h3>Tu bolsa está vacía</h3>
                <p>Navega por las categorías y encuentra prendas rosa hermosas para ti.</p>
            </div>
        `;
        document.getElementById("cart-subtotal").textContent = "$0";
        return;
    }
    
    let subtotal = 0;
    
    state.cart.forEach((item, index) => {
        subtotal += item.price * item.qty;
        
        // Obtener el stock real disponible para limitar
        const dbProduct = state.products.find(p => p.id === item.id);
        const maxStock = dbProduct ? dbProduct.stock : 99;
        
        const itemRow = document.createElement("div");
        itemRow.className = "cart-item";
        itemRow.innerHTML = `
            <img class="cart-item-img" src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <div class="cart-item-meta">Talla: ${item.size} | Color: ${item.color}</div>
                <div class="cart-item-price">$${(item.price * item.qty).toLocaleString('es-AR')}</div>
                <div class="cart-item-qty">
                    <button class="qty-btn" data-action="decrease" data-idx="${index}"><i class="fa-solid fa-minus"></i></button>
                    <span class="qty-val">${item.qty}</span>
                    <button class="qty-btn" data-action="increase" data-idx="${index}" ${item.qty >= maxStock ? 'disabled style="opacity:0.5"' : ''}><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
            <button class="cart-item-remove" data-idx="${index}" title="Quitar"><i class="fa-solid fa-trash-can"></i></button>
        `;
        
        // Listeners individuales
        itemRow.querySelector("[data-action='decrease']").addEventListener("click", () => adjustCartItemQty(index, -1));
        itemRow.querySelector("[data-action='increase']").addEventListener("click", () => adjustCartItemQty(index, 1));
        itemRow.querySelector(".cart-item-remove").addEventListener("click", () => removeCartItem(index));
        
        container.appendChild(itemRow);
    });
    
    document.getElementById("cart-subtotal").textContent = `$${subtotal.toLocaleString('es-AR')}`;
};

const adjustCartItemQty = (index, delta) => {
    const item = state.cart[index];
    const dbProduct = state.products.find(p => p.id === item.id);
    const maxStock = dbProduct ? dbProduct.stock : 99;
    
    if (delta > 0 && item.qty >= maxStock) {
        showToast("Lo sentimos, no hay más stock disponible de este producto.", "error");
        return;
    }
    
    item.qty += delta;
    if (item.qty <= 0) {
        state.cart.splice(index, 1);
    }
    
    saveState.cart();
    updateCartBadge();
    renderCart();
};

const removeCartItem = (index) => {
    state.cart.splice(index, 1);
    saveState.cart();
    updateCartBadge();
    renderCart();
    showToast("Producto quitado de la bolsa", "success");
};

// ==========================================================================
// 8. AUTENTICACIÓN / ACCESO Y REGISTRO
// ==========================================================================

let checkoutPendingTrigger = false;

const openAuthModal = (isCheckoutRedirect = false) => {
    checkoutPendingTrigger = isCheckoutRedirect;
    
    // Reiniciamos forms
    document.getElementById("login-form").reset();
    document.getElementById("register-form").reset();
    document.getElementById("login-error").classList.add("hidden");
    document.getElementById("register-error").classList.add("hidden");
    
    // Mostrar Tab de Login por defecto
    toggleAuthTab("login");
    
    document.getElementById("auth-modal").classList.add("active");
};

const closeAuthModal = () => {
    document.getElementById("auth-modal").classList.remove("active");
    checkoutPendingTrigger = false;
};

const toggleAuthTab = (tab) => {
    const loginTab = document.getElementById("tab-login-btn");
    const regTab = document.getElementById("tab-register-btn");
    const loginForm = document.getElementById("login-form");
    const regForm = document.getElementById("register-form");
    
    if (tab === "login") {
        loginTab.classList.add("active");
        regTab.classList.remove("active");
        loginForm.classList.add("active");
        regForm.classList.remove("active");
    } else {
        loginTab.classList.remove("active");
        regTab.classList.add("active");
        loginForm.classList.remove("active");
        regForm.classList.add("active");
    }
};

const updateHeaderUserWidget = () => {
    const widget = document.getElementById("user-widget");
    widget.innerHTML = "";
    
    if (state.currentSession) {
        // Enlace al panel de administración visible solo si es admin
        const adminLink = document.getElementById("nav-admin-link");
        if (state.currentSession.role === "admin") {
            adminLink.classList.remove("hidden");
        } else {
            adminLink.classList.add("hidden");
        }
        
        // Enlace a Mi Cuenta
        document.getElementById("nav-profile-link").classList.remove("hidden");
        
        // Nombre corto del usuario logueado
        const firstName = state.currentSession.name.split(" ")[0];
        const initials = state.currentSession.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
        
        widget.innerHTML = `
            <div class="user-widget-profile" id="widget-profile-btn">
                <span class="user-avatar-circle">${initials}</span>
                <span>Hola, ${firstName}</span>
                <i class="fa-solid fa-angle-down" style="font-size:0.8rem; margin-left: 5px;"></i>
            </div>
        `;
        
        widget.querySelector("#widget-profile-btn").addEventListener("click", () => {
            navigateToView("profile-view");
        });
        
    } else {
        document.getElementById("nav-admin-link").classList.add("hidden");
        document.getElementById("nav-profile-link").classList.add("hidden");
        
        widget.innerHTML = `
            <button class="btn btn-outline-pink btn-sm" id="header-login-btn-widget">
                <i class="fa-solid fa-arrow-right-to-bracket"></i> Iniciar Sesión
            </button>
        `;
        
        widget.querySelector("#header-login-btn-widget").addEventListener("click", () => openAuthModal(false));
    }
};

// Formulario de Inicio de Sesión
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const pass = document.getElementById("login-password").value;
    try {
        const res = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: pass })
        });
        if (!res.ok) throw new Error('Invalid credentials');
        const user = await res.json();
        state.currentSession = {
            name: user.name,
            email: user.email,
            role: user.role
        };
        saveState.session();
        updateHeaderUserWidget();
        closeAuthModal();
        showToast(`¡Bienvenida de vuelta, ${user.name}!`, "success");
        if (checkoutPendingTrigger) {
            checkoutPendingTrigger = false;
            openCheckoutModal();
        } else {
            if (user.role === "admin") {
                navigateToView("admin-view");
            } else {
                navigateToView("shop-view");
            }
        }
    } catch (err) {
        console.error(err);
        document.getElementById("login-error").classList.remove("hidden");
    }
});

// Formulario de Registro de Clientes
document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const pass = document.getElementById("register-password").value;
    try {
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password: pass, role: "customer" })
        });
        if (!res.ok) throw new Error('User already exists');
        const newUser = await res.json();
        state.users.push(newUser);
        saveState.users();
        // Auto login
        state.currentSession = {
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        };
        saveState.session();
        updateHeaderUserWidget();
        closeAuthModal();
        showToast(`¡Cuenta registrada! Bienvenida ${newUser.name}`, "success");
        if (checkoutPendingTrigger) {
            checkoutPendingTrigger = false;
            openCheckoutModal();
        } else {
            navigateToView("shop-view");
        }
    } catch (err) {
        console.error(err);
        document.getElementById("register-error").classList.remove("hidden");
    }
});

// Cierre de Sesión
const performLogout = () => {
    state.currentSession = null;
    state.cart = []; // Vaciar carrito por privacidad al cerrar
    saveState.session();
    saveState.cart();
    
    updateCartBadge();
    updateHeaderUserWidget();
    showToast("Has cerrado sesión correctamente. ¡Hasta pronto!", "success");
    navigateToView("shop-view");
};

// ==========================================================================
// 9. PROCESO DE CHECKOUT / COMPRAS
// ==========================================================================

let selectedPaymentMethod = "card";

const selectPaymentMethod = (method) => {
    selectedPaymentMethod = method;
    
    // Toggle active class on selector buttons
    document.querySelectorAll(".pay-method-btn").forEach(btn => {
        if (btn.getAttribute("data-method") === method) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    
    // Toggle active class on payment sub-forms
    document.querySelectorAll(".payment-method-fields").forEach(fields => {
        if (fields.id === `payment-form-${method}`) {
            fields.classList.add("active");
        } else {
            fields.classList.remove("active");
        }
    });
    
    // Adjust required attributes based on selected method to prevent silent validation blocks
    const cardInputs = [
        document.getElementById("payment-cardname"),
        document.getElementById("payment-cardnumber"),
        document.getElementById("payment-expiry"),
        document.getElementById("payment-cvv")
    ];
    const mpEmail = document.getElementById("mp-email");
    
    if (method === "card") {
        cardInputs.forEach(input => { if (input) input.required = true; });
        if (mpEmail) mpEmail.required = false;
        document.getElementById("checkout-submit-text").textContent = "Confirmar y Pagar Tarjeta";
    } else if (method === "mercadopago") {
        cardInputs.forEach(input => { if (input) input.required = false; });
        if (mpEmail) mpEmail.required = true;
        document.getElementById("checkout-submit-text").textContent = "Confirmar y Pagar con Mercado Pago";
    } else if (method === "cash") {
        cardInputs.forEach(input => { if (input) input.required = false; });
        if (mpEmail) mpEmail.required = false;
        document.getElementById("checkout-submit-text").textContent = "Confirmar y Finalizar Pedido";
    }
};

const openCheckoutModal = () => {
    if (!state.currentSession) {
        openAuthModal(true);
        return;
    }
    
    if (state.cart.length === 0) {
        showToast("Tu bolsa de compras está vacía. Añade productos para comprar.", "error");
        return;
    }
    
    closeCartSidebar();
    
    // Rellenamos el resumen de compra en la pasarela
    const summaryItems = document.getElementById("checkout-summary-items");
    summaryItems.innerHTML = "";
    
    let subtotal = 0;
    state.cart.forEach(item => {
        subtotal += item.price * item.qty;
        
        const row = document.createElement("div");
        row.className = "checkout-sum-item";
        row.innerHTML = `
            <span class="checkout-sum-title">${item.title} (x${item.qty})</span>
            <span class="checkout-sum-price">$${(item.price * item.qty).toLocaleString('es-AR')}</span>
        `;
        summaryItems.appendChild(row);
    });
    
    document.getElementById("checkout-subtotal-val").textContent = `$${subtotal.toLocaleString('es-AR')}`;
    
    // Envío gratis a partir de 15,000
    const shippingVal = document.getElementById("checkout-shipping-val");
    let total = subtotal;
    if (subtotal >= 15000) {
        shippingVal.textContent = "¡GRATIS!";
        shippingVal.className = "text-success";
    } else {
        const shippingCost = 1500;
        shippingVal.textContent = `$${shippingCost.toLocaleString('es-AR')}`;
        shippingVal.className = "text-danger";
        total += shippingCost;
    }
    
    document.getElementById("checkout-total-val").textContent = `$${total.toLocaleString('es-AR')}`;
    
    // Rellenar por defecto los datos del titular de tarjeta
    document.getElementById("checkout-form").reset();
    selectPaymentMethod("card");
    document.getElementById("payment-cardname").value = state.currentSession.name;
    
    document.getElementById("checkout-modal").classList.add("active");
};

const closeCheckoutModal = () => {
    document.getElementById("checkout-modal").classList.remove("active");
};

// Formulario de Pago y Finalización
document.getElementById("checkout-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const address = document.getElementById("shipping-address").value.trim();
    const city = document.getElementById("shipping-city").value.trim();
    const postal = document.getElementById("shipping-postal").value.trim();
    const subtotal = state.cart.reduce((s, item) => s + (item.price * item.qty), 0);
    const total = subtotal >= 15000 ? subtotal : subtotal + 1500;
    const newOrderId = "ORD-" + Math.floor(1000 + Math.random() * 9000);
    let paymentMethodName = "";
    let paymentMethodDetails = "";
    if (selectedPaymentMethod === "card") {
        paymentMethodName = "Tarjeta";
        const cardNumber = document.getElementById("payment-cardnumber").value.replace(/\s+/g, '');
        const cardLast4 = cardNumber.substring(cardNumber.length - 4) || "5678";
        paymentMethodDetails = `Tarjeta terminada en ${cardLast4}`;
    } else if (selectedPaymentMethod === "mercadopago") {
        paymentMethodName = "Mercado Pago";
        const mpEmailVal = document.getElementById("mp-email").value.trim() || state.currentSession.email;
        paymentMethodDetails = `Mercado Pago (${mpEmailVal})`;
    } else if (selectedPaymentMethod === "cash") {
        paymentMethodName = "Efectivo";
        paymentMethodDetails = "Efectivo (Pago Contra Entrega / Talón)";
    }
    const newOrder = {
        id: newOrderId,
        date: new Date().toLocaleDateString('es-AR'),
        customerName: state.currentSession.name,
        customerEmail: state.currentSession.email,
        items: [...state.cart],
        total: total,
        status: "Preparando",
        address: `${address}, ${city} (${postal})`,
        paymentMethod: paymentMethodName,
        paymentDetails: paymentMethodDetails
    };
    // Decrement stock locally
    state.cart.forEach(cartItem => {
        const pIdx = state.products.findIndex(p => p.id === cartItem.id);
        if (pIdx > -1) {
            state.products[pIdx].stock = Math.max(0, state.products[pIdx].stock - cartItem.qty);
            state.products[pIdx].salesCount += cartItem.qty;
        }
    });
    // Persist order via API
    try {
        await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newOrder)
        });
        // Update local state as fallback
        state.orders.unshift(newOrder);
        saveState.orders();
        // Update sales via API (optional, here we just update local)
        const todayStr = new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
        const salesIdx = state.sales.findIndex(s => s.date === todayStr);
        if (salesIdx > -1) {
            state.sales[salesIdx].revenue += total;
            state.sales[salesIdx].count += 1;
        } else {
            state.sales.push({ date: todayStr, rawDate: new Date().toISOString().split('T')[0], revenue: total, count: 1 });
        }
        saveState.sales();
        // Clear cart
        state.cart = [];
        saveState.cart();
        updateCartBadge();
        renderCart();
        closeCheckoutModal();
        showToast("¡Orden creada exitosamente!", "success");
        // Optionally navigate to order confirmation view
    } catch (err) {
        console.error('Error creating order:', err);
        showToast('Error al crear la orden. Inténtalo nuevamente.', 'error');
    }
});            date: todayStr,
            revenue: total,
            count: 1,
            rawDate: new Date().toISOString().split('T')[0]
        });
        // Mantener solo los últimos 5
        if (state.sales.length > 5) state.sales.shift();
    }
    
    // Sincronizar bases locales
    saveState.products();
    saveState.orders();
    saveState.sales();
    
    // Vaciar Carrito
    state.cart = [];
    saveState.cart();
    updateCartBadge();
    
    // Cerrar Pasarela
    closeCheckoutModal();
    
    showToast(`¡Felicidades! Orden ${newOrderId} realizada con éxito.`, "success");
    
    // Redirigir a Mi Cuenta para ver el progreso de envío
    navigateToView("profile-view");
});

// ==========================================================================
// 10. VISTA DE PERFIL DE USUARIO (CLIENT COMPRAS)
// ==========================================================================

const renderUserProfile = () => {
    if (!state.currentSession) return;
    
    document.getElementById("profile-name").textContent = state.currentSession.name;
    document.getElementById("profile-email").textContent = state.currentSession.email;
    
    const roleBadge = document.getElementById("profile-role-badge");
    if (state.currentSession.role === "admin") {
        roleBadge.textContent = "Administrador Principal";
        roleBadge.style.background = "linear-gradient(135deg, #d4af37 0%, #fff0f3 100%)";
    } else {
        roleBadge.textContent = "Cliente Premium";
        roleBadge.style.background = "linear-gradient(135deg, #ffe5ec 0%, #fbb1bd 100%)";
    }
    
    const historyList = document.getElementById("client-orders-history");
    historyList.innerHTML = "";
    
    // Filtramos las órdenes del usuario actual
    const myOrders = state.orders.filter(o => o.customerEmail.toLowerCase() === state.currentSession.email.toLowerCase());
    
    if (myOrders.length === 0) {
        historyList.innerHTML = `
            <div class="cart-empty-state" style="padding: 40px 0;">
                <i class="fa-solid fa-receipt"></i>
                <h3>Aún no has realizado compras</h3>
                <p>Tu armario te espera. ¡Comienza a elegir tus looks rosas preferidos!</p>
                <button class="btn btn-pink" onclick="navigateToView('shop-view')">Ir a la Tienda</button>
            </div>
        `;
        return;
    }
    
    myOrders.forEach(o => {
        const card = document.createElement("div");
        card.className = "history-card";
        
        let statusClass = "status-low-stock"; // Prep
        if (o.status === "Entregado") statusClass = "status-in-stock";
        if (o.status === "En camino") statusClass = "status-low-stock";
        
        let itemsHTML = "";
        o.items.forEach(it => {
            itemsHTML += `
                <div class="history-prod-row">
                    <span class="history-prod-name">${it.title} (${it.size}, ${it.color})</span>
                    <span class="history-prod-qty">x${it.qty}</span>
                    <span>$${(it.price * it.qty).toLocaleString('es-AR')}</span>
                </div>
            `;
        });
        
        card.innerHTML = `
            <div class="history-card-header">
                <span class="history-card-id">Pedido: ${o.id}</span>
                <span class="history-card-date">Fecha de Compra: ${o.date}</span>
                <span class="status-badge ${statusClass}">${o.status}</span>
            </div>
            <div class="history-products-list">
                ${itemsHTML}
            </div>
            <div class="history-card-footer" style="flex-direction: column; align-items: flex-start; gap: 8px;">
                <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                    <span class="history-total-lbl">Dirección: <span style="font-weight:500; color:var(--medium-rose);">${o.address}</span></span>
                    <div>
                        <span class="history-total-lbl">Total Pago:</span>
                        <span class="history-total-val">$${o.total.toLocaleString('es-AR')}</span>
                    </div>
                </div>
                ${o.paymentMethod ? `
                <div style="font-size: 0.8rem; color: var(--medium-rose); margin-top: 5px; border-top: 1px dashed #ffe5ec; width: 100%; padding-top: 8px;">
                    <i class="fa-solid fa-wallet" style="margin-right: 5px; color: var(--primary-pink);"></i>
                    Medio de Pago: <strong>${o.paymentDetails || o.paymentMethod}</strong> (Ficticio)
                </div>
                ` : ''}
            </div>
        `;
        
        historyList.appendChild(card);
    });
};

// ==========================================================================
// 11. PANEL DE CONTROL DE ADMINISTRADOR
// ==========================================================================

const renderAdminDashboard = () => {
    if (!state.currentSession || state.currentSession.role !== "admin") {
        navigateToView("shop-view");
        return;
    }
    
    // --- 1. Calcular KPIs ---
    const totalRevenue = state.orders.reduce((sum, o) => sum + o.total, 0);
    const totalSalesCount = state.orders.length;
    const totalCustomersCount = state.users.filter(u => u.role === "customer").length;
    const lowStockCount = state.products.filter(p => p.stock <= 3).length;
    
    document.getElementById("kpi-revenue").textContent = `$${totalRevenue.toLocaleString('es-AR')}`;
    document.getElementById("kpi-sales-count").textContent = totalSalesCount;
    document.getElementById("kpi-users-count").textContent = totalCustomersCount;
    document.getElementById("kpi-low-stock").textContent = lowStockCount;
    
    // Alarma de stock bajo dinámico
    const lowStockLabel = document.getElementById("kpi-low-stock");
    if (lowStockCount > 0) {
        lowStockLabel.classList.add("text-danger");
    } else {
        lowStockLabel.classList.remove("text-danger");
    }
    
    // --- 2. Renderizar Gráfico de Ventas SVG ---
    renderSalesChart();
    
    // --- 3. Renderizar Productos Más Vendidos ---
    renderPopularProductsList();
    
    // --- 4. Renderizar Inventario Completo CRUD ---
    renderInventoryTable();
    
    // --- 5. Renderizar Pedidos Recibidos ---
    renderAdminOrdersTable();
};

// Dibujado del Gráfico de Líneas SVG en Tiempo Real
const renderSalesChart = () => {
    const container = document.getElementById("sales-chart-container");
    container.innerHTML = "";
    
    const chartSales = state.sales;
    if (chartSales.length === 0) return;
    
    const maxVal = Math.max(...chartSales.map(s => s.revenue), 10000) * 1.1; // 10% margen superior
    
    // Dimensiones del SVG
    const width = 500;
    const height = 220;
    const paddingLeft = 60;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 30;
    
    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;
    
    // Generar coordenadas de los puntos
    const points = chartSales.map((s, idx) => {
        const x = paddingLeft + (idx / (chartSales.length - 1)) * chartWidth;
        const y = height - paddingBottom - (s.revenue / maxVal) * chartHeight;
        return { x, y, label: s.date, value: s.revenue };
    });
    
    // Construir el camino (Path Spline o Line)
    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
        // Spline cúbico simple
        const cpX1 = points[i-1].x + (points[i].x - points[i-1].x) / 2;
        const cpY1 = points[i-1].y;
        const cpX2 = points[i-1].x + (points[i].x - points[i-1].x) / 2;
        const cpY2 = points[i].y;
        pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${points[i].x} ${points[i].y}`;
    }
    
    // Grid Lines y Escalas Laterales
    let gridHTML = "";
    const gridDivisions = 4;
    for (let i = 0; i <= gridDivisions; i++) {
        const yVal = paddingTop + (i / gridDivisions) * chartHeight;
        const valueLabel = Math.round(maxVal - (i / gridDivisions) * maxVal);
        
        gridHTML += `
            <line class="chart-grid-line" x1="${paddingLeft}" y1="${yVal}" x2="${width - paddingRight}" y2="${yVal}"></line>
            <text class="chart-axis-label" x="${paddingLeft - 10}" y="${yVal + 4}" text-anchor="end">$${valueLabel.toLocaleString('es-AR')}</text>
        `;
    }
    
    // Eje X Etiquetas
    let xAxisHTML = "";
    points.forEach(pt => {
        xAxisHTML += `
            <text class="chart-axis-label" x="${pt.x}" y="${height - 10}" text-anchor="middle">${pt.label}</text>
            <circle class="chart-point" cx="${pt.x}" cy="${pt.y}" r="5" title="$${pt.value}"></circle>
        `;
    });
    
    container.innerHTML = `
        <svg class="svg-chart" viewBox="0 0 ${width} ${height}">
            <!-- Cuadrícula -->
            ${gridHTML}
            
            <!-- Degradado debajo de la línea -->
            <defs>
                <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--primary-pink)" stop-opacity="0.3"></stop>
                    <stop offset="100%" stop-color="var(--primary-pink)" stop-opacity="0.0"></stop>
                </linearGradient>
            </defs>
            <path d="${pathD} L ${points[points.length-1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z" fill="url(#chart-grad)"></path>
            
            <!-- Línea de tendencia -->
            <path d="${pathD}" class="chart-line"></path>
            
            <!-- Puntos y Eje X -->
            ${xAxisHTML}
        </svg>
    `;
};

const renderPopularProductsList = () => {
    const list = document.getElementById("popular-products-list");
    list.innerHTML = "";
    
    // Clonamos y ordenamos por ventas de mayor a menor
    const sorted = [...state.products].sort((a, b) => b.salesCount - a.salesCount).slice(0, 4);
    
    sorted.forEach(p => {
        const li = document.createElement("li");
        li.className = "popular-item";
        li.innerHTML = `
            <img class="popular-item-img" src="${p.image}" alt="${p.title}">
            <div class="popular-item-details">
                <h4 class="popular-item-title">${p.title}</h4>
                <span class="popular-item-sales">${p.salesCount} ventas realizadas</span>
            </div>
            <span class="popular-item-revenue">$${(p.price * p.salesCount).toLocaleString('es-AR')}</span>
        `;
        list.appendChild(li);
    });
};

// Gestión de Inventario Tabla
let inventorySearchQuery = "";
let inventoryCategoryFilter = "all";

const renderInventoryTable = () => {
    const tbody = document.getElementById("inventory-table-body");
    tbody.innerHTML = "";
    
    let filtered = state.products.filter(p => {
        const matchesCat = inventoryCategoryFilter === "all" || p.category === inventoryCategoryFilter;
        const matchesSearch = p.title.toLowerCase().includes(inventorySearchQuery.toLowerCase()) ||
                              p.code.toLowerCase().includes(inventorySearchQuery.toLowerCase()) ||
                              p.category.toLowerCase().includes(inventorySearchQuery.toLowerCase());
        return matchesCat && matchesSearch;
    });
    
    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; color: var(--medium-rose); padding: 30px 0;">
                    No se encontraron productos en el inventario.
                </td>
            </tr>
        `;
        return;
    }
    
    filtered.forEach(p => {
        const tr = document.createElement("tr");
        
        let statusBadge = "";
        if (p.stock === 0) statusBadge = '<span class="status-badge status-no-stock">Sin Stock</span>';
        else if (p.stock <= 3) statusBadge = `<span class="status-badge status-low-stock">Crítico (${p.stock})</span>`;
        else statusBadge = '<span class="status-badge status-in-stock">En Stock</span>';
        
        tr.innerHTML = `
            <td><img class="admin-table-img" src="${p.image}" alt="${p.title}"></td>
            <td><strong>${p.code}</strong></td>
            <td>${p.title}</td>
            <td>${p.category}</td>
            <td><strong>$${p.price.toLocaleString('es-AR')}</strong></td>
            <td>${p.stock} un.</td>
            <td>${statusBadge}</td>
            <td>
                <div class="action-btns-cell">
                    <button class="btn-icon-circle btn-edit" data-id="${p.id}" title="Editar"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn-icon-circle btn-delete" data-id="${p.id}" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        
        // Listeners CRUD
        tr.querySelector(".btn-edit").addEventListener("click", () => openProductEditorModal(p));
        tr.querySelector(".btn-delete").addEventListener("click", () => deleteProduct(p.id));
        
        tbody.appendChild(tr);
    });
};

const renderAdminOrdersTable = () => {
    const tbody = document.getElementById("orders-table-body");
    tbody.innerHTML = "";
    
    if (state.orders.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: var(--medium-rose); padding: 30px 0;">
                    No se han registrado pedidos en la tienda aún.
                </td>
            </tr>
        `;
        return;
    }
    
    state.orders.forEach((o, index) => {
        const tr = document.createElement("tr");
        
        let statusClass = "status-low-stock"; // Prep
        if (o.status === "Entregado") statusClass = "status-in-stock";
        if (o.status === "En camino") statusClass = "status-low-stock";
        
        let itemsListHTML = o.items.map(it => `• ${it.title} (${it.qty})`).join("<br>");
        
        tr.innerHTML = `
            <td><strong>${o.id}</strong></td>
            <td>${o.date}</td>
            <td>
                <strong>${o.customerName}</strong><br>
                <span style="font-size:0.75rem; color:var(--medium-rose);">${o.customerEmail}</span>
                ${o.paymentMethod ? `
                <div style="margin-top: 5px;">
                    <span style="font-size: 0.7rem; display: inline-flex; align-items: center; gap: 4px; padding: 2px 6px; background: #fff0f3; border-radius: 4px; color: var(--primary-pink); font-weight: 600;" title="${o.paymentDetails}">
                        <i class="fa-solid fa-wallet"></i> ${o.paymentMethod}
                    </span>
                </div>
                ` : ''}
            </td>
            <td><div style="font-size: 0.8rem; line-height: 1.3;">${itemsListHTML}</div></td>
            <td><strong>$${o.total.toLocaleString('es-AR')}</strong></td>
            <td>
                <select class="form-control" style="padding: 5px; font-size: 0.8rem;" data-order-idx="${index}">
                    <option value="Preparando" ${o.status === 'Preparando' ? 'selected' : ''}>Preparando</option>
                    <option value="En camino" ${o.status === 'En camino' ? 'selected' : ''}>En camino</option>
                    <option value="Entregado" ${o.status === 'Entregado' ? 'selected' : ''}>Entregado</option>
                </select>
            </td>
            <td>
                <span class="status-badge ${statusClass}" id="badge-ord-${index}">${o.status}</span>
            </td>
        `;
        
        // Listener de actualización del estado de envío de la orden
        tr.querySelector("select").addEventListener("change", (e) => {
            const newStatus = e.target.value;
            state.orders[index].status = newStatus;
            saveState.orders();
            
            // Actualizar el Badge visualmente al cambiar sin refrescar todo
            const badge = document.getElementById(`badge-ord-${index}`);
            badge.textContent = newStatus;
            badge.className = `status-badge ${newStatus === 'Entregado' ? 'status-in-stock' : 'status-low-stock'}`;
            
            showToast(`Pedido ${o.id} actualizado a "${newStatus}"`, "success");
        });
        
        tbody.appendChild(tr);
    });
};

// --- CRUD: Eliminar Producto ---
const deleteProduct = (productId) => {
    if (confirm("¿Estás completamente segura de eliminar esta prenda del catálogo de Chic Rose?")) {
        state.products = state.products.filter(p => p.id !== productId);
        saveState.products();
        renderAdminDashboard();
        renderProductsCatalog();
        showToast("Prenda eliminada con éxito del inventario", "success");
    }
};

// ==========================================================================
// 12. CRUD: MODAL DE EDICIÓN & ALTA DE PRODUCTOS
// ==========================================================================

const openProductEditorModal = (product = null) => {
    const form = document.getElementById("product-editor-form");
    form.reset();
    
    document.getElementById("editor-image-preview").innerHTML = `<span>Sin previsualización de imagen</span>`;
    
    if (product) {
        // Modo Edición
        document.getElementById("editor-title").textContent = "Editar Prenda de Vestir";
        document.getElementById("editor-product-id").value = product.id;
        document.getElementById("editor-code").value = product.code;
        document.getElementById("editor-category").value = product.category;
        document.getElementById("editor-title-field").value = product.title;
        document.getElementById("editor-price").value = product.price;
        document.getElementById("editor-stock").value = product.stock;
        document.getElementById("editor-image").value = product.image;
        document.getElementById("editor-desc").value = product.description;
        
        // Previsualización inicial de la imagen
        updateImagePreview(product.image);
    } else {
        // Modo Creación
        document.getElementById("editor-title").textContent = "Agregar Nueva Prenda Femenina";
        document.getElementById("editor-product-id").value = "";
    }
    
    document.getElementById("product-editor-modal").classList.add("active");
};

const closeProductEditorModal = () => {
    document.getElementById("product-editor-modal").classList.remove("active");
};

// Listener para previsualizar imagen mientras se escribe o pierde el foco
document.getElementById("editor-image").addEventListener("blur", (e) => {
    updateImagePreview(e.target.value);
});
document.getElementById("editor-image").addEventListener("input", (e) => {
    updateImagePreview(e.target.value);
});

const updateImagePreview = (url) => {
    const previewBox = document.getElementById("editor-image-preview");
    if (url && url.startsWith("http")) {
        previewBox.innerHTML = `<img src="${url}" alt="Preview">`;
    } else {
        previewBox.innerHTML = `<span>Sin previsualización de imagen</span>`;
    }
};

// Formulario de Submit CRUD (Guardar / Actualizar)
document.getElementById("product-editor-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const id = document.getElementById("editor-product-id").value;
    const code = document.getElementById("editor-code").value.trim().toUpperCase();
    const category = document.getElementById("editor-category").value;
    const title = document.getElementById("editor-title-field").value.trim();
    const price = parseFloat(document.getElementById("editor-price").value);
    const stock = parseInt(document.getElementById("editor-stock").value);
    const image = document.getElementById("editor-image").value.trim();
    const desc = document.getElementById("editor-desc").value.trim();
    
    if (id) {
        // 1. Guardar Edición
        const idx = state.products.findIndex(p => p.id === id);
        if (idx > -1) {
            state.products[idx] = {
                ...state.products[idx],
                code: code,
                category: category,
                title: title,
                price: price,
                stock: stock,
                image: image,
                description: desc
            };
            showToast("Prenda de vestir actualizada correctamente", "success");
        }
    } else {
        // 2. Alta de producto nuevo
        const newId = "prod-" + (state.products.length + 100);
        const newProduct = {
            id: newId,
            code: code,
            category: category,
            title: title,
            price: price,
            stock: stock,
            image: image,
            description: desc,
            salesCount: 0
        };
        state.products.push(newProduct);
        showToast("¡Nueva prenda agregada con éxito al catálogo!", "success");
    }
    
    // Sincronizar bases de datos y volver a renderizar vistas
    saveState.products();
    renderProductsCatalog();
    renderAdminDashboard();
    closeProductEditorModal();
});

// ==========================================================================
// 13. REGISTRO DE EVENT LISTENERS GLOBALES E INICIALIZACIÓN
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Inicializaciones ---
    updateHeaderUserWidget();
    renderProductsCatalog();
    updateCartBadge();
    renderCart();
    
    // --- Eventos de Navegación SPA ---
    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const view = e.currentTarget.getAttribute("data-view");
            navigateToView(view);
        });
    });
    
    document.getElementById("nav-logo-btn").addEventListener("click", (e) => {
        e.preventDefault();
        navigateToView("shop-view");
    });
    
    // Enlaces de categorías rápidos en Footer
    document.querySelectorAll(".footer-link-cat").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const cat = e.currentTarget.getAttribute("data-category");
            activeCategoryFilter = cat;
            
            // Activar píldora correspondiente en la UI superior
            document.querySelectorAll(".cat-pill").forEach(pill => {
                pill.classList.remove("active");
                if (pill.getAttribute("data-category") === cat) {
                    pill.classList.add("active");
                }
            });
            
            navigateToView("shop-view");
            renderProductsCatalog();
        });
    });

    // Botón explorar Hero
    document.getElementById("explore-btn").addEventListener("click", () => {
        const targetElement = document.querySelector(".catalog-container");
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
    
    // --- Eventos Carrito Sidebar ---
    document.getElementById("open-cart-btn").addEventListener("click", openCartSidebar);
    document.getElementById("close-cart-btn").addEventListener("click", closeCartSidebar);
    document.getElementById("cart-backdrop").addEventListener("click", closeCartSidebar);
    document.getElementById("checkout-btn-cart").addEventListener("click", openCheckoutModal);
    
    // --- Eventos Filtros de Catálogo ---
    document.querySelectorAll(".cat-pill").forEach(pill => {
        pill.addEventListener("click", (e) => {
            document.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
            e.currentTarget.classList.add("active");
            activeCategoryFilter = e.currentTarget.getAttribute("data-category");
            renderProductsCatalog();
        });
    });
    
    // Barra de búsqueda en tiempo real
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        renderProductsCatalog();
    });
    
    document.getElementById("search-btn").addEventListener("click", () => {
        searchQuery = searchInput.value;
        renderProductsCatalog();
    });
    
    // Ordenar por select
    document.getElementById("sort-select").addEventListener("change", (e) => {
        sortOption = e.target.value;
        renderProductsCatalog();
    });
    
    // Filtro Rango de Precios
    const priceRange = document.getElementById("price-range");
    priceRange.addEventListener("input", (e) => {
        maxPriceFilter = parseFloat(e.target.value);
        document.getElementById("price-max-val").textContent = `$${maxPriceFilter.toLocaleString('es-AR')}`;
        renderProductsCatalog();
    });
    
    // Filtro Stock Disponible Checkbox
    document.getElementById("filter-stock").addEventListener("change", (e) => {
        onlyInStock = e.target.checked;
        renderProductsCatalog();
    });
    
    // --- Eventos Modales ---
    
    // Modal Detalle de Producto
    document.getElementById("close-detail-modal-btn").addEventListener("click", closeProductDetailModal);
    
    // Seleccionar Talla en modal
    document.querySelectorAll(".size-pill").forEach(pill => {
        pill.addEventListener("click", (e) => {
            document.querySelectorAll(".size-pill").forEach(p => p.classList.remove("active"));
            e.currentTarget.classList.add("active");
            selectedSize = e.currentTarget.getAttribute("data-size");
        });
    });
    
    // Seleccionar Color en modal
    document.querySelectorAll(".color-dot").forEach(dot => {
        dot.addEventListener("click", (e) => {
            document.querySelectorAll(".color-dot").forEach(d => d.classList.remove("active"));
            e.currentTarget.classList.add("active");
            selectedColor = e.currentTarget.getAttribute("data-color");
        });
    });
    
    // Controladores Cantidad en modal
    const qtyInput = document.getElementById("modal-qty-input");
    
    document.getElementById("modal-qty-minus").addEventListener("click", () => {
        const val = parseInt(qtyInput.value);
        if (val > 1) qtyInput.value = val - 1;
    });
    
    document.getElementById("modal-qty-plus").addEventListener("click", () => {
        const val = parseInt(qtyInput.value);
        if (activeModalProduct && val < activeModalProduct.stock) {
            qtyInput.value = val + 1;
        } else {
            showToast("No puedes exceder el stock disponible de la prenda.", "error");
        }
    });
    
    // Añadir desde modal
    document.getElementById("modal-add-to-cart-btn").addEventListener("click", () => {
        if (activeModalProduct) {
            addToCart(activeModalProduct, qtyInput.value, selectedSize, selectedColor);
        }
    });
    
    // Favorito desde modal
    document.getElementById("modal-fav-btn").addEventListener("click", (e) => {
        if (activeModalProduct) {
            toggleFavorite(activeModalProduct.id, e.currentTarget);
        }
    });
    
    // Modal Autenticación (Login/Registro)
    document.getElementById("close-auth-modal-btn").addEventListener("click", closeAuthModal);
    document.getElementById("tab-login-btn").addEventListener("click", () => toggleAuthTab("login"));
    document.getElementById("tab-register-btn").addEventListener("click", () => toggleAuthTab("register"));
    
    // Modal Checkout
    document.getElementById("close-checkout-modal-btn").addEventListener("click", closeCheckoutModal);
    
    // Selectores de Medios de Pago
    document.querySelectorAll(".pay-method-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const method = e.currentTarget.getAttribute("data-method");
            selectPaymentMethod(method);
        });
    });
    
    // Modal Administrador CRUD
    document.getElementById("close-editor-modal-btn").addEventListener("click", closeProductEditorModal);
    document.getElementById("cancel-editor-btn").addEventListener("click", closeProductEditorModal);
    document.getElementById("admin-add-product-btn").addEventListener("click", () => openProductEditorModal(null));
    
    // Sub-pestañas dentro de Admin
    document.querySelectorAll(".admin-tab-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".admin-tab-btn").forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".admin-tab-content").forEach(c => c.classList.add("hidden"));
            
            e.currentTarget.classList.add("active");
            const tabId = e.currentTarget.getAttribute("data-tab");
            document.getElementById(tabId).classList.remove("hidden");
        });
    });
    
    // Buscador dentro de Inventario de Admin
    document.getElementById("inventory-search-input").addEventListener("input", (e) => {
        inventorySearchQuery = e.target.value;
        renderInventoryTable();
    });
    
    // Filtro categoría dentro de Inventario de Admin
    document.getElementById("inventory-filter-category").addEventListener("change", (e) => {
        inventoryCategoryFilter = e.target.value;
        renderInventoryTable();
    });
    
    // Perfil Cierre de Sesión
    document.getElementById("logout-btn").addEventListener("click", performLogout);
});
