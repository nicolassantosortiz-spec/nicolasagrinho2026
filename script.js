const tiposSementes = {
    cenoura: { nome: "Cenoura", emoji: "🥕", custo: 2, recompensa: 5, tempo: 3000 },
    tomate: { nome: "Tomate", emoji: "🍅", custo: 6, recompensa: 15, tempo: 6000 },
    melancia: { nome: "Melancia", emoji: "🍉", custo: 12, recompensa: 32, tempo: 10000 }
};

let moedas = 20; 
let sementeSelecionada = "cenoura";
let climaAtual = "Ensolarado"; // Pode ser: Ensolarado, Chuvoso ou Seca
let modificadorTempo = 1; // Altera a velocidade de crescimento

// Configuração dos lotes (alguns começam bloqueados e têm um preço para liberar)
let lotes = [
    { estado: "vazio", vegetal: null, bloqueado: false, preco: 0 },
    { estado: "vazio", vegetal: null, bloqueado: false, preco: 0 },
    { estado: "vazio", vegetal: null, bloqueado: false, preco: 0 },
    { estado: "vazio", vegetal: null, bloqueado: false, preco: 0 },
    { estado: "vazio", vegetal: null, bloqueado: true, preco: 15 },
    { estado: "vazio", vegetal: null, bloqueado: true, preco: 15 },
    { estado: "vazio", vegetal: null, bloqueado: true, preco: 30 },
    { estado: "vazio", vegetal: null, bloqueado: true, preco: 30 },
    { estado: "vazio", vegetal: null, bloqueado: true, preco: 50 }
];

// Evento de clima mudando a cada 12 segundos automaticamente
setInterval(mudarClima, 12000);
atualizarInterface();

function mudarClima() {
    const climas = ["Ensolarado", "Chuvoso", "Seca"];
    climaAtual = climas[Math.floor(Math.random() * climas.length)];
    
    let climaTxt = document.getElementById('clima-texto');
    
    if (climaAtual === "Ensolarado") {
        climaTxt.innerText = "🌤️ Ensolarado (Normal)";
        modificadorTempo = 1;
    } else if (climaAtual === "Chuvoso") {
        climaTxt.innerText = "🌧️ Chuvoso (Mais Rápido!)";
        modificadorTempo = 0.5; // Corta o tempo de crescimento pela metade
    } else if (climaAtual === "Seca") {
        climaTxt.innerText = "🔥 Seca (Mais Lento)";
        modificadorTempo = 1.8; // Quase dobra o tempo necessário
    }
}

function selecionarSemente(tipo) {
    sementeSelecionada = tipo;
    document.querySelectorAll('.btn-semente').forEach(btn => btn.classList.remove('ativa'));
    document.getElementById(`btn-${tipo}`).classList.add('ativa');
    const veg = tiposSementes[tipo];
    document.getElementById('semente-ativa-texto').innerText = `${veg.nome} ${veg.emoji}`;
}

function atualizarInterface() {
    document.getElementById('moedas-valor').innerText = moedas;
}

function interagir(id) {
    let lote = lotes[id];
    let loteEl = document.getElementById(`lote-${id}`);
    let iconeEl = document.getElementById(`ico-${id}`);
    let textoEl = document.getElementById(`txt-${id}`);
    let dadosVegetal = tiposSementes[sementeSelecionada];

    // Se o lote estiver bloqueado, tenta comprá-lo
    if (lote.bloqueado) {
        if (moedas >= lote.preco) {
            moedas -= lote.preco;
            lote.bloqueado = false;
            loteEl.classList.remove('bloqueado');
            iconeEl.innerText = "🟫";
            textoEl.innerText = "Vazio";
            atualizarInterface();
        } else {
            alert(`Moedas insuficientes! Você precisa de ${lote.preco} moedas para liberar esta expansão.`);
        }
        return;
    }

    // Mecânica de Plantar
    if (lote.estado === "vazio") {
        if (moedas >= dadosVegetal.custo) {
            moedas -= dadosVegetal.custo;
            lote.estado = "plantado";
            lote.vegetal = dadosVegetal;
            iconeEl.innerText = "🌱";
            textoEl.innerText = "Regar!";
            atualizarInterface();
        } else {
            alert("Dinheiro insuficiente para essa semente!");
        }
    } 
    // Mecânica de Regar e Crescer
    else if (lote.estado === "plantado") {
        lote.estado = "regado";
        iconeEl.innerText = "💦";
        textoEl.innerText = "Crescendo...";

        // O tempo agora é multiplicado pelo fator climático atual
        let tempoCalculado = lote.vegetal.tempo * modificadorTempo;

        setTimeout(() => {
            lote.estado = "pronto";
            iconeEl.innerText = lote.vegetal.emoji;
            iconeEl.classList.add("pronto");
            textoEl.innerText = "Colher!";
        }, tempoCalculado);
    } 
    // Mecânica de Colher
    else if (lote.estado === "pronto") {
        moedas += lote.vegetal.recompensa;
        lote.estado = "vazio";
        lote.vegetal = null;
        iconeEl.innerText = "🟫";
        iconeEl.classList.remove("pronto");
        textoEl.innerText = "Vazio";
        atualizarInterface();
    }
}
