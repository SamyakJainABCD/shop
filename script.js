class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

class Cart {
    constructor() {
        this.items = [];
        this.totalPrice = 0;
        this.cartDate = new Date();
    }

    addItem(product) {
        const currentTime = new Date(); // Get the current time
        this.items.push({ ...product, addedAt: currentTime }); // Add the item with the timestamp
        this.totalPrice += product.price;
        this.updateCartDisplay();
    }

    buy() {
        this.items = [];
        this.totalPrice = 0;
        this.updateCartDisplay();
    }

    removeItem(productId) {
        const index = this.items.findIndex(item => item.id === productId);
        if (index > -1) {
            this.totalPrice -= this.items[index].price;
            this.items.splice(index, 1);
            this.updateCartDisplay();
        }
    }

    updateCartDisplay() {
        const cartItemsList = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');
        cartItemsList.innerHTML = '';

        this.items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('cart-item');

            const formattedTime = item.addedAt.toLocaleString(); // Format the added time
            listItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <span>Added at: ${formattedTime}</span>
                <button class="delete-btn" data-id="${item.id}">Delete</button>
            `;
            cartItemsList.appendChild(listItem);
        });

        totalPriceElement.innerText = this.totalPrice.toFixed(2);

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.getAttribute('data-id'));
                this.removeItem(productId);
            });
        });
    }
}

const products = [
    new Product(1, 'The Ultimate Bottle Opener for Every Occasion', 10.00, 'https://i5.walmartimages.com/asr/99c66980-c525-4a15-9f79-f2577e0c8ae9_1.ee70602fb4c3c3c8f6d89e3edd1dc2f3.jpeg'),
    new Product(2, 'Pop it Open with Ease and Style', 15.00, 'https://www.drinkstuff.com/productimg/120479_large.jpg'),
    new Product(3, 'Your Perfect Companion for Opening Bottles', 20.00, 'https://www.mbswholesale.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/3/5/3584_small_stainless_steel_hand_held_bottle_opener.jpg'),
    new Product(4, 'Effortless Bottle Opening, Every Time, Anywhere', 20.00, 'https://abrazo.in/cdn/shop/products/61BaN3tgQ8L._SL1500_1445x.jpg?v=1620019002'),
    new Product(5, 'Quick and Easy Bottle Opening in Seconds', 20.00, 'https://www.jiomart.com/images/product/original/rv4d23g0ig/hasthip-multicolor-waiters-corkscrew-wine-bottle-opener-professional-wood-handle-foil-cutter-product-images-orv4d23g0ig-p600524445-0-202304141256.jpg?im=Resize=(420,420)')
];
const cart = new Cart();

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const productId = parseInt(event.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        cart.addItem(product);
    });
});

document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        cart.buy();
    });
});


