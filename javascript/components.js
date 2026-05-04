function renderNavbar(){
    const loggedIn = localStorage.getItem("currentUser") !== null;
    const desktopLinks = loggedIn
        ? `<a class="auth-link" href="#" id="logout-btn">Logout</a>
           <button class="auth-link deskBtn profile-btn">Profile</button>`
        : `<a class="auth-link" href="./login.html">Login</a>
           <a class="auth-link" href="./register.html">Register</a>`;

    const dropdownLinks = loggedIn
        ? `<button class="auth-link mobileBtn profile-btn">Profile</button>
           <a href="#" id="logout-btn-mobile">Logout</a>`
        : `<a href="./login.html">Login</a>
           <a href="./register.html">Register</a>`;

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
                ${desktopLinks}
                <button class="hamburger" id="hamburger" aria-label="Open menu">
                    <span></span><span></span><span></span>
                </button>
            </span>
        </header>
        <div class="auth-dropdown" id="authDropdown">
            ${dropdownLinks}
        </div>
        <div class="auth-dropdown" id="profileDropdown">
            <a href="viewProfile.html">View profile</a>
            <a>Edit profile</a>
            <a>My product</a>
        </div>
    `;

    const profileDropdown = document.getElementById('profileDropdown');
    document.querySelectorAll('.profile-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('open');
        });
    });
    

    const ham = document.getElementById('hamburger');
    const drop = document.getElementById('authDropdown');
    ham.addEventListener('click', (e) => {
        e.stopPropagation();
        drop.classList.toggle('open');
    });
    document.addEventListener('click', () => {
        drop.classList.remove('open');
        profileDropdown.classList.remove('open');
    });

    if (loggedIn) {
        const logout = document.getElementById('logout-btn');
        const logoutMobile = document.getElementById('logout-btn-mobile');
        const handleLogout = (e) => {
            e.preventDefault();
            localStorage.removeItem("currentUser");
            window.location.href = "./home.html";
        };
        if (logout) logout.addEventListener('click', handleLogout);
        if (logoutMobile) logoutMobile.addEventListener('click', handleLogout);
    }
}

function renderFooter(){
    document.getElementById('footer').innerHTML = `
        <div class="footer-container">
            <h3>Never Stop Selling</h3>
            <div class="wrap">
                <div class="text">
                    <p>081212345678</p>
                    <a>mOGuSupport@gmail.com</a>
                </div>
                <div class="logos">
                    <a href="https://www.instagram.com/ikann.daratt/"><img src="./assets/Instagram-logo-webp-small-size.webp" alt="instagram"></a>
                    <a href="https://www.linkedin.com/in/nathan-jeremy-alexander-b69b78385/"><img src="./assets/LinkedIn_icon.svg.webp" alt="linkedIn"></a>
                    <a href="https://letterboxd.com/doodoobirdman/diary/"><img src="./assets/Adobe_Illustrator_CC_icon.svg.png" alt="letterboxd"></a>
                </div>
            </div>
        </div>
    `;
}