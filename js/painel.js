// =========================================================
// PAINEL - SABINO GESSO
// Colore o select de status conforme o valor escolhido
// (Pendente / Aprovado / Cancelado)
// =========================================================

function atualizarCorStatus(select) {

    select.classList.remove(
        "status-pendente",
        "status-aprovado",
        "status-cancelado"
    );

    select.classList.add("status-" + select.value);

    select.dataset.status = select.value;

}


document.addEventListener("DOMContentLoaded", function () {

    const selects =
        document.querySelectorAll(".status");

    selects.forEach((select) => {

        // Aplica a cor inicial (conforme o value já selecionado no HTML)
        atualizarCorStatus(select);

        // Atualiza a cor sempre que o usuário trocar o status
        select.addEventListener("change", function () {

            atualizarCorStatus(select);

        });

    });

});