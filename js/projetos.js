// =========================================================
// PROJETOS - PAINEL SABINO GESSO
// =========================================================
// Os projetos são gerados automaticamente a partir dos
// orçamentos que possuem status "Aprovado".
//
// Não existe um localStorage separado para projetos.
//
// ORÇAMENTOS
//     ↓
// status = Aprovado
//     ↓
// PROJETOS
//     ↓
// agrupados por cliente
// =========================================================


// =========================================================
// INICIALIZAÇÃO
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        carregarProjetos();

        configurarNovoProjeto();

    }
);


// =========================================================
// CARREGAR PROJETOS
// =========================================================

function carregarProjetos() {

    const container =
        document.getElementById(
            "projetosContainer"
        );


    if (!container) {
        return;
    }


    // =====================================================
    // BUSCAR ORÇAMENTOS
    // =====================================================

    const orcamentos =
        JSON.parse(
            localStorage.getItem("orcamentos")
        ) || [];


    // =====================================================
    // FILTRAR SOMENTE APROVADOS
    // =====================================================

    const aprovados =
        orcamentos.filter(
            function (orcamento) {

                const status =
                    String(
                        orcamento.status || ""
                    )
                    .trim()
                    .toLowerCase();


                return status === "aprovado";

            }
        );


    // =====================================================
    // NENHUM APROVADO
    // =====================================================

    if (aprovados.length === 0) {

        container.innerHTML = `

            <div class="nenhum-projeto">

                <div class="icone-vazio">

                    <i class="bi bi-kanban"></i>

                </div>

                <h2>
                    Nenhum projeto aprovado
                </h2>

                <p>
                    Os orçamentos aprovados aparecerão
                    automaticamente nesta área.
                </p>

            </div>

        `;

        return;
    }


    // =====================================================
    // AGRUPAR POR CLIENTE
    // =====================================================

    const clientes = {};


    aprovados.forEach(
        function (orcamento) {

            const codigoCliente =
                orcamento.clienteCodigo ||
                "SEM-CODIGO";


            // ---------------------------------------------
            // CRIA O CLIENTE SE AINDA NÃO EXISTIR
            // ---------------------------------------------

            if (
                !clientes[codigoCliente]
            ) {

                clientes[codigoCliente] = {

                    codigo:
                        codigoCliente,

                    nome:
                        orcamento.clienteNome ||
                        "Cliente não informado",

                    projetos: []

                };

            }


            // ---------------------------------------------
            // ADICIONA O ORÇAMENTO AO CLIENTE
            // ---------------------------------------------

            clientes[codigoCliente]
                .projetos
                .push(orcamento);

        }
    );


    // =====================================================
    // LIMPAR CONTAINER
    // =====================================================

    container.innerHTML = "";


    // =====================================================
    // CRIAR CLIENTES
    // =====================================================

    Object.values(clientes).forEach(
        function (cliente) {

            const grupo =
                document.createElement(
                    "section"
                );


            grupo.className =
                "cliente-projetos";


            // =================================================
            // CABEÇALHO DO CLIENTE
            // =================================================

            const cabecalho =
                document.createElement(
                    "div"
                );


            cabecalho.className =
                "cliente-cabecalho";


            cabecalho.innerHTML = `

                <div class="cliente-identificacao">

                    <h2>
                        ${escaparHTML(
                            cliente.nome
                        )}
                    </h2>

                    <span class="codigo-cliente">

                        ${escaparHTML(
                            cliente.codigo
                        )}

                    </span>

                </div>


                <div class="quantidade-projetos">

                    <i class="bi bi-kanban"></i>

                    <span>

                        ${
                            cliente.projetos.length
                        }

                        ${
                            cliente.projetos.length === 1
                                ? "projeto"
                                : "projetos"
                        }

                    </span>

                </div>

            `;


            grupo.appendChild(
                cabecalho
            );


            // =================================================
            // GRID DE PROJETOS
            // =================================================

            const grid =
                document.createElement(
                    "div"
                );


            grid.className =
                "projetos-grid";


            // =================================================
            // PROJETOS DO CLIENTE
            // =================================================

            cliente.projetos.forEach(
                function (orcamento) {

                    const projeto =
                        criarProjeto(
                            orcamento
                        );


                    grid.appendChild(
                        projeto
                    );

                }
            );


            grupo.appendChild(
                grid
            );


            container.appendChild(
                grupo
            );

        }
    );

}


