// =========================================================
// SINTONIZADOR DE ESTAÇÕES DE RÁDIO
// =========================================================
const stationBtns = document.querySelectorAll('[data-spotify]');
const spotifyPlayer = document.getElementById('spotifyPlayer');
const stationStatus = document.getElementById('stationStatus');

if (spotifyPlayer && stationBtns.length > 0) {
    stationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            stationBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            spotifyPlayer.src = btn.dataset.spotify;
            if (stationStatus) {
                stationStatus.textContent = `FREQUÊNCIA ATIVA: ${btn.dataset.station}`;
            }
        });
    });
}