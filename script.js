* {
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background-color: #f7f9f3;
    color: #333;
    margin: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

header {
    text-align: center;
    margin-bottom: 20px;
}

h1 {
    color: #2e7d32;
    margin-bottom: 10px;
}

#painel {
    background-color: #ffffff;
    padding: 12px 25px;
    border-radius: 30px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    gap: 30px;
}

.moedas { color: #fbc02d; }
.clima { color: #e67e22; }

main {
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 900px;
    width: 100%;
    align-items: center;
}

@media (min-width: 768px) {
    main {
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
    }
}

#loja {
    background-color: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    width: 100%;
    max-width: 320px;
}

.opcoes-loja {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.btn-semente {
    background-color: #f5f5f5;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    padding: 10px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    text-align: left;
    display: flex;
    align-items: center;
    transition: all 0.2s;
}

.btn-semente:hover { background-color: #f0f4c3; }
.btn-semente.ativa { background-color: #d4edda; border-color: #28a745; }

.emoji-loja { font-size: 2rem; margin-right: 15px; }
.btn-semente small { font-weight: normal; color: #666; margin-left: auto; text-align: right; }

#campo {
    background-color: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

#fazenda {
    display: grid;
    grid-template-columns: repeat(3, 110px);
    grid-gap: 12px;
    background-color: #8d6e63;
    padding: 15px;
    border-radius: 12px;
}

.lote {
    width: 110px;
    height: 110px;
    background-color: #5d4037;
    border: 3px solid #4e342e;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.15s;
    user-select: none;
}

.lote:hover { transform: scale(1.04); background-color: #6d4c41; }

/* Estilo para Lotes Bloqueados */
.lote.bloqueado {
    background-color: #9e9e9e;
    border-color: #757575;
}
.lote.bloqueado:hover {
    background-color: #e0e0e0;
}

.icone { font-size: 2.3rem; }
.status-texto {
    font-size: 0.7rem;
    color: #fff;
    margin-top: 6px;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 2px 4px;
    border-radius: 4px;
    text-align: center;
}

.pronto { animation: balancar 0.6s infinite alternate ease-in-out; }
@keyframes balancar { from { transform: rotate(-6deg); } to { transform: rotate(6deg); } }
