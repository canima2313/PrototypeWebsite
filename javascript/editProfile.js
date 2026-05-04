const user = JSON.parse(localStorage.getItem("currentUser"));

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

pfp.src = user.profilePic;
name_input.placeholder = user.name;
email_input.placeholder = user.email;
age_input.placeholder = user.age;
pass_input.placeholder = "Leave blank to keep password";
conf_input.placeholder = "Leave blank to keep password";

pass_toggle.addEventListener('click', () => {
    if (pass_toggle.checked){
        pass_input.type = "text";
        conf_input.type = "text";
    } else {
        pass_input.type = "password";
        conf_input.type = "password";
    }
});

pic_input.onchange = function(){
    pfp.src = URL.createObjectURL(pic_input.files[0]);
};

function hasUppercase(str){
    for (let i = 0; i < str.length; i++)
        if (str[i] === str[i].toUpperCase() && str[i] !== str[i].toLowerCase()) return true;
    return false;
}
function hasLowercase(str){
    for (let i = 0; i < str.length; i++)
        if (str[i] === str[i].toLowerCase() && str[i] !== str[i].toUpperCase()) return true;
    return false;
}
function hasNumber(str){
    for (let i = 0; i < str.length; i++)
        if ("0123456789".includes(str[i])) return true;
    return false;
}

form_input.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    let users = JSON.parse(localStorage.getItem('users')) || [];

    const newName  = name_input.value.trim()  || user.name;
    const newEmail = email_input.value.trim() || user.email;
    const newAge   = age_input.value.trim()   || user.age;
    const newPass  = pass_input.value.trim()  || user.password;

    error1.textContent = "";
    error2.textContent = "";
    error3.textContent = "";
    error4.textContent = "";
    error5.textContent = "";

    if (name_input.value.trim() && name_input.value.trim().length <= 4){
        error1.textContent = "Name too short";
        valid = false;
    }
    if (email_input.value.trim() && !email_input.value.includes("@")){
        error2.textContent = "Enter a valid email";
        valid = false;
    }
    if (email_input.value.trim() && email_input.value.trim() !== user.email){
        if (users.find(u => u.email === email_input.value.trim())){
            error2.textContent = "Email already exists";
            valid = false;
        }
    }
    if (age_input.value.trim() && Number(age_input.value) < 18){
        error3.textContent = "You must be at least 18";
        valid = false;
    }
    if (pass_input.value.trim()){
        if (!hasUppercase(pass_input.value.trim())){
            error4.textContent = "Password must include 1 uppercase letter";
            valid = false;
        } else if (!hasLowercase(pass_input.value.trim())){
            error4.textContent = "Password must include 1 lowercase letter";
            valid = false;
        } else if (!hasNumber(pass_input.value.trim())){
            error4.textContent = "Password must include 1 number";
            valid = false;
        } else if (pass_input.value.trim() !== conf_input.value.trim()){
            error5.textContent = "Passwords do not match";
            valid = false;
        }
    }

    if (valid){
        const applyUpdate = (newPic) => {
            const updatedUser = { name: newName, email: newEmail, age: newAge, password: newPass, profilePic: newPic };
            const idx = users.findIndex(u => u.email === user.email);
            if (idx !== -1) users[idx] = updatedUser;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            alert("Profile updated!");
            window.location.href = "viewProfile.html";
        };

        const file = pic_input.files[0];
        if (file){
            const reader = new FileReader();
            reader.onload = (e) => applyUpdate(e.target.result);
            reader.readAsDataURL(file);
        } else {
            applyUpdate(user.profilePic);
        }
    }
});