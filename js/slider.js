const sliderTrack = document.getElementById('sliderTrack');
const sliderItems = document.querySelectorAll('.slider-track article');
const btnAnterior = document.getElementById('anterior');
const btnProximo = document.getElementById('proximo');

let slideAtual = 0;

function moverSlider() {
    sliderTrack.style.transform = `translateX(-${slideAtual * 100}%)`;
}

btnProximo.addEventListener('click', () => {
    slideAtual = (slideAtual + 1) % sliderItems.length;
    moverSlider();
});

btnAnterior.addEventListener('click', () => {
    slideAtual = (slideAtual - 1 + sliderItems.length) % sliderItems.length;
    moverSlider();
});