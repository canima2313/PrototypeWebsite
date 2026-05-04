const user = JSON.parse(localStorage.getItem("currentUser"));

const nameDisp = document.getElementById('name');
const emailDisp = document.getElementById('email');
const age = document.getElementById('age');
const password = document.getElementById('pass');
const profilePic = document.getElementById('pfp');
const pass_toggle = document.getElementById('toggle-pass');

pass_toggle.addEventListener('click', () => {
    if (pass_toggle.checked){
        password.textContent = user.password;
    }
    else{
        password.textContent = "********";
    }
})

profilePic.src = user.profilePic;
nameDisp.textContent = user.name;
emailDisp.textContent = user.email;
age.textContent = user.age;
