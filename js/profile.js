// =========================================================
// CADASTRO, TELEMETRIA DO PC E CRACHÁ DO OPERADOR
// =========================================================
const registerForm = document.getElementById('registerForm');
const registerBox = document.getElementById('registerBox');
const idCardWrapper = document.getElementById('idCardWrapper');
const resetOpBtn = document.getElementById('resetOpBtn');

// Captura informações reais do navegador e hardware do visitante
function obterTelemetriaPC() {
    const ua = navigator.userAgent;
    let sistema = "DESCONHECIDO";
    if (ua.includes("Win")) sistema = "WINDOWS OS";
    else if (ua.includes("Mac")) sistema = "MACOS KERNEL";
    else if (ua.includes("Linux")) sistema = "LINUX / UNIX";
    else if (ua.includes("Android")) sistema = "ANDROID CYBER-OS";
    else if (ua.includes("iPhone") || ua.includes("iPad")) sistema = "IOS NEURAL";

    let navegador = "WEB TERMINAL";
    if (ua.includes("Edg")) navegador = "MICROSOFT EDGE";
    else if (ua.includes("Chrome")) navegador = "GOOGLE CHROME";
    else if (ua.includes("Firefox")) navegador = "MOZILLA FIREFOX";
    else if (ua.includes("Safari")) navegador = "APPLE SAFARI";

    const nucleos = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} CORES` : "N/D";
    const memoria = navigator.deviceMemory ? `${navigator.deviceMemory} GB RAM` : "PROTEGIDO";
    const resolucao = `${window.screen.width}x${window.screen.height} PX`;
    const idioma = (navigator.language || "PT-BR").toUpperCase();
    const statusRede = navigator.onLine ? "ONLINE // CRIPTOGRAFADO" : "OFFLINE";

    return [
        { label: "SISTEMA OPERACIONAL", valor: sistema },
        { label: "NAVEGADOR / TERMINAL", valor: navegador },
        { label: "PROCESSAMENTO (CPU)", valor: nucleos },
        { label: "MEMÓRIA DETECTADA", valor: memoria },
        { label: "RESOLUÇÃO ÓPTICA", valor: resolucao },
        { label: "IDIOMA / REDE", valor: `${idioma} // ${statusRede}` }
    ];
}

// Calcula os níveis de Visão, Neural, Físico e Defesa pelos implantes equipados
function calcularNiveisOperador() {
    const equipados = JSON.parse(localStorage.getItem('neurogrid-equipados')) || [];
    
    let visao = 10, neural = 15, fisico = 10, defesa = 10;

    equipados.forEach(item => {
        if (item.category === 'visao') visao = Math.min(visao + 25, 100);
        if (item.category === 'neural') neural = Math.min(neural + 25, 100);
        if (item.category === 'fisico') fisico = Math.min(fisico + 20, 100);
        if (item.category === 'defesa') defesa = Math.min(defesa + 22, 100);
    });

    const atualizarBarra = (idTexto, idBarra, valor) => {
        const elTexto = document.getElementById(idTexto);
        const elBarra = document.getElementById(idBarra);
        if (elTexto && elBarra) {
            elTexto.textContent = `${valor}%`;
            elBarra.style.width = `${valor}%`;
        }
    };

    atualizarBarra('statVisao', 'barVisao', visao);
    atualizarBarra('statNeural', 'barNeural', neural);
    atualizarBarra('statFisico', 'barFisico', fisico);
    atualizarBarra('statDefesa', 'barDefesa', defesa);
}

// Renderiza o crachá na tela se já houver operador cadastrado
function renderizarCracha(operador) {
    if (!registerBox || !idCardWrapper) return;

    registerBox.style.display = 'none';
    idCardWrapper.style.display = 'block';

    document.getElementById('badgeSerial').textContent = `ID // ${operador.codigo}`;
    document.getElementById('badgeVerticalCode').textContent = operador.numeroCurto;
    document.getElementById('badgeNome').textContent = operador.nome;
    document.getElementById('badgeDistrito').textContent = operador.distrito;
    document.getElementById('badgeClasse').textContent = `${operador.classeNome} (${operador.limite} PTS)`;
    document.getElementById('badgeData').textContent = operador.dataRegistro;

    // Preenche a telemetria real do PC
    const specsGrid = document.getElementById('pcSpecsGrid');
    if (specsGrid) {
        specsGrid.innerHTML = obterTelemetriaPC()
            .map(spec => `<div class="telemetry-item"><span>${spec.label}</span><strong>${spec.valor}</strong></div>`)
            .join('');
    }

    calcularNiveisOperador();
}

// Evento de envio do formulário de cadastro
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const selectPerfil = document.getElementById('opPerfil');
        const numAleatorio = Math.floor(1000 + Math.random() * 9000);
        const hoje = new Date().toLocaleDateString('pt-BR');

        const operador = {
            nome: document.getElementById('opNome').value.trim().toUpperCase(),
            distrito: document.getElementById('opDistrito').value.trim().toUpperCase(),
            limite: parseInt(selectPerfil.value, 10),
            classeNome: selectPerfil.options[selectPerfil.selectedIndex].text.split(' (')[0].toUpperCase(),
            numeroCurto: `${numAleatorio}`,
            codigo: `NG-${numAleatorio}-2077`,
            dataRegistro: hoje
        };

        localStorage.setItem('neurogrid-operador', JSON.stringify(operador));
        renderizarCracha(operador);
    });
}

// Botão para refazer o cadastro
if (resetOpBtn) {
    resetOpBtn.addEventListener('click', () => {
        localStorage.removeItem('neurogrid-operador');
        idCardWrapper.style.display = 'none';
        registerBox.style.display = 'block';
    });
}

// Ao abrir profile.html, carrega o crachá automaticamente se já estiver cadastrado
const operadorExistente = JSON.parse(localStorage.getItem('neurogrid-operador'));
if (operadorExistente && registerBox) {
    renderizarCracha(operadorExistente);
}