// =========================================================
// CRIAR CARD DO PROJETO
// =========================================================

function criarProjeto(
    orcamento
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "card-projeto";


    const servico =
        orcamento.servico ||
        "Projeto de Gesso";


    const codigo =
        orcamento.codigo ||
        "-";


    const area =
        orcamento.area ||
        "-";


    const valor =
        formatarValor(
            orcamento.valor
        );


    const data =
        formatarData(
            orcamento.data
        );


    card.innerHTML = `

        <div class="imagem-projeto">

            <img
                src="../img/logo.png"
                alt="Sabino Gesso"
            >

        </div>


        <div class="projeto-conteudo">

            <div class="projeto-titulo">

                <h2>
                    ${escaparHTML(servico)}
                </h2>

                <span class="status status-aprovado">

                    Aprovado

                </span>

            </div>


            <div class="projeto-detalhes">

                <div class="detalhe-projeto">

                    <i class="bi bi-receipt"></i>

                    <span>

                        Orçamento:
                        <strong>
                            ${escaparHTML(codigo)}
                        </strong>

                    </span>

                </div>


                <div class="detalhe-projeto">

                    <i class="bi bi-rulers"></i>

                    <span>

                        Área:
                        <strong>
                            ${escaparHTML(area)}
                        </strong>

                    </span>

                </div>


                <div class="detalhe-projeto">

                    <i class="bi bi-calendar3"></i>

                    <span>

                        Data:
                        <strong>
                            ${escaparHTML(data)}
                        </strong>

                    </span>

                </div>


                <div class="detalhe-projeto">

                    <i class="bi bi-cash"></i>

                    <span>

                        Valor:
                        <strong>
                            ${escaparHTML(valor)}
                        </strong>

                    </span>

                </div>

            </div>


            <div class="projeto-rodape">

                <span>

                    <i class="bi bi-check-circle-fill"></i>

                    Orçamento aprovado

                </span>

            </div>

        </div>

    `;


    return card;

}


// =========================================================
// FORMATAÇÃO DE DATA
// =========================================================

function formatarData(
    data
) {

    if (!data) {
        return "-";
    }


    const dataObj =
        new Date(data);


    if (
        isNaN(
            dataObj.getTime()
        )
    ) {
        return "-";
    }


    return dataObj.toLocaleDateString(
        "pt-BR"
    );

}


// =========================================================
// FORMATAÇÃO DE VALOR
// =========================================================

function formatarValor(
    valor
) {

    const numero =
        Number(valor);


    if (
        isNaN(numero)
    ) {

        return "R$ 0,00";

    }


    return numero.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// =========================================================
// BOTÃO NOVO PROJETO
// =========================================================
// Como os projetos são gerados pelos orçamentos aprovados,
// o botão leva o usuário para a página de orçamentos.
// =========================================================

function configurarNovoProjeto() {

    const botao =
        document.getElementById(
            "btnNovoProjeto"
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
// ESCAPAR HTML
// =========================================================

function escaparHTML(
    valor
) {

    return String(
        valor || ""
    )
    .replace(
        /&/g,
        "&amp;"
    )
    .replace(
        /</g,
        "&lt;"
    )
    .replace(
        />/g,
        "&gt;"
    )
    .replace(
        /"/g,
        "&quot;"
    )
    .replace(
        /'/g,
        "&#039;"
    );

}