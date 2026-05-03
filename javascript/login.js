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

form_input.addEventListener('click', () => {
    
})