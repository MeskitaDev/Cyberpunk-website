// =========================================================
// FILTROS E MODAL DE LEITURA DA PÁGINA DE NOTÍCIAS (city.html)
// =========================================================
const newsFilterBtns = document.querySelectorAll('[data-news-filter]');
const newsCards = document.querySelectorAll('.news-card');

newsFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        newsFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filtro = btn.dataset.newsFilter;

        newsCards.forEach(card => {
            if (filtro === 'todas' || card.dataset.newsCat === filtro) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Controle do Modal de Leitura
const newsModal = document.getElementById('newsModal');
const closeModalBtn = document.getElementById('closeModalBtn');

document.querySelectorAll('.read-news-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('modalTitle').textContent = btn.dataset.title;
        document.getElementById('modalMeta').textContent = `// ${btn.dataset.meta}`;
        document.getElementById('modalContent').textContent = btn.dataset.full;
        newsModal.classList.add('open');
    });
});

if (closeModalBtn && newsModal) {
    closeModalBtn.addEventListener('click', () => {
        newsModal.classList.remove('open');
    });

    newsModal.addEventListener('click', (e) => {
        if (e.target === newsModal) {
            newsModal.classList.remove('open');
        }
    });
}