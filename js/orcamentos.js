// =========================================================
// ORÇAMENTOS - PAINEL SABINO GESSO
// =========================================================
// Responsável por:
// - Carregar orçamentos do localStorage
// - Migrar os exemplos do HTML para o localStorage
// - Exibir os orçamentos na tabela
// - Formatar data e valor
// - Ordenar por data
// =========================================================


// =========================================================
// FORMATAÇÃO DE DATA
// =========================================================

function formatarData(data) {

    if (!data) {
        return "-";
    }

    const dataObj = new Date(data);

    if (isNaN(dataObj.getTime())) {
        return "-";
    }

    return dataObj.toLocaleDateString("pt-BR");
}


// =========================================================
// FORMATAÇÃO DE VALOR
// =========================================================

function formatarValor(valor) {

    const numero = Number(valor);

    if (isNaN(numero)) {
        return "R$ 0,00";
    }

    return numero.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// =========================================================
// CLASSE DO STATUS
// =========================================================

function obterClasseStatus(status) {

    const statusNormalizado =
        String(status || "")
            .toLowerCase()
            .trim();


    if (statusNormalizado === "aprovado") {
        return "status-aprovado";
    }


    if (statusNormalizado === "recusado") {
        return "status-recusado";
    }


    return "status-aguardando";
}


// =========================================================
// MIGRAR EXEMPLOS DO HTML
// =========================================================
// Os exemplos existentes no HTML são transformados em
// objetos e armazenados no localStorage.
//
// Isso permite que a página Projetos consiga encontrar
// Maria Fernandes e Pedro Lima como aprovados.
// =========================================================

function migrarExemplosParaLocalStorage() {

    const orcamentosSalvos =
        JSON.parse(
            localStorage.getItem("orcamentos")
        ) || [];


    // Se já existem orçamentos salvos,
    // não fazemos a migração novamente.
    if (orcamentosSalvos.length > 0) {
        return orcamentosSalvos;
    }


    const exemplos = [

        {
            codigo: "ORC-0001",
            clienteCodigo: "CLI-0001",
            clienteNome: "João Souza",
            servico: "Projeto de Gesso",
            area: "100 m²",
            prazo: "Até 30 dias",
            valor: 4000,
            status: "Aguardando",
            data: "2021-09-15T12:00:00"
        },


        {
            codigo: "ORC-0002",
            clienteCodigo: "CLI-0002",
            clienteNome: "Maria Fernandes",
            servico: "Projeto de Gesso",
            area: "100 m²",
            prazo: "Até 30 dias",
            valor: 5000,
            status: "Aprovado",
            data: "2021-09-13T12:00:00"
        },


        {
            codigo: "ORC-0003",
            clienteCodigo: "CLI-0003",
            clienteNome: "Pedro Lima",
            servico: "Projeto de Gesso",
            area: "100 m²",
            prazo: "Até 30 dias",
            valor: 3000,
            status: "Aprovado",
            data: "2021-08-15T12:00:00"
        },


        {
            codigo: "ORC-0004",
            clienteCodigo: "CLI-0004",
            clienteNome: "Ana Oliveira",
            servico: "Projeto de Gesso",
            area: "100 m²",
            prazo: "Até 30 dias",
            valor: 4000,
            status: "Recusado",
            data: "2021-08-01T12:00:00"
        },


        {
            codigo: "ORC-0005",
            clienteCodigo: "CLI-0005",
            clienteNome: "Marcos Peréra",
            servico: "Projeto de Gesso",
            area: "100 m²",
            prazo: "Até 30 dias",
            valor: 2000,
            status: "Aguardando",
            data: "2021-07-20T12:00:00"
        }

    ];


    localStorage.setItem(
        "orcamentos",
        JSON.stringify(exemplos)
    );


    return exemplos;
}


// =========================================================
// CARREGAR ORÇAMENTOS
// =========================================================

function carregarOrcamentos() {

    const tabela =
        document.getElementById(
            "tabelaOrcamentos"
        );


    if (!tabela) {
        return;
    }


    const corpo =
        tabela.querySelector("tbody");


    if (!corpo) {
        return;
    }


    // =====================================================
    // BUSCAR ORÇAMENTOS
    // =====================================================

    let orcamentos =
        JSON.parse(
            localStorage.getItem("orcamentos")
        ) || [];


    // =====================================================
    // SE NÃO EXISTIR NENHUM,
    // MIGRA OS EXEMPLOS DO HTML
    // =====================================================

    if (orcamentos.length === 0) {

        orcamentos =
            migrarExemplosParaLocalStorage();

    }


    // =====================================================
    // LIMPAR EXEMPLOS DO HTML
    // =====================================================

    corpo.innerHTML = "";


    // =====================================================
    // CASO NÃO TENHA ORÇAMENTOS
    // =====================================================

    if (orcamentos.length === 0) {

        const linha =
            document.createElement("tr");


        linha.innerHTML = `
            <td colspan="6" class="sem-orcamentos">
                Nenhum orçamento cadastrado.
            </td>
        `;


        corpo.appendChild(linha);

        return;
    }


    // =====================================================
    // ADICIONAR ORÇAMENTOS
    // =====================================================

    orcamentos.forEach(function (orcamento) {

        const linha =
            document.createElement("tr");


        linha.dataset.data =
            orcamento.data || "";


        linha.dataset.codigo =
            orcamento.codigo || "";


        // =================================================
        // CLIENTE
        // =================================================

        const colunaCliente =
            document.createElement("td");


        colunaCliente.textContent =
            orcamento.clienteNome || "-";


        // =================================================
        // CÓDIGO DO CLIENTE
        // =================================================

        const colunaCodigo =
            document.createElement("td");


        const codigo =
            document.createElement("span");


        codigo.className =
            "codigo-cliente";


        codigo.textContent =
            orcamento.clienteCodigo || "-";


        colunaCodigo.appendChild(codigo);


        // =================================================
        // DATA
        // =================================================

        const colunaData =
            document.createElement("td");


        colunaData.textContent =
            formatarData(
                orcamento.data
            );


        // =================================================
        // VALOR
        // =================================================

        const colunaValor =
            document.createElement("td");


        colunaValor.textContent =
            formatarValor(
                orcamento.valor
            );


        // =================================================
        // STATUS
        // =================================================

        const colunaStatus =
            document.createElement("td");


        const status =
            document.createElement("span");


        status.className =
            "status " +
            obterClasseStatus(
                orcamento.status
            );


        status.textContent =
            orcamento.status ||
            "Aguardando";


        colunaStatus.appendChild(
            status
        );


        // =================================================
        // DETALHES
        // =================================================

        const colunaDetalhes =
            document.createElement("td");


        const botaoDetalhes =
            document.createElement("button");


        botaoDetalhes.type =
            "button";


        botaoDetalhes.className =
            "btn-ver-detalhes";


        botaoDetalhes.textContent =
            "Ver Detalhes";


        botaoDetalhes.dataset.codigo =
            orcamento.codigo || "";


        colunaDetalhes.appendChild(
            botaoDetalhes
        );


        // =================================================
        // ADICIONAR LINHA
        // =================================================

        linha.appendChild(
            colunaCliente
        );


        linha.appendChild(
            colunaCodigo
        );


        linha.appendChild(
            colunaData
        );


        linha.appendChild(
            colunaValor
        );


        linha.appendChild(
            colunaStatus
        );


        linha.appendChild(
            colunaDetalhes
        );


        corpo.appendChild(
            linha
        );

    });


    configurarBotoesDetalhes();

}


// =========================================================
// ORDENAR POR DATA
// =========================================================

function ordenarPorData(
    tabela,
    coluna
) {

    const corpo =
        tabela.querySelector("tbody");


    if (!corpo) {
        return;
    }


    const linhas =
        Array.from(
            corpo.querySelectorAll("tr")
        );


    const crescente =
        coluna.classList.toggle(
            "ordem-crescente"
        );


    linhas.sort(function (a, b) {

        const dataA =
            new Date(
                a.dataset.data
            );


        const dataB =
            new Date(
                b.dataset.data
            );


        if (isNaN(dataA.getTime())) {
            return 1;
        }


        if (isNaN(dataB.getTime())) {
            return -1;
        }


        return crescente
            ? dataA - dataB
            : dataB - dataA;

    });


    linhas.forEach(function (linha) {

        corpo.appendChild(
            linha
        );

    });

}


// =========================================================
// BOTÕES DE DETALHES
// =========================================================

function configurarBotoesDetalhes() {

    const botoes =
        document.querySelectorAll(
            ".btn-ver-detalhes"
        );


    botoes.forEach(function (botao) {

        if (
            botao.dataset.configurado ===
            "true"
        ) {
            return;
        }


        botao.dataset.configurado =
            "true";


        botao.addEventListener(
            "click",
            function () {

                const codigo =
                    botao.dataset.codigo;


                if (codigo) {

                    alert(
                        "Detalhes do orçamento: " +
                        codigo
                    );

                } else {

                    alert(
                        "Detalhes do orçamento."
                    );

                }

            }
        );

    });

}


// =========================================================
// NOVO ORÇAMENTO
// =========================================================

function configurarNovoOrcamento() {

    const botao =
        document.getElementById(
            "btnNovoOrcamento"
        );


    if (!botao) {
        return;
    }


    botao.addEventListener(
        "click",
        function () {

            window.location.href =
                "novo-orcamento.html";

        }
    );

}


// =========================================================
// INICIALIZAÇÃO
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        carregarOrcamentos();


        const tabela =
            document.getElementById(
                "tabelaOrcamentos"
            );


        const colunaData =
            document.getElementById(
                "colunaData"
            );


        if (
            tabela &&
            colunaData
        ) {

            colunaData.addEventListener(
                "click",
                function () {

                    ordenarPorData(
                        tabela,
                        colunaData
                    );

                }
            );

        }


        configurarNovoOrcamento();

    }
);