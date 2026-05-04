const email_input = document.getElementById('email');
const pass_input = document.getElementById('pass');

const pass_toggle = document.getElementById('toggle-pass');
const form_input = document.getElementById('login');

const error2 = document.getElementById('e2');
const error4 = document.getElementById('e4');

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

form_input.addEventListener('submit', () => {
    let valid = true;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(user => user.email === email_input.value.trim());

    if (!foundUser){
        valid = false;
        error2.textContent = "User does not exist";
    }
    else if (foundUser.password !== pass_input.value.trim()) { 
        valid = false;
        error4.textContent = "Wrong password";
    }

    if (valid === true){
        alert("login success");
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        window.location.href = "./home.html";
    }
})