const idx = parseInt(localStorage.getItem('buyProductIdx'));
const products = JSON.parse(localStorage.getItem('products')) || [];
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

const product = products[idx];
if (!product || !currentUser) {
    window.location.href = 'explore.html';
    throw new Error('invalid state');
}

document.getElementById('conf-img').src = product.pic;
document.getElementById('conf-name').textContent = product.name;
document.getElementById('conf-category').textContent = product.category;
document.getElementById('conf-price').textContent = `$${parseFloat(product.price).toFixed(2)}`;
document.getElementById('conf-stock').textContent = `${product.stock} in stock`;

document.getElementById('confirm-btn').addEventListener('click', () => {
    if (parseInt(product.stock) <= 0) {
        alert('Sorry, this product is out of stock.');
        return;
    }

    // Record purchase
    const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
    purchases.push({ userEmail: currentUser.email, productIdx: idx });
    localStorage.setItem('purchases', JSON.stringify(purchases));

    // Update product stock and sold count
    product.stock = parseInt(product.stock) - 1;
    product.sold = (product.sold || 0) + 1;
    products[idx] = product;
    localStorage.setItem('products', JSON.stringify(products));

    localStorage.removeItem('buyProductIdx');
    alert('Purchase confirmed! Thank you.');
    window.location.href = `productInfo.html`;
});
