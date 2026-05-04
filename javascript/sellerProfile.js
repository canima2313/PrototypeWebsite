const sellerEmail = localStorage.getItem('viewSellerEmail');
const users = JSON.parse(localStorage.getItem('users')) || [];
const products = JSON.parse(localStorage.getItem('products')) || [];

const seller = users.find(u => u.email === sellerEmail);
if (!seller) {
    document.body.innerHTML = '<p style="padding:6rem;text-align:center;font-size:1.5rem;">Seller not found.</p>';
    throw new Error('no seller');
}

const sellerProducts = products
    .map((p, i) => ({ ...p, _idx: i }))
    .filter(p => p.sellerEmail === sellerEmail);

document.getElementById('pfp').src = seller.profilePic;
document.getElementById('name').textContent = seller.name;
document.getElementById('email').textContent = seller.email;
document.getElementById('age').textContent = seller.age;
document.getElementById('prod-count').textContent = sellerProducts.length;

const grid = document.getElementById('prod-grid');
if (sellerProducts.length === 0) {
    grid.innerHTML = '<p style="opacity:0.5;font-size:1rem;">No products listed.</p>';
} else {
    sellerProducts.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.pic}" alt="${p.name}">
            <div class="prod-info">
                <h3>${p.name}</h3>
                <span class="prod-category">${p.category}</span>
                <div class="prod-meta">
                    <span>$${parseFloat(p.price).toFixed(2)}</span>
                    <span>Stock: ${p.stock}</span>
                </div>
            </div>
        `;
        card.addEventListener('click', () => {
            localStorage.setItem('viewProductIdx', p._idx);
            window.location.href = 'productInfo.html';
        });
        grid.appendChild(card);
    });
}
