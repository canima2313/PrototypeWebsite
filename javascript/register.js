const name_input = document.getElementById('name');
const age_input = document.getElementById('age');
const pass_input = document.getElementById('pass');
const conf_input = document.getElementById('conf');
const form_input = document.getElementById('regist');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    if (name_input.length <= 4){
        valid = false;
        alert("name too short");
    }

    if (valid === true){
        alert("Account successfully created");
    }
})