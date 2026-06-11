// Configurações das plantas disponíveis no jogo
const tiposSementes = {
    cenoura: { nome: "Cenoura", emoji: "🥕", custo: 2, recompensa: 5, tempo: 3000 },
    tomate: { nome: "Tomate", emoji: "🍅", custo: 5, recompensa: 12, tempo: 6000 },
    melancia: { nome: "Melancia", emoji: "🍉", custo: 10, recompensa: 28, tempo: 12000 }
};

// Estado da conta do jogador
let moedas = 15; // Moedas iniciais
let experiencia = 0;
let nivel = 1;
let sementeSelecionada = "cenoura"; // Começa com a cenoura ativa

// Estado dos 9 lotes (vazio, plantado, regado, pronto)
// Armazena também os dados do vegetal que foi plantado especificamente ali
let lotes = Array(9).fill(null).map(() => ({
    estado: "vazio",
    vegetal: null
}));

// Executa assim que a página carrega para desenhar as moedas na tela
atualizarInterface();

// Função da loja para mudar qual semente o jogador quer plantar
function selecionarSemente(tipo) {
    sementeSelecionada = tipo;
    
    // Atualiza a parte visual dos botões da loja
    document.querySelectorAll('.btn-semente').forEach(btn => btn.classList.remove('ativa'));
    document.getElementById(`btn-${tipo}`).classList.add('ativa');
    
    // Atualiza o texto informativo
    const veg = tiposSementes[tipo];
    document.getElementById('semente-ativa-texto').innerText = `${veg.nome} ${veg.emoji}`;
}

// Atualiza o painel de dinheiro e nível na tela
function atualizarInterface() {
    document.getElementById('moedas-valor').innerText = moedas;
    document.getElementById('nivel-valor').innerText = nivel;
}

// Função principal de clique nos lotes de terra
function interagir(id) {
    let lote = lotes[id];
    let iconeEl = document.getElementById(`ico-${id}`);
    let textoEl = document.getElementById(`txt-${id}`);
    let dadosVegetal = tiposSementes[sementeSelecionada];

    // FASE 1: O lote está vazio -> Planta a semente selecionada
    if (lote.estado === "vazio") {
        if (moedas >= dadosVegetal.custo) {
            moedas -= dadosVegetal.custo;
            
            lote.estado = "plantado";
            lote.vegetal = dadosVegetal; // Guarda qual planta está neste pedaço de terra
            
            iconeEl.innerText = "🌱";
            textoEl.innerText = "Regar!";
            atualizarInterface();
        } else {
            alert(`Você não tem moedas suficientes para comprar sementes de ${dadosVegetal.nome}!`);
        }
    } 
    // FASE 2: Está plantado -> Precisa regar para começar a crescer
    else if (lote.estado === "plantado") {
        lote.estado = "regado";
        iconeEl.innerText = "💦";
        textoEl.innerText = "Crescendo...";

        // Inicia o timer baseado no tempo específico do vegetal escolhido
        setTimeout(() => {
            lote.estado = "pronto";
            iconeEl.innerText = lote.vegetal.emoji; // Mostra o fruto final
            iconeEl.classList.add("pronto"); // Ativa a animação CSS de balanço
            textoEl.innerText = "Colher!";
        }, lote.vegetal.tempo);
    } 
    // FASE 3: O vegetal cresceu -> Colhe, recebe o dinheiro e limpa o lote
    else if (lote.estado === "pronto") {
        // Guarda a recompensa antes de limpar o lote
        moedas += lote.vegetal.recompensa;
        experiencia += lote.vegetal.custo * 2; // Ganha XP baseado no valor da semente

        // Reseta as variáveis do lote de terra para ficar vazio novamente
        lote.estado = "vazio";
        lote.vegetal = null;
        
        iconeEl.innerText = "🟫";
        iconeEl.classList.remove("pronto"); // Remove animação
        textoEl.innerText = "Vazio";

        // Verifica se o jogador subiu de nível (Sobe a cada 40 pontos de XP acumulados)
        if (experiencia >= nivel * 40) {
            nivel++;
            experiencia = 0;
            alert(`🎉 Incrível! Você evoluiu para o Nível ${nivel}! Sua fazenda está prosperando! 🌾`);
        }

        atualizarInterface();
    }
}

