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