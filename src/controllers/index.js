    const track = document.querySelector('.carousel-track');
    const imgs = document.querySelectorAll('.carousel-track img');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    let current = 0;

    function avanzar() {
        current = (current + 1) % imgs.length;
        track.style.transform = `translateX(-${current * 100}%)`;
    }

    let autoplay = setInterval(avanzar, 3000);

    next.addEventListener('click', () => {
        avanzar();
        reiniciarAutoplay();
    });

    prev.addEventListener('click', () => {
        current = (current - 1 + imgs.length) % imgs.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        reiniciarAutoplay();
    });

    function reiniciarAutoplay() {
        clearInterval(autoplay);
        autoplay = setInterval(avanzar, 3000);
    }

/* SECTION THREE */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('card-visible');
        }
    });
}, { threshold: 0.2 }); 

observer.observe(document.querySelector('.section-three'));
/* Esto permite cerrar sesion */
const btnPersonIndex = document.querySelector('.header-button a[href*="log-in"]');

if (btnPersonIndex) {
    const session = JSON.parse(localStorage.getItem('hilton-session'));
    if (session) {
        btnPersonIndex.removeAttribute('href');
        btnPersonIndex.querySelector('.material-symbols-outlined').textContent = 'logout';
        btnPersonIndex.title = `Cerrar sesión (${session.email})`;
        btnPersonIndex.style.cursor = 'pointer';
        btnPersonIndex.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('hilton-session');
            window.location.reload();
        });
    }
}

/* Parqueadero, lo que hace es verificar si esta o no registrado*/
const cardParqueadero = document.querySelector('.card-five');

if (cardParqueadero) {
    cardParqueadero.addEventListener('click', () => {
        const session = JSON.parse(localStorage.getItem('hilton-session'));
        const parqueaderoURL = '/src/views/pages/Parqueadero.html';

        if (session) {
            window.location.href = parqueaderoURL;
        } else {
            const loginURL = `/src/views/pages/log-in.html?redirect=${encodeURIComponent(parqueaderoURL)}`;
            window.location.href = loginURL;
        }
    });
}