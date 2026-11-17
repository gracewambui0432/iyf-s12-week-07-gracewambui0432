// 1. Centralized State
const state = {
    products: [
        { id: 1, name: "Mandazi (pack of 6)", price: 120 },
        { id: 2, name: "Chapati (pack of 5)", price: 150 },
        { id: 3, name: "Tea leaves 250g", price: 180 }
    ],

    cart: [],
    history: []
};

// 2. Load Cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem("shoppingCart");

    if (savedCart) {
        try {
            const parsedCart = JSON.parse(savedCart);

            if (Array.isArray(parsedCart)) {
                state.cart = parsedCart;
            }
        } catch (error) {
            console.error("Error loading cart:", error);
            state.cart = [];
        }
    }
}

// 3. Save Cart to localStorage
function saveCart() {
    localStorage.setItem(
        "shoppingCart",
        JSON.stringify(state.cart)
    );
}

// 4. Save Previous Cart State for Undo
function saveHistory() {
    state.history.push(
        JSON.parse(JSON.stringify(state.cart))
    );
}

// 5. Add Product to Cart
function addToCart(productId) {
    const productExists = state.products.some(
        product => product.id === productId
    );

    if (!productExists) return;

    saveHistory();

    const existing = state.cart.find(
        item => item.productId === productId
    );

    if (existing) {
        existing.quantity++;
    } else {
        state.cart.push({
            productId: productId,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
}

// 6. Update Product Quantity
function updateQuantity(productId, quantity) {
    const item = state.cart.find(
        item => item.productId === productId
    );

    if (!item || !Number.isInteger(quantity) || quantity < 0) {
        return;
    }

    saveHistory();

    if (quantity === 0) {
        removeFromCartWithoutHistory(productId);
    } else {
        item.quantity = quantity;
    }

    saveCart();
    renderCart();
}

// 7. Remove Product from Cart
function removeFromCartWithoutHistory(productId) {
    state.cart = state.cart.filter(
        item => item.productId !== productId
    );
}

function removeFromCart(productId) {
    const itemExists = state.cart.some(
        item => item.productId === productId
    );

    if (!itemExists) return;

    saveHistory();

    removeFromCartWithoutHistory(productId);

    saveCart();
    renderCart();
}

// 8. Calculate Cart Total
function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find(
            product => product.id === item.productId
        );

        return total + (product.price * item.quantity);
    }, 0);
}

// 9. Calculate Cart Count
function getCartCount() {
    return state.cart.reduce(
        (count, item) => count + item.quantity,
        0
    );
}

// 10. Display Products
function renderProducts() {
    const productsContainer =
        document.getElementById("products");

    productsContainer.innerHTML = state.products.map(product => `
        <div>
            <h3>${product.name}</h3>
            <p>Price: KSh ${product.price}</p>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
        <hr>
    `).join("");
}

// 11. Display Cart
function renderCart() {
    const cartContainer =
        document.getElementById("cart-items");

    cartContainer.innerHTML = state.cart.map(item => {
        const product = state.products.find(
            product => product.id === item.productId
        );

        if (!product) return "";

        return `
            <div>
                <h3>${product.name}</h3>

                <p>Price: KSh ${product.price}</p>

                <p>Quantity: ${item.quantity}</p>

                <button onclick="updateQuantity(
                    ${product.id}, ${item.quantity - 1}
                )">-</button>

                <button onclick="updateQuantity(
                    ${product.id}, ${item.quantity + 1}
                )">+</button>

                <button onclick="removeFromCart(${product.id})">
                    Remove
                </button>
            </div>
            <hr>
        `;
    }).join("");

    document.getElementById("cart-count").textContent =
        getCartCount();

    document.getElementById("cart-total").textContent =
        getCartTotal().toLocaleString("en-KE");
}

// 12. Clear Cart
function clearCart() {
    if (state.cart.length === 0) return;

    saveHistory();

    state.cart = [];

    saveCart();
    renderCart();
}

// 13. Undo Last Change
function undoLastChange() {
    if (state.history.length === 0) {
        alert("Nothing to undo!");
        return;
    }

    state.cart = state.history.pop();

    saveCart();
    renderCart();
}

// 14. Initialize Application
function init() {
    loadCart();

    renderProducts();
    renderCart();

    document.getElementById("clear-cart").addEventListener(
        "click",
        clearCart
    );

    document.getElementById("undo-cart").addEventListener(
        "click",
        undoLastChange
    );
}

// Start Application
init();
