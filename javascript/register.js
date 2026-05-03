const name_input = document.getElementById('name');
const email_input = document.getElementById('email');
const age_input = document.getElementById('age');
const pass_input = document.getElementById('pass');
const conf_input = document.getElementById('conf');
let pfp = document.getElementById('file-pic');
let pic_input = document.getElementById('input-file');
const pass_toggle = document.getElementById('toggle-pass');

const form_input = document.getElementById('regist');

const picError = document.getElementById('p1');
const error1 = document.getElementById('e1');
const error2 = document.getElementById('e2');
const error3 = document.getElementById('e3');
const error4 = document.getElementById('e4');
const error5 = document.getElementById('e5');

pass_toggle.addEventListener('click', () => {
    if (pass_toggle.checked){
        pass_input.type = "text";
        conf_input.type = "text";
    }
    else{
        pass_input.type = "password";
        conf_input.type = "password";
    }
})

pic_input.onchange = function(){
    pfp.src = URL.createObjectURL(pic_input.files[0]);
}

function saveUser(users){
    const file = pic_input.files[0];
    console.log("file:", file); // add this
    console.log("users before save:", users); // add this
    if (file){
        const reader = new FileReader();
        reader.onload = (e) => {
            const userData = {
                name: name_input.value.trim(),
                email: email_input.value.trim(),
                age: age_input.value.trim(),
                password: pass_input.value.trim(),
                profilePic: e.target.result
            };
            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));
        };
        reader.readAsDataURL(file);
    }else {
        const userData = {
            name: name_input.value.trim(),
            email: email_input.value.trim(),
            age: age_input.value.trim(),
            password: pass_input.value.trim(),
            profilePic: "2662192176.png"
        };
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
    }
    window.location.href = "login.html";
};

name_input.addEventListener('keyup', () => {
    if (name_input.value.trim() <= 4) {
        error1.textContent = "Name too short"
    } else {
        error1.textContent = ""
    }
});
email_input.addEventListener('keyup', () => {
    if (!email_input.value.includes("@")) {
        error2.textContent = "Enter a valid email";
    } else {
        error2.textContent = ""
    }
});
age_input.addEventListener('keyup', () => {
    if (Number(age_input.value) < 18) {
        error3.textContent = "You must be at least 18";
    } else {
        error3.textContent = ""
    }
});
pass_input.addEventListener('keyup', () => {
    if (!/[A-Z]/.test(pass_input.value.trim())) {
        error4.textContent = "Password must include 1 uppercase letter";
    } else {
        error4.textContent = ""
    }
});
pass_input.addEventListener('keyup', () => {
    if (!/[A-Z]/.test(pass_input.value.trim())) {
        error4.textContent = "Password must include 1 uppercase letter";
    } else {
        error4.textContent = ""
    }
});
pass_input.addEventListener('keyup', () => {
    if (!/[a-z]/.test(pass_input.value.trim())) {
        error4.textContent = "Password must include 1 lowercase letter";
    } else {
        error4.textContent = ""
    }
});
pass_input.addEventListener('keyup', () => {
    if (!/[0-9]/.test(pass_input.value.trim())) {
        error4.textContent = "Password must include 1 number";
    } else {
        error4.textContent = ""
    }
});
conf_input.addEventListener('keyup', () => {
    if (pass_input.value.trim() !== conf_input.value.trim()) {
        error5.textContent = "Password mistmatched";
    } else {
        error5.textContent = ""
    }
});

form_input.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (name_input.value.length <= 4){
        valid = false;
        error1.textContent = "Name too short"
    }
    if (!email_input.value.includes("@")){
        valid = false;
        error2.textContent = "Enter a valid email";
    }
    if (users.find(user => user.email === email_input.value.trim())){
        valid = false;
        error2.textContent = "Email already exist";
    }
    if (Number(age_input.value) < 18){
        valid = false;
        error3.textContent = "You must be at least 18";
    }
    if (!/[A-Z]/.test(pass_input.value.trim())){
        valid = false;
        error4.textContent = "Password must include 1 uppercase letter";
    }
    if (!/[a-z]/.test(pass_input.value.trim())){
        valid = false;
        error4.textContent = "Password must include 1 lowercase letter";
    }
    if (!/[0-9]/.test(pass_input.value.trim())){
        valid = false;
        error4.textContent = "Password must include 1 number";
    }
    if (pass_input.value.trim() !== conf_input.value.trim()){
        valid = false;
        error5.textContent = "Password mistmatched";
    }

    if (valid === true){
        alert("Account successfully created");
        saveUser(users);
    }
})
