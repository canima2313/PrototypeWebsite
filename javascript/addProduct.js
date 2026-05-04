const name = document.getElementById('name');
const category = document.getElementById('category');
const quant = document.getElementById('stock');
const description = document.getElementById('desc');
const price = document.getElementById('price');
let pic = document.getElementById('file-pic');
let pic_input = document.getElementById('input-file');
const form_input = document.getElementById('product');

const picError = document.getElementById('p1');
const error1 = document.getElementById('e1');
const error2 = document.getElementById('e2');
const error3 = document.getElementById('e3');
const error4 = document.getElementById('e4');

const editIdx = localStorage.getItem('editProductIdx');
const isEditing = editIdx !== null;

if (isEditing){
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const p = products[editIdx];
    if (p){
        name.value = p.name;
        category.value = p.category;
        quant.value = p.stock;
        description.value = p.description;
        price.value = p.price;
        pic.src = p.pic;
        document.querySelector('h1').textContent = 'Edit Product';
        document.querySelector('button[type="submit"]').textContent = 'Save Changes';
    }
}

pic_input.onchange = function(){
    pic.src = URL.createObjectURL(pic_input.files[0]);
}

function isNumber(str){
    const numbers = "0123456789";
    for (let i = 0; i < str.length; i++) {
        if (!numbers.includes(str[i])) return false;
    }
    return true;
}

form_input.addEventListener('submit', (e) => {
    e.preventDefault();
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    let valid = true;
    error1.textContent = '';
    error2.textContent = '';
    error3.textContent = '';
    picError.textContent = '';

    if (name.value.trim().length <= 3){
        error1.textContent = "Name too short";
        valid = false;
    }
    if (category.value === ''){
        error2.textContent = "Pick a category";
        valid = false;
    }
    if (!isNumber(quant.value) || Number(quant.value) <= 0){
        error3.textContent = "Must be a valid quantity above 0";
        valid = false;
    }
    if (!valid) return;

    const file = pic_input.files[0];

    const saveProduct = (picData) => {
        const product = {
            sellerEmail: currentUser.email,
            name: name.value.trim(),
            category: category.value,
            stock: quant.value,
            description: description.value,
            price: price.value,
            pic: picData
        };
        if (isEditing){
            products[editIdx] = product;
            localStorage.removeItem('editProductIdx');
            alert("Product updated");
        } else {
            products.push(product);
            alert("Product added");
        }
        localStorage.setItem('products', JSON.stringify(products));
        window.location.href = "viewProfile.html";
    };

    if (file){
        const reader = new FileReader();
        reader.onload = (e) => saveProduct(e.target.result);
        reader.readAsDataURL(file);
    } else if (isEditing){
        const existing = products[editIdx];
        saveProduct(existing.pic);
    } else {
        picError.textContent = "Picture can't be empty";
    }
})