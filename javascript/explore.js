const PER_PAGE = 8;
let currentPage = 1;
let minRating = 0;

const searchBar = document.getElementById('search-bar');
const filterCategory = document.getElementById('filter-category');
const priceMin = document.getElementById('price-min');
const priceMax = document.getElementById('price-max');
const minSold = document.getElementById('min-sold');
const starFilter = document.getElementById('star-filter');
const ratingLabel = document.getElementById('rating-label');
const prodGrid = document.getElementById('prod-grid');
const pagination = document.getElementById('pagination');
const btnClear = document.getElementById('btn-clear');

starFilter.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', () => {
        const val = parseInt(star.dataset.val);
        if (minRating === val) {
            minRating = 0;
            ratingLabel.textContent = 'Any';
            starFilter.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
        } else {
            minRating = val;
            ratingLabel.textContent = `${val}★ & up`;
            starFilter.querySelectorAll('.star').forEach(s => {
                s.classList.toggle('active', parseInt(s.dataset.val) <= val);
            });
        }
        currentPage = 1;
        render();
    });
});

function getFiltered() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const query = searchBar.value.trim().toLowerCase();
    const cat = filterCategory.value;
    const pMin = parseFloat(priceMin.value) || 0;
    const pMax = parseFloat(priceMax.value) || Infinity;
    const mSold = parseInt(minSold.value) || 0;

    return products
        .map((p, i) => ({ ...p, _idx: i, rating: p.rating || 0, sold: p.sold || 0 }))
        .filter(p => {
            if (query && !p.name.toLowerCase().includes(query)) return false;
            if (cat && p.category !== cat) return false;
            if (parseFloat(p.price) < pMin || parseFloat(p.price) > pMax) return false;
            if (p.sold < mSold) return false;
            if (p.rating < minRating) return false;
            return true;
        });
}

function renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<span class="${i <= Math.round(rating) ? 'star-filled' : 'star-empty'}">★</span>`;
    }
    return html;
}

function render() {
    const filtered = getFiltered();
    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * PER_PAGE;
    const page = filtered.slice(start, start + PER_PAGE);

    prodGrid.innerHTML = '';
    if (page.length === 0) {
        prodGrid.innerHTML = '<p class="no-results">No products found.</p>';
    } else {
        page.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${p.pic}" alt="${p.name}">
                <div class="card-info">
                    <h3>${p.name}</h3>
                    <span class="card-cat">${p.category}</span>
                    <div class="card-stars">${renderStars(p.rating)}</div>
                    <div class="card-bottom">
                        <span class="card-price">$${parseFloat(p.price).toFixed(2)}</span>
                        <span class="card-sold">${p.sold} sold</span>
                    </div>
                </div>
            `;
            card.addEventListener('click', () => {
                localStorage.setItem('viewProductIdx', p._idx);
                window.location.href = 'productInfo.html';
            });
            prodGrid.appendChild(card);
        });
    }

    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
        btn.textContent = i;
        btn.addEventListener('click', () => {
            currentPage = i;
            render();
        });
        pagination.appendChild(btn);
    }
}

[searchBar, filterCategory, priceMin, priceMax, minSold].forEach(el => {
    el.addEventListener('input', () => { currentPage = 1; render(); });
});

btnClear.addEventListener('click', () => {
    searchBar.value = '';
    filterCategory.value = '';
    priceMin.value = '';
    priceMax.value = '';
    minSold.value = '';
    minRating = 0;
    ratingLabel.textContent = 'Any';
    starFilter.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
    currentPage = 1;
    render();
});

render();
