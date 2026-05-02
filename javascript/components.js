
function renderNavbar(){
    document.getElementById('nav').innerHTML = `
        <header class="navbar">
            <div class="left">
                <div class="toggle-track" id="toggle">
                    <div class="toggle-thumb">
                    </div>
                </div>
            </div>
            <span class="middle">
                <a href="./home.html">Home</a>
                <a href="./explore.html">Explore</a>
                <a href="./aboutUs.html">About us</a>
            </span>
            <span class="right">
                <a class="auth-link" href="./login.html">Login</a>
                <a class="auth-link" href="./register.html">Register</a>
                <button class="hamburger" id="hamburger" aria-label="Open menu">
                    <span></span><span></span><span></span>
                </button>
            </span>
        </header>
        <div class="auth-dropdown" id="authDropdown">
            <a href="./login.html">Login</a>
            <a href="./register.html">Register</a>
        </div>
    `;

    const ham = document.getElementById('hamburger');
    const drop = document.getElementById('authDropdown');
    ham.addEventListener('click', (e) => {
        e.stopPropagation();
        drop.classList.toggle('open');
    });
    document.addEventListener('click', () => drop.classList.remove('open'));
}

function renderFooter(){
    document.getElementById('footer').innerHTML = `
        <div class="footer-container">
            <h3>Never stop selling</h3>
            <p>081212345678</p>
            <a>mOGuSupport@gmail.com</a>
            <div class="logos">
                <img src="" alt="">
                <img src="" alt="">
                <img src="" alt="">
            </div>
        </div>
    `;
}