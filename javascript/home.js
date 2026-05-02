const btn = document.getElementById("toggle");
btn.addEventListener("click", () => {
    const isDark = btn.classList.toggle("dark");
    document.documentElement.setAttribute('data-theme' ,isDark ? 'dark' : 'light');
});

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener("mousemove", (e) => {
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
    })
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
})
