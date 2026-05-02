const btn = document.getElementById("toggle");
btn.addEventListener("click", () => {
    const isDark = btn.classList.toggle("dark");
    document.documentElement.setAttribute('data-theme' ,isDark ? 'dark' : 'light');
});

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const rotateX = ((y - cy) / cy) * -6;
        const rotateY = ((x - cx) / cx) * 6; 

        card.style.transform = `
            perspective(600px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.05)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

const track = document.querySelector('.track');
const slides = () => Array.from(track.children);
const slideWidth = slides()[1].getBoundingClientRect().left - slides()[0].getBoundingClientRect().left;
const center = 2;
const nextSlideLenght = slideWidth - 80;

const dots = Array.from(document.querySelectorAll('.dot'));

function setActive(){
    slides().forEach(element => {
        element.classList.remove('active');
    });
    slides()[center].classList.add('active');

    const current = Number(slides()[center].dataset.index);
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
    });
}
function next(){
    track.style.transition = 'transform 0.4s ease';
    track.style.transform = `translateX(-${nextSlideLenght}px)`;

    track.addEventListener('transitionend', () => {
        track.style.transition = 'none';
        track.appendChild(track.firstElementChild);
        track.style.transform = `translateX(0)`;
        setActive();
    }, {once:true});
}
let autoPlay = setInterval(next, 2000);

const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
carousel.addEventListener('mouseleave', () => { autoPlay = setInterval(next, 2000); });

function prev(){
    track.style.transition = 'none';
    track.insertBefore(track.lastElementChild, track.firstElementChild);
    track.style.transform = `translateX(-${slideWidth}px)`;

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            track.style.transition = 'transform 0.4s ease';
            track.style.transform = 'translateX(0)';
        });
    });

    track.addEventListener('transitionend', () => {
        setActive();
    }, {once : true});
}

function previewImg(event){
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('preview');
        preview.src = e.target.result;
        preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}