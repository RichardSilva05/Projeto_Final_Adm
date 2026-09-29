// =========================================================
// ORÇAMENTOS - PAINEL SABINO GESSO
// Ordena a tabela por data ao clicar no cabeçalho "Data"
// =========================================================

function ordenarPorData(tabela, coluna) {

    const corpo =
        tabela.querySelector("tbody");

    const linhas =
        Array.from(corpo.querySelectorAll("tr"));

    const crescente =
        coluna.classList.toggle("ordem-crescente");

    linhas.sort((a, b) => {

        const dataA = new Date(a.dataset.data);
        const dataB = new Date(b.dataset.data);

        return crescente
            ? dataA - dataB
            : dataB - dataA;

    });

    linhas.forEach((linha) => corpo.appendChild(linha));

}


document.addEventListener("DOMContentLoaded", function () {

    const tabela =
        document.getElementById("tabelaOrcamentos");

    const colunaData =
        document.getElementById("colunaData");

    if (tabela && colunaData) {

        colunaData.addEventListener("click", function () {

            ordenarPorData(tabela, colunaData);

        });

    }


    // =====================================================
    // BOTÃO "NOVO ORÇAMENTO"
    // (por enquanto só um placeholder - ligar depois a uma
    // página/modal de cadastro de novo orçamento)
    // =====================================================

    const btnNovoOrcamento =
        document.getElementById("btnNovoOrcamento");

    if (btnNovoOrcamento) {

        btnNovoOrcamento.addEventListener("click", function () {

            alert("Aqui vai abrir o formulário de novo orçamento.");

        });

    }

});