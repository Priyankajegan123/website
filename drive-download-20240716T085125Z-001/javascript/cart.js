const products = [
    { id: 1, name: 'Lipstick', price: 100.00 },
    { id: 2, name: 'Foundation', price: 200.00 },
    { id: 3, name: 'Mascara', price: 120.00 },
    { id: 4, name: 'Eyeliner', price: 160.00 },
    { id: 5, name: 'Nailpolish', price: 150.00 }
];


let cart = [];


function addToCart(id) {
    const product = products.find(item => item.id === id);
    if (product) {
        cart.push({ ...product, quantity: 1 });
        updateCart();
    }
}


function updateCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    
    updateTotal();
}


function removeFromCart(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCart();
    }
}


function updateTotal() {
    const totalElement = document.getElementById('cart-total');
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    totalElement.innerHTML = `
        <h3>Total:</h3>
        <p>$${total.toFixed(2)}</p>
        <button onclick="checkout()">Checkout</button>
    `;
}


function checkout() {
    alert('Thank you for your purchase!');
    cart = []; 
    updateCart(); 
}


document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.productId);
            addToCart(productId);
        });
    });
});