const idx = parseInt(localStorage.getItem('viewProductIdx'));
const products = JSON.parse(localStorage.getItem('products')) || [];
const users = JSON.parse(localStorage.getItem('users')) || [];
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const purchases = JSON.parse(localStorage.getItem('purchases')) || [];

const product = products[idx];
if (!product) {
    document.body.innerHTML = '<p style="padding:6rem;text-align:center;font-size:1.5rem;">Product not found.</p>';
    throw new Error('no product');
}

function renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<span class="${i <= Math.round(rating) ? 'star-filled' : 'star-empty'}">★</span>`;
    }
    return html;
}

function avgRating() {
    const reviews = product.reviews || [];
    if (!reviews.length) return 0;
    return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
}

// --- Info Section ---
const seller = users.find(u => u.email === product.sellerEmail);
const sellerProducts = products.filter(p => p.sellerEmail === product.sellerEmail);
const avg = avgRating();

document.getElementById('prod-img').src = product.pic;
document.getElementById('prod-name').textContent = product.name;
document.getElementById('prod-price').textContent = `$${parseFloat(product.price).toFixed(2)}`;
document.getElementById('prod-stock').textContent = `${product.stock} in stock`;
document.getElementById('prod-sold').textContent = `${product.sold || 0} sold`;
document.getElementById('prod-desc').textContent = product.description || 'No description provided.';
document.getElementById('prod-rating').innerHTML =
    renderStars(avg) + `<span class="rating-num">${avg.toFixed(1)} (${(product.reviews || []).length} reviews)</span>`;

if (seller) {
    const btn = document.getElementById('seller-btn');
    btn.querySelector('.seller-pic').src = seller.profilePic;
    btn.querySelector('.seller-name').textContent = seller.name;
    btn.querySelector('.seller-count').textContent = `${sellerProducts.length} products sold`;
    btn.addEventListener('click', () => {
        localStorage.setItem('viewSellerEmail', seller.email);
        window.location.href = 'sellerProfile.html';
    });
} else {
    document.getElementById('seller-btn').style.display = 'none';
}

document.getElementById('buy-btn').addEventListener('click', () => {
    if (!currentUser) {
        alert('Please log in to buy products.');
        window.location.href = 'login.html';
        return;
    }
    localStorage.setItem('buyProductIdx', idx);
    window.location.href = 'confirmation.html';
});

// --- Reviews ---
let activeStarFilter = 0;

function renderReviews() {
    const reviews = product.reviews || [];
    const filtered = activeStarFilter === 0
        ? reviews
        : reviews.filter(r => r.rating === activeStarFilter);

    const container = document.getElementById('reviews-list');
    if (filtered.length === 0) {
        container.innerHTML = '<p class="no-reviews">No reviews here yet.</p>';
        return;
    }
    container.innerHTML = filtered.map(r => `
        <div class="review-card">
            <div class="review-header">
                <span class="review-name">${r.reviewerName}</span>
                <span class="review-stars">${renderStars(r.rating)}</span>
                <span class="review-date">${r.date}</span>
            </div>
            <p class="review-text">${r.text}</p>
        </div>
    `).join('');
}

document.querySelectorAll('.star-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.star-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeStarFilter = parseInt(btn.dataset.val);
        renderReviews();
    });
});

renderReviews();

// Show review form only if logged in and has bought this product
const hasBought = currentUser && purchases.some(p => p.userEmail === currentUser.email && p.productIdx === idx);
if (hasBought) {
    const form = document.getElementById('review-form');
    form.style.display = 'flex';

    document.getElementById('submit-review').addEventListener('click', () => {
        const text = document.getElementById('review-text').value.trim();
        const rating = parseInt(document.getElementById('review-rating').value);
        if (!text) {
            alert('Please write a review before submitting.');
            return;
        }
        const review = {
            reviewerEmail: currentUser.email,
            reviewerName: currentUser.name,
            rating,
            text,
            date: new Date().toISOString().split('T')[0]
        };
        if (!product.reviews) product.reviews = [];
        const existing = product.reviews.findIndex(r => r.reviewerEmail === currentUser.email);
        if (existing !== -1) {
            product.reviews[existing] = review;
        } else {
            product.reviews.push(review);
        }
        products[idx] = product;
        localStorage.setItem('products', JSON.stringify(products));
        document.getElementById('review-text').value = '';
        renderReviews();
        document.getElementById('prod-rating').innerHTML =
            renderStars(avgRating()) + `<span class="rating-num">${avgRating().toFixed(1)} (${product.reviews.length} reviews)</span>`;
        alert('Review submitted!');
    });
}

// --- Recommended ---
function renderRecommended() {
    const others = products.map((p, i) => ({ ...p, _idx: i })).filter(p => p._idx !== idx);
    for (let i = others.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [others[i], others[j]] = [others[j], others[i]];
    }
    const picks = others.slice(0, 5);
    const grid = document.getElementById('rec-grid');
    if (picks.length === 0) {
        grid.innerHTML = '<p style="opacity:0.5">No other products available.</p>';
        return;
    }
    grid.innerHTML = '';
    picks.forEach(p => {
        const card = document.createElement('div');
        card.className = 'rec-card';
        card.innerHTML = `
            <img src="${p.pic}" alt="${p.name}">
            <div class="rec-info">
                <h4>${p.name}</h4>
                <span class="rec-price">$${parseFloat(p.price).toFixed(2)}</span>
            </div>
        `;
        card.addEventListener('click', () => {
            localStorage.setItem('viewProductIdx', p._idx);
            window.location.href = 'productInfo.html';
        });
        grid.appendChild(card);
    });
}

renderRecommended();
