class Product {
    constructor(id, name, price, previousPrice, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.previousPrice = previousPrice;
        this.image = image;
    }
}

class Cart {
    constructor() {
        this.items = [];
        this.date = new Date().toLocaleString();
    }

    addItem(product) {
        const addedTime = new Date().toLocaleString();  // Capture the time when the item is added
        this.items.push({ ...product, addedTime });  // Add the product with the added time
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }

    displayCart() {
        const cartArea = document.querySelector('.cart-area');
        const cartItemsWrapper = document.querySelector('.cart-items-wrapper');
        const cartTotalWrapper = document.querySelector('.cart-total-wrapper');
        cartItemsWrapper.innerHTML = '';
        cartTotalWrapper.innerHTML = '';

        if (this.items.length === 0) {
            cartItemsWrapper.innerHTML = `
                <div class="cart-empty-message">
                    Your cart is empty. Add some items to your cart!
                </div>
            `;
            return;
        }

        this.items.forEach(item => {
            cartItemsWrapper.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <p>${item.name}</p>
                    <p>₹${item.price}</p>
                    <p class="added-time">Added on: ${item.addedTime}</p> <!-- Display added time -->
                    <span class="delete-btn" data-id="${item.id}">🗑️</span>
                </div>
            `;
        });

        const total = this.getTotal();
        cartTotalWrapper.innerHTML = `
            <div class="cart-total">
                <p>Total: ₹${total}</p>
                <p>Delivery Fees: ₹50</p>
                <p><strong>Grand Total: ₹${total + 50}</strong></p>
                <button class="buy-now-btn">Buy Now</button>
            </div>
        `;

        const deleteButtons = cartArea.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                this.removeItem(productId);
                this.displayCart();
            });
        });

        const buyNowButton = cartArea.querySelector('.buy-now-btn');
        buyNowButton.addEventListener('click', () => {
            alert('Thank you for your purchase!');
            this.items = [];
            this.displayCart();
        });
    }
}


const products = [
    new Product(1, 'Anti-Theft Laptop Backpack With USB-A and USB-C Type Charging Port for Men & Women For Business Professionals & College Students', 500, 800, 'assets/bag.jpg'),
    new Product(2, 'Study Table for Students Bed Table for Study Foldable Laptop Table Portable & Lightweight Mini Table Bed Reading Table,Laptop Stands, Laptop Desk (A1)', 1200, 2000, 'assets/laptop-table.webp'),
    new Product(3, 'Hauser XO RT Retractable Ball Pen | Sleek Body & Minimalistic Design | Matt Finish & Solid Body Type | Low Viscosity Ink With Ultra Durable Tip | Black Ink, Set Of 10', 300, 500, 'assets/pens.jpg'),
    new Product(4, 'Moon Lamp 3D 7 Color Changing Moon Light Night Table lamp for Bedroom for Adults and Kids Home Room Beautiful Indoor Lighting Home Decoration-15CM, LED, acrylic', 1500, 1900, 'assets/moon.jpg'),
    new Product(5, '3D Galaxy Crystal Ball Night Light | Dimmable Engraved LED Glass Ball Table Lamp with USB and Wooden Base for Home Decor, Office, Birthday Gift & Kids Bedroom (Saturn)', 700, 900, 'assets/planets.jpg'),
    new Product(6, 'Apple 2024 MacBook Air (13-inch, Apple M3 chip with 8‑core CPU and 8‑core GPU, 16GB Unified Memory, 256GB) - Midnight', 107000, 190000, 'assets/mbp.jpg'),
    new Product(6, 'Yuva Go Android 13.0 Smart Projector, 2X Brighter, 1080P & 4K Support, Rotatable Design, Auto & 4D Keystone with Netflix, Prime etc, WiFi 6 & BT, Screen Mirroring, ARC, 720P Native', 7000, 9000, 'assets/projector.jpg')
];

const cart = new Cart();

const productGrid = document.querySelector('.product-grid');
products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    
    productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-img">
    <h3>${product.name}</h3>
    <p class="price">
        <span class="discount-price">₹${product.price}</span>
        <span class="previous-price">₹${product.previousPrice}</span>
    </p>
    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    
    productGrid.appendChild(productElement);
});

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        cart.addItem(product);
        cart.displayCart();
    });
});
