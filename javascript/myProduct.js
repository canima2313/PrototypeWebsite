const user = JSON.parse(localStorage.getItem("currentUser"));
const prodGrid = document.getElementById('prod-grid');

function addProd(){
    localStorage.removeItem('editProductIdx');
    window.location.href = 'addProduct.html';
}

function renderProducts(){
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const mine = products.map((p, i) => ({ ...p, _idx: i })).filter(p => p.sellerEmail === user.email);
    prodGrid.innerHTML = '';
    if (mine.length === 0){
        prodGrid.innerHTML = '<p style="opacity:0.5;font-size:1rem;">No products yet.</p>';
        return;
    }
    mine.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.pic}" alt="${p.name}">
            <div class="prod-info">
                <h3>${p.name}</h3>
                <span class="prod-category">${p.category}</span>
                <div class="prod-meta">
                    <span>$${p.price}</span>
                    <span>Stock: ${p.stock}</span>
                </div>
            </div>
            <div class="prod-actions">
                <button class="btn-edit" onclick="editProduct(${p._idx})">Edit</button>
                <button class="btn-delete" onclick="deleteProduct(${p._idx})">Delete</button>
            </div>
        `;
        prodGrid.appendChild(card);
    });
}

function editProduct(idx){
    localStorage.setItem('editProductIdx', idx);
    window.location.href = 'addProduct.html';
}

function deleteProduct(idx){
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(idx, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
}
renderProducts